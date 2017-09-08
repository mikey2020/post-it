import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';
import winston from 'winston';
import models from '../models';

const Group = models.Group;
const Message = models.Message;

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
   * @param {object} response -  responseponse object from an endpoint
   * @returns {object} - message to notify user something is wrong
   */
  static serverError(response) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }

  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static createGroup(request, response) {
    if (request.body.name === undefined) {
      response.status(400).json({ errors: { message: 'Group name is requestuired' } });
    } else {
      Group.create({
        groupName: request.body.name,
        groupCreator: request.decoded.data.username,
        userId: request.decoded.data.id
      }).then(group => group.addUser(request.decoded.data.id).then(() => {
        response.status(201).json({ group:
          { message: `${request.body.name} created successfully`, data: group } });
      }))
      .catch(() => {
        response.status(409).json({ error: { message: 'Group already exists' } });
      });
    }
  }
  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it sends user added successfully
   */
  static addUserToGroup(request, response) {
    models.Group.findOne({
      where: {
        id: request.params.groupId
      }
    }).then(group => group.addUser(request.validUserId)
        .then(() => {
          response.json({ message: 'user added successfully' });
        })
        .catch(() => {
          GroupController.serverError(response);
        })
      ).catch(() => {
        response.status(404).json({ error: { message: 'Group does not exist' } });
      });
  }


  /**
   * @param {Object} request
   * @param {Object} response
   * @returns {void} - It allows users post a message to a group
   */
  static postMessageToGroup(request, response) {
    Message.create({
      content: request.body.message,
      groupId: request.params.groupId,
      userId: request.decoded.data.id,
      priority: request.body.priority,
      messageCreator: request.decoded.data.username
    })
      .then((message) => {
        if (message !== null) {
          return message.addUser(request.decoded.data.id).then(() => {
            const newNotification =
            GroupController.notificationMessage(message);
            GroupController.addNotification(request.params.groupId,
            newNotification, request.decoded.data.id);
            request.app.io.emit('new message posted', message);
            if (message.priority === 'urgent') {
              GroupController.sendEmail(request.usersEmails, newNotification);
            } else if (message.priority === 'critical') {
              GroupController.sendEmail(request.usersEmails,
              GroupController.notificationMessage(request.decoded.data.username,
              message.messageCreator));
            }
            response.json({ message: 'message posted to group', data: message });
          });
        }
      })
      .catch(() => {
        GroupController.serverError(response);
      });
  }
  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it returns an array of messages
   */
  static getPosts(request, response) {
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
        .then((posts) => {
          let data = JSON.stringify(posts);
          data = JSON.parse(data);
          response.json({ posts: data });
        })
        .catch(() => {
          GroupController.serverError(response);
        });
  }
  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {void}
   */
  static checkGroupName(request, response) {
    Group.findOne({
      where: {
        groupName: request.params.name
      }
    })
      .then((group) => {
        response.json({ group });
      })
      .catch(() => {
        GroupController.serverError(response);
      });
  }

  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it returns an array of groups a user has created
   */
  static getUserGroups(request, response) {
    Group.findAll({
      where: {
        groupCreator: request.params.username
      }
    })
      .then((groups) => {
        let data = JSON.stringify(groups);
        data = JSON.parse(data);
        response.json(data);
      })
      .catch(() => {
        GroupController.serverError(response);
      });
  }

   /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @param {function} next
   * @returns {object} - if there is no error, it returns array of users in a group
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
          if (users) {
            request.members = users;
            request.usersEmails = GroupController.getEmails(users);
            next();
          } else {
            response.status(404).json({ message: 'No user email found' });
          }
        })
        .catch(() => {
          GroupController.serverError(response);
        });
    });
  }
