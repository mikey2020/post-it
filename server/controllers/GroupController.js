import dotenv from 'dotenv';
import Nexmo from 'nexmo';
import winston from 'winston';
import isEmpty from 'lodash/isEmpty';

import models from '../models';
import returnServerError from '../helpers/returnServerError';
import sendEmail from '../helpers/sendEmail';
import Validations from '../middlewares/Validations';

const Group = models.Group;
const Message = models.Message;
const validate = new Validations();

dotenv.config();
/**
 * All group actions
 * @class
 */
class GroupController {

  /**
   * @constructor
   */
  constructor() {
    this.error = '';
    this.userIsUnique = true;
    this.userValid = true;
  }

  /**
   * @function createGroup
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - response status code and json data
   *
   * @description - it sends (username) created successfully
   */
  static createGroup(request, response) {
    let { name } = request.body;
    if (request.body.name !== undefined) {
      name = name.trim();
    }
    if (name === undefined || name === '') {
      response.status(400).json({ errors:
        { message: 'Group name is required' } });
    } else if (request.existingGroup === true) {
      response.status(409).json({ error:
          { message: 'Group already exists' } });
    } else {
      Group.create({
        groupName: name,
        groupCreator: request.decoded.data.username,
        userId: request.decoded.data.id
      }).then(group => group.addUser(request.decoded.data.id).then(() => {
        response.status(201).json(
          { message: `${request.body.name} created successfully`, group });
      }))
      .catch(() => {
        returnServerError(response);
      });
    }
  }
  /**
   * @function addUserToGroup
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - if there is no error, it sends user added successfully
   *
   * @description - It adds a user to a particular group
   */
  static addUserToGroup(request, response) {
    models.Group.findOne({
      where: {
        id: request.params.groupId
      }
    }).then(group => group.addUser(request.validUserId)
        .then(() => {
          response.status(200).json({ message: 'user added successfully' });
        })
        .catch(() => {
          response.status(404).json({ error:
          { message: 'Group does not exist' } });
        })
      ).catch(() => {
        returnServerError(response);
      });
  }


  /**
   * @function postMessageToGroup
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void} - It allows users post a message to a group
   *
   * @description - It posts a new message to a group
   */
  static postMessageToGroup(request, response) {
    const { errors, isValid } = validate.message(request.body);
    if (!isValid) {
      return response.status(400).json({ errors });
    }
    Message.create({
      content: request.body.message,
      groupId: request.params.groupId,
      userId: request.decoded.data.id,
      priority: request.body.priority,
      messageCreator: request.decoded.data.username
    })
      .then((message) => {
        if (!isEmpty(message)) {
          return message.addUser(request.decoded.data.id).then(() => {
            const newNotification =
            GroupController.notificationMessage(message);
            GroupController.addNotification(request.params.groupId,
            newNotification, request.decoded.data.id);
            request.app.io.emit('new message posted', message);
            if (message.priority === 'urgent') {
              GroupController.sendNotificationEmail(request.usersEmails,
              newNotification);
            } else if (message.priority === 'critical') {
              GroupController.sendNotificationEmail(request.usersEmails,
              newNotification);
              GroupController.notificationMessage(request.decoded.data.username,
              message.messageCreator);
            }
            response.status(201).json({ message: 'message posted to group',
              postedMessage: message });
          });
        } else if (request.existingGroup === false) {
          return response.status(404).json({ errors:
          { message: 'Group does not exist' } });
        }
      })
      .catch(() => {
        returnServerError(response);
      });
  }
  /**
   * @function getMessages
   *
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   *
   * @returns {object} - if there is no error, it returns an array of messages
   *
   * @description - It returns messages posted to a particular group
   */
  static getMessages(request, response) {
    Message.findAll({
      where: {
        groupId: request.params.groupId
      },
      order: [
        ['createdAt', 'ASC']
      ],
      offset: request.query.offset,
      limit: request.query.limit
    })
        .then((messages) => {
          if (typeof messages[0] !== 'undefined') {
            let data = JSON.stringify(messages);
            data = JSON.parse(data);
            response.status(200).json({ messages: data });
          } else {
            response.status(404).json({ message: 'no message found' });
          }
        })
        .catch(() => {
          returnServerError(response);
        });
  }
  /**
   * @function checkGroupName
   *
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   *
   * @returns {void}
   *
   * @description -  It checks if a group already exists
   */
  static checkGroupName(request, response) {
    Group.findOne({
      where: {
        groupName: request.params.name
      }
    })
      .then((group) => {
        if (group) {
          response.status(200).json({ group });
        } else {
          response.status(404).json({ message: 'GroupName does not exist' });
        }
      })
      .catch(() => {
        returnServerError(response);
      });
  }

