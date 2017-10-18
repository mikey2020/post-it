import dotenv from 'dotenv';
import Nexmo from 'nexmo';
import winston from 'winston';
import isEmpty from 'lodash/isEmpty';

import models from '../models';
import returnServerError from '../helpers/returnServerError';
import sendEmail from '../helpers/sendEmail';
import handleInvalidNumber from '../helpers/handleInvalidNumber';
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
   * @description - it creates a group
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   *
   * @returns {void}
   *
   */
  static createGroup(request, response) {
    let { name } = request.body;
    if (name !== undefined) {
      name = name.trim();
    }
    if (name === undefined || name === '') {
      response.status(400).json(
        {
          errors:
          {
            message: 'Group name is required'
          }
        }
      );
    } else if (request.existingGroup === true) {
      response.status(409).json(
        {
          errors:
          {
            message: 'Group already exists'
          }
        }
      );
    } else {
      Group.create({
        groupName: name,
        groupCreator: request.decoded.data.username,
        userId: request.decoded.data.id
      }).then(group => group.addUser(request.decoded.data.id).then(() => {
        response.status(201).json(
          {
            group,
            message: `${request.body.name} created successfully`
          }
        );
      }))
      .catch(() => {
        returnServerError(response);
      });
    }
  }
  /**
   * @function addUserToGroup
   *
   * @description - It adds a user to a particular group
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   *
   * @returns {void}
   *
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
          response.status(404).json(
            {
              error:
              {
                message: 'Group does not exist'
              }
            }
          );
        })
      ).catch(() => {
        returnServerError(response);
      });
  }


  /**
   * @function postMessageToGroup
   *
   * @description - It posts a new message to a group
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} - If no error, it returns an object
   * containing message details
   *
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
            response.status(201).json(
              {
                message: 'message posted to group',
                postedMessage: message
              }
            );
          });
        } else if (request.existingGroup === false) {
          return response.status(404).json(
            {
              errors:
              {
                message: 'Group does not exist'
              }
            }
          );
        }
      })
      .catch(() => {
        returnServerError(response);
      });
  }
  /**
   * @function getMessages
   *
   * @description - It returns messages posted to a particular group
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   *
   * @returns {void}
   *
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
            response.status(200).json(
              {
                messages: data
              }
            );
          } else {
            response.status(404).json(
              {
                message: 'no message found'
              }
            );
          }
        })
        .catch(() => {
          returnServerError(response);
        });
  }
  /**
   * @function checkGroupName
   *
   * @description -  It checks if a group already exists
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   *
   * @returns {void}
   *
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
          response.status(404).json(
            {
              message: 'Group name does not exist'
            }
          );
        }
      })
      .catch(() => {
        returnServerError(response);
      });
  }

  /**
   * @function getUserGroups
   *
   * @description - it returns an array of groups a user has created
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response - response object from the route
   *
   * @returns {void}
   *
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
          response.status(200).json(
            {
              groups: data
            }
          );
        } else {
          response.status(404).json(
            {
              message: 'No groups found'
            }
          );
        }
      })
      .catch(() => {
        returnServerError(response);
      });
  }

   /**
   * @function getMembers
   *
   * @description -  it gets emails of members in a group
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   * @param {Function} next
   *
   * @returns {void}
   *
   */
  static getMembers(request, response, next) {
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
            response.status(404).json(
              {
                message: 'No user email found'
              }
            );
          }
        })
        .catch(() => {
          returnServerError(response);
        });
    });
  }
  /**
   * @function getGroups
   *
   * @description -  it returns the number of groups a user is part of.
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {void}
   *
   */
  static getGroups(request, response) {
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
            {
              message: 'You are not a memeber of any group'
            }
          );
        }
      }))
      .catch(() => {
        returnServerError(response);
      });
  }

  /**
   * @description - it returns array of users in a group
   * that have read a message
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {void}
   *
   */
  static getReaders(request, response) {
    models.Message.findOne({
      where: {
        id: request.params.messageId
      }
    }).then(message => message.getUsers({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      joinTableAttributes: []
    }).then((users) => {
      if (!users) {
        response.status(404).json(
          {
            message: 'No user found'
          }
        );
      } else {
        let messageReaders = JSON.stringify(users);
        messageReaders = JSON.parse(messageReaders);
        response.status(200).json(
          {
            users: messageReaders
          }
        );
      }
    }))
      .catch(() => {
        returnServerError(response);
      });
  }

  /**
   * @description - it adds user to table signifying
   * that user has read a message
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {void}
   *
   * @description - it adds user to table signifying
   * that user has read a message
   */
  static readMessage(request, response) {
    const messageId = request.params.messageId;
    handleInvalidNumber(messageId, response);
    models.Message.findOne({
      where: {
        id: request.params.messageId
      }
    }).then((message) => {
      if (request.decoded.data.id !== message.userId) {
        message.addUser(request.decoded.data.id).then(() => {
          response.status(200).json(
            {
              message: 'user read this message',
              readMessage: message
            }
          );
        });
      } else {
        response.status(404).json(
          {
            message: 'Cannot find message'
          }
        );
      }
    })
    .catch(() => {
      returnServerError(response);
    });
  }
  /**
   * @description Sends email to all members of a group
   *
   * @param {array} membersEmails - emails of all members of the group
   * @param {string} message -  notification message to be sent
   *
   * @returns {void}
   *
   */
  static sendNotificationEmail(membersEmails, message) {
    const subject = 'New message posted';
    Object.keys(membersEmails).forEach((memberEmail) => {
      sendEmail(membersEmails[memberEmail], subject, message);
    });
  }

  /**
   * @description -  Gets all user emails from an array of groups
   *
   * @param {array} group - emails of all members of the group
   *
   * @returns {Array} - returns an array containing user's emails
   *
   */
  static getEmails(group) {
    const emails = [];
    Object.keys(group).forEach((user) => {
      emails.push(group[user].email);
    });
    return emails;
  }
  /**
   * @description -  Sends sms to a user
   *
   * @param {array} recipient - phone number of receiver of the sms
   *
   * @returns {void}
   *
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
   * @description - It helps create a notification message
   *
   * @returns {String} - it returns a notification message
   *
   * @param {Object} message - message object
   */
  static notificationMessage(message) {
    return `${message.messageCreator} 
    posted a message to a group which you are a member`;
  }

  /**
   * @description -  Adds a new notification
   *
   * @returns {void}
   *
   * @param {number} id - id that notification belongs to
   * @param {string} notice - event that took place
   * @param {userId} userId
   * @param {string} notification
   *
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
   * @description Gets all members of a group
   *
   * @returns {void}
   *
   * @param {object} request
   * @param {object} response
   *
   */
  static getGroupMembers(request, response) {
    const allMembers = [];
    Object.keys(request.members).forEach((member) => {
      allMembers.push(request.members[member].username);
    });
    if (allMembers.length > 0) {
      response.status(200).json(
        {
          members: allMembers
        }
      );
    } else {
      response.status(404).json(
        {
          message: 'No members in this group'
        }
      );
    }
  }

  /**
   * @description It gets all user's unread messages from the database
   *
   * @returns {void}
   *
   * @param {Object} request
   * @param {Object} response
   *
   */
  static getUnreadMessages(request, response) {
    const groupId = request.params.groupId;
    handleInvalidNumber(groupId, response);
    models.Message.findAndCountAll({
      where: {
        groupId,
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
        user.getMessages({ where: { groupId } })
        .then((readMessages) => {
          const numberOfReadMessages = readMessages.length;
          const unreadMessages = Math.abs(
            allMessagesNumber - numberOfReadMessages);
          response.status(200).json(
            {
              unReadMessagesNumber: unreadMessages,
              messages: allMessages
            }
          );
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

}
export default GroupController;