/**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getGroupsUserIsMember(request, response) {
    models.User.findOne({
      where: {
        id: request.decoded.data.id
      }
    }).then(user => user.getGroups({ attributes:
      { exclude: ['createdAt', 'updatedAt'] } })
      .then((groups) => {
        let userGroups = JSON.stringify(groups);
        userGroups = JSON.parse(userGroups);
        response.json({ usergroups: userGroups });
      }))
      .catch(() => {
        GroupController.serverError(response);
      });
  }

  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getUsersWhoReadMessage(request, response) {
    models.Message.findOne({
      where: {
        id: request.params.messageId
      }
    }).then(message => message.getUsers({
      attributes: { exclude: ['createdAt', 'updatedAt'] } }).then((users) => {
        let messageReaders = JSON.stringify(users);
        messageReaders = JSON.parse(messageReaders);
        response.json({ users: messageReaders });
      }))
      .catch(() => {
        GroupController.serverError(response);
      });
  }

  /**
   * @param {object} request - requestuest object sent to a route
   * @param {object} response -  responseponse object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static readMessage(request, response) {
    models.Message.findOne({
      where: {
        id: request.params.messageId
      }
    }).then((message) => {
      if (request.decoded.data.id !== message.userId) {
        message.addUser(request.decoded.data.id).then(() => {
          response.status(201).json({ message: 'user read this message', data: message });
        });
      } else {
        response.status(404).json({ message: 'Cannot find message' });
      }
    })
    .catch(() => {
      GroupController.serverError(response);
    });
  }
  /**
   * @param {array} membersEmails - emails of all members of the group
   * @param {string} message -  notification message to be sent
   * @returns {void}
   */
  static sendEmail(membersEmails, message) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email,
        pass: process.env.EmailPass
      }
    });

    const mailOptions = {
      from: 'PostIt',
      to: membersEmails,
      subject: 'New message notification',
      text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        winston.log(error);
      } else {
        winston.info('Email sent: ', info.responseponse);
      }
    });
  }
  /**
   * @param {array} group - emails of all members of the group
   * @returns {void}
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
   * @returns {void}
   */
  static sendSms(recipient) {
    const nexmo = new Nexmo({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    });
    nexmo.message.sendSms(process.env.myNumber, recipient, 'hello', (err, msg) => {
      if (err) {
        winston.log(err);
      } else {
        winston.log(msg);
      }
    });
  }

  /**
   * @returns {String} - it returns a notification message
   * @param {Object} message - message object
   */
  static notificationMessage(message) {
    return `${message.messageCreator} posted a message to a group which you are a member`;
  }

  /**
   * @returns {void}
   * @param {number} id - id that notification belongs to
   * @param {string} notice - event that took place
   * @param {userId} userId
   * @param {string} notification
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
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getUserNotifications(request, response) {
    models.User.findOne({
      where: {
        id: request.decoded.data.id
      }
    })
    .then((user) => {
      user.getNotifications().then((notices) => {
        response.json({ notices });
      });
    })
    .catch(() => {
      response.status(404).json({ message: 'You have no notification' });
    });
  }
  /**
   * @returns {void}
   * @param {object} request
   * @param {object} response
   */
  static allGroupMembers(request, response) {
    const allMembers = [];
    Object.keys(request.members).forEach((member) => {
      allMembers.push(request.members[member].username);
    });
    if (allMembers.length > 0) {
      response.json({ members: allMembers });
    } else {
      response.status(404).json({ message: 'No members in this group' });
    }
  }

  /**
   * @returns {void}
   * @param {Object} request
   * @param {Object} response
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
          const unreadMessages = Math.abs(allMessagesNumber - numberOfReadMessages);
          response.status(200).json({ number: unreadMessages, messages: allMessages });
        });
      });
    })
    .catch(() => {
      response.status(404).json({ message: 'no message found' });
    });
  }
  /**
   * @param {Object} request
   * @param {Object} response
   * @returns {void}
   */
  static deleteNotifications(request, response) {
    models.UserNotification.destroy({
      where: {
        userId: request.decoded.data.id
      }
    }).then(() => {
      response.json({
        message: 'All notifications deleted'
      });
    })
    .catch(() => {
      GroupController.serverError(response);
    });
  }

}
export default GroupController;