  /**
   * @function  getUserGroups
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  responseponse object from the route
   *
   * @returns {object} - if there is no error
   *
   * @description it returns an array of groups a user has created
   */
  static getUserGroups(request, response) {
    Group.findAll({
      where: {
        groupCreator: request.params.username
      }
    })
      .then((groups) => {
        if (typeof groups[0] !== 'undefined') {
          let data = JSON.stringify(groups);
          data = JSON.parse(data);
          response.status(200).json(data);
        } else {
          response.status(404).json({ message: 'No groups found' });
        }
      })
      .catch(() => {
        returnServerError(response);
      });
  }

   /**
  * @function getGroupMembers
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   * @param {function} next
   *
   * @returns {object} - returns an array of users
   *
   * @description -  it get all members of a group
   */
  static getGroupMembers(request, response, next) {
    Group.findOne({
      where: {
        id: request.params.groupId
      }
    }).then((group) => {
      group.getUsers({ attributes:
        { exclude: ['UserGroups', 'createdAt', 'updatedAt'] } })
        .then((users) => {
          if (!isEmpty(users)) {
            request.members = users;
            request.usersEmails = GroupController.getEmails(users);
            next();
          } else {
            response.status(404).json({ message: 'No user email found' });
          }
        })
        .catch(() => {
          returnServerError(response);
        });
    });
  }
 /**
  * @function getGroupsUserIsMember
  *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - if there is no error
   *
   * @description -  it returns the number of groups a user is part of.
   */
  static getGroupsUserIsMember(request, response) {
    models.User.findOne({
      where: {
        id: request.decoded.data.id
      }
    }).then(user => user.getGroups({ attributes:
      { exclude: ['createdAt', 'updatedAt'] },
      joinTableAttributes: [] })
      .then((groups) => {
        if (typeof groups[0] !== 'undefined') {
          let userGroups = JSON.stringify(groups);
          userGroups = JSON.parse(userGroups);
          response.status(200).json({ userGroups });
        } else {
          response.status(404).json(
            { message: 'You are not part of any group' });
        }
      }))
      .catch(() => {
        returnServerError(response);
      });
  }

  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   *
   * @returns {object} - if there is no error, it returns array of users
   *
   * @description - it returns array of users in a group
   * that have read a message
   */
  static getUsersWhoReadMessage(request, response) {
    models.Message.findOne({
      where: {
        id: request.params.messageId
      }
    }).then(message => message.getUsers({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      joinTableAttributes: []
    }).then((users) => {
      if (!users) {
        response.status(404).json({ message: 'No user found' });
      } else {
        let messageReaders = JSON.stringify(users);
        messageReaders = JSON.parse(messageReaders);
        response.status(200).json({ users: messageReaders });
      }
    }))
      .catch(() => {
        returnServerError(response);
      });
  }

  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   *
   * @returns {object} - if there is no error
   *
   * @description - it adds user to table signifying
   * that user has read a message
   */
  static readMessage(request, response) {
    models.Message.findOne({
      where: {
        id: request.params.messageId
      }
    }).then((message) => {
      if (request.decoded.data.id !== message.userId) {
        message.addUser(request.decoded.data.id).then(() => {
          response.status(200).json({ message: 'user read this message',
            readMessage: message });
        });
      } else {
        response.status(404).json({ message: 'Cannot find message' });
      }
    })
    .catch(() => {
      returnServerError(response);
    });
  }
  /**
   * @param {array} membersEmails - emails of all members of the group
   * @param {string} message -  notification message to be sent
   *
   * @returns {void}
   *
   * @description Sends email to all members of a group
   */
  static sendNotificationEmail(membersEmails, message) {
    const subject = 'New message posted';
    Object.keys(membersEmails).forEach((memberEmail) => {
      sendEmail(membersEmails[memberEmail], subject, message);
    });
  }

  /**
   * @param {array} group - emails of all members of the group
   *
   * @returns {void}
   *
   * @description -  Gets all user emails from an array of groups
   */
  static getEmails(group) {
    const emails = [];
    Object.keys(group).forEach((user) => {
      emails.push(group[user].email);
    });
    return emails;
  }
  /**
   * @param {array} recipient - phone number of receiver of the sms
   *
   * @returns {void}
   *
   * @description -  Sends sms to a user
   */
  static sendSms(recipient) {
    const nexmo = new Nexmo({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    });
    nexmo.message.sendSms(
      process.env.myNumber, recipient, 'hello', (err, msg) => {
        if (err) {
          winston.log(err);
        } else {
          winston.log(msg);
        }
      });
  }

  /**
   * @returns {String} - it returns a notification message
   *
   * @param {Object} message - message object
   */
  static notificationMessage(message) {
    return `${message.messageCreator} 
    posted a message to a group which you are a member`;
  }

  /**
   * @returns {void}
   *
   * @param {number} id - id that notification belongs to
   * @param {string} notice - event that took place
   * @param {userId} userId
   * @param {string} notification
   *
   * @description -  Adds a new notification
   */
  static addNotification(id, notice, userId) {
    models.Notification.create({
      groupId: id,
      event: notice
    }).then((notification) => {
      notification.addUser(userId).then((user) => {
        winston.log('user was added', user);
      });
    });
  }
   /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   *
   * @returns {object} - if there is no error
   *
   * @description it returns array of users in a group
   */
  static getUserNotifications(request, response) {
    models.User.findOne({
      where: {
        id: request.decoded.data.id
      }
    })
    .then((user) => {
      user.getNotifications({ attributes:
        { exclude: ['createdAt', 'updatedAt', 'UserNotification'] },
        joinTableAttributes: [] })
        .then((notices) => {
          if (typeof notices[0] !== 'undefined') {
            response.status(200).json({ notices });
          } else {
            response.status(404).json({ message: 'No notification found' });
          }
        });
    })
    .catch(() => {
      returnServerError(response);
    });
  }
  /**
   * @returns {void}
   *
   * @param {object} request
   * @param {object} response
   *
   * @description Gets all members of a group
   */
  static getAllGroupMembers(request, response) {
    const allMembers = [];
    Object.keys(request.members).forEach((member) => {
      allMembers.push(request.members[member].username);
    });
    if (allMembers.length > 0) {
      response.status(200).json({ members: allMembers });
    } else {
      response.status(404).json({ message: 'No members in this group' });
    }
  }

  /**
   * @returns {void}
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @description It gets all user's unread messages from the database
   */
  static getUnreadMessages(request, response) {
    models.Message.findAndCountAll({
      where: {
        groupId: request.params.groupId,
        userId: request.decoded.data.id
      }
    })
    .then((messages) => {
      const allMessagesNumber = messages.count;
      const allMessages = messages.rows;
      models.User.findOne({
        where: {
          id: request.decoded.data.id
        }
      })
      .then((user) => {
        user.getMessages({ where: { groupId: request.params.groupId } })
        .then((readMessages) => {
          const numberOfReadMessages = readMessages.length;
          const unreadMessages = Math.abs(
            allMessagesNumber - numberOfReadMessages);
          response.status(200).json({ unReadMessagesNumber: unreadMessages,
            messages: allMessages });
        })
        .catch(() => {
          response.status(404).json({ message: 'no message found' });
        });
      });
    })
    .catch(() => {
      returnServerError(response);
    });
  }
  /**
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   *
   * @description - deletes all user's notifications from the database
   */
  static deleteNotifications(request, response) {
    models.UserNotification.destroy({
      where: {
        userId: request.decoded.data.id
      }
    }).then((notification) => {
      if (!notification) {
        response.status(404).json({ message: 'No notification found' });
      } else {
        response.status(200).json({
          message: 'All notifications deleted'
        });
      }
    })
    .catch(() => {
      returnServerError(response);
    });
  }

}
export default GroupController;
