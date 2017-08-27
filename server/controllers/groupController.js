import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';
import models from '../models';
import { io } from '../helpers/socket';

const Group = models.Group;
const Message = models.Message;
// const Notification = models.Notification;

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
   * @param {object} res -  response object from an endpoint
   * @returns {object} - message to notify user something is wrong
   */
  sendError(res) {
    if (this.error) {
      res.status(500).json({ message: this.error });
    }
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static createGroup(req, res) {
    Group.create({
      groupname: req.body.name,
      groupCreator: req.decoded.data.username,
      userId: req.decoded.data.id
    }).then((group) => {
      return group.addUser(req.decoded.data.id).then(() => {
        res.json({ group: { message: `${req.body.name} created successfully`, data: group } });
      });
    })
      .catch(() => {
        res.status(400).json({ error: { message: 'Group already exists' } });
      });
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends user added successfully
   */
  static addUserToGroup(req, res) {
    models.Group.findOne({
      where: {
        id: req.params.groupId
      }
    }).then((group) => {
      return group.addUser(req.validUserId)
        .then(() => {
          res.json({ message: 'user added successfully' });
        });
    }).catch(() => {
      res.status(400).json({ error: { message: 'Group does not exist' } });
    });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends message posted to group
   */
  static postMessageToGroup(req, res) {
    Message.create({
      content: req.body.message,
      groupId: req.params.groupId,
      userId: req.decoded.data.id,
      priority: req.body.priority,
      messageCreator: req.decoded.data.username
    })
      .then((message) => {
        // console.log('my msg priority', message.priority);
        if (message !== null) {
          return message.addUser(req.decoded.data.id).then(() => {            
            const newNotification =
            GroupController.notificationMessage(message);
            GroupController.addNotification(req.params.groupId,
            newNotification, req.decoded.data.id);
            req.app.io.emit('new message posted', message);
            if (message.priority === 'urgent') {
              GroupController.sendEmail(req.usersEmails, newNotification);
            } else if (message.priority === 'critical') {
              GroupController.sendEmail(req.usersEmails,
              GroupController.notificationMessage(req.decoded.data.username,
              message.messageCreator));
            }
            res.json({ message: 'message posted to group', data: message });
          });
        }
      })
      .catch(() => {
        res.status(500).json({ error: { message: 'error saving to database' } });
      });
  }
  /**

   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns an array of messages
   */
  static getPosts(req, res) {
    Message.findAll({
      where: {
        groupId: req.params.groupId
      },
      order: [
        ['createdAt', 'ASC']
      ],
      offset: req.query.offset,
      limit: req.query.limit
    })
        .then((posts) => {
          let data = JSON.stringify(posts);
          data = JSON.parse(data);
          res.json({ posts: data });
        })
        .catch(() => {
          res.status(500).json({ errors: 'Something went wrong' });
        });
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {void}
   */
  checkGroups(req, res) {
    Group.findOne({
      where: {
        groupname: req.params.name
      }
    })
      .then((group) => {
        res.json({ group });
      })
      .catch((err) => {
        this.error = err;
        this.sendError(res);
      });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns an array of groups a user has created
   */
  getUserGroups(req, res) {
    Group.findAll({
      where: {
        groupCreator: req.params.username
      }
    })
      .then((groups) => {
        let data = JSON.stringify(groups);
        data = JSON.parse(data);
        res.json(data);
      })
      .catch((err) => {
        this.error = err;
        this.sendError(res);
      });
  }

   /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @param {function} next
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getGroupMembers(req, res, next) {
    Group.findOne({
      where: {
        id: req.params.groupId
      }
    }).then((group) => {
      group.getUsers({ attributes: { exclude: ['UserGroups', 'createdAt', 'updatedAt'] } }).then((users) => {
        if (users) {
          req.members = users;
          req.usersEmails = GroupController.getEmails(users);
          next();
        } else {
          res.json({ message: 'No user email found ' });
        }
      });
    });
  }
/**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getGroupsUserIsMember(req, res) {
    models.User.findOne({
      where: {
        id: req.decoded.data.id
      }
    }).then((user) => {
      return user.getGroups({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).then((groups) => {
        let userGroups = JSON.stringify(groups);
        userGroups = JSON.parse(userGroups);
        res.json({ usergroups: userGroups });
      });
    });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getUsersWhoReadMessage(req, res) {
    models.Message.findOne({
      where: {
        id: req.params.messageId
      }
    }).then((message) => {
      return message.getUsers({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).then((users) => {
        let messageReaders = JSON.stringify(users);
        messageReaders = JSON.parse(messageReaders);
        res.json({ users: messageReaders });
      });
    });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static readMessage(req, res) {
    models.Message.findOne({
      where: {
        id: req.params.messageId
      }
    }).then((message) => {
      if (req.decoded.data.id !== message.userId) {
        message.addUser(req.decoded.data.id).then(() => {
          res.status(201).json({ message: 'user read this mesage', data: message });
        }).catch(() => {
          res.status(500).json({ message: 'something went wrong registering read message' });
        });
      }
    })
    .catch(() => {
      res.status(400).json({ message: 'something went wrong finding message' });
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
        console.log(error);
      } else {
        console.log('Email sent: ', info.response);
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
    nexmo.message.sendSms('07014980491', recipient, 'hello', (err, msg) => {
      if (err) {
        console.log(err);
      } else {
        console.log(msg);
      }
    });
  }

  /**
   * @returns {string} - it returns a notification message
   * @param {string} messageCreator - user posting the message
   */
  static notificationMessage(message) {
    return `${message.messageCreator} posted '${message.content}' to a group which you are a member`;
  }

  /**
   * @returns {void}
   * @param {number} id - group id
   * @param {string} notification
   */
  static addNotification(id, notice, userId) {
    models.Notification.create({
      groupId: id,
      event: notice
    }).then((notification) => {
      console.log(notification);
      notification.addUser(userId).then((user) => {
        console.log('user was added', user);
      });
    });
  }
   /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getUserNotifications(req, res) {
    const userNotifications = [];
    models.User.findOne({
      where: {
        id: req.decoded.data.id
      },
      include: [
        { model: models.Group, include: [{ model: models.Notification }] }
      ],
    })
    .then((user) => {
      const responseObj = { ...[],
        username: user.username,
        groups: user.Groups.map((group) => {
          return { ...{},
            groupName: group.groupname,
            notifications: group.Notifications.map((notification) => {
              return { ...{}, event: notification.event };
            }) };
        }) };
      const notifications = responseObj.groups;
      Object.keys(notifications).forEach((notification) => {
        userNotifications.push(notifications[notification].notifications);
      });
      const userNotices = userNotifications.reduce(
        (a, b) => {
          return a.concat(b);
        },
        []
      );
      res.status(200).json({ userNotices });
    })
    .catch(() => {
      res.status(404).json({ message: 'You have no notification' });
    });
  }
  /**
   * @returns {void}
   * @param {object} req
   * @param {object} res
   */
  static allGroupMembers(req, res) {
    const allMembers = [];
    Object.keys(req.members).forEach((member) => {
      allMembers.push(req.members[member].username);
    });
    if (allMembers.length > 0) {
      res.json({ members: allMembers });
    } else {
      res.status(404).json({ message: 'No members in this group' });
    }
  }

  /**
   * @returns {void}
   * @param {Object} req
   * @param {Object} res
   */
  static getUnreadMessagesNumber(req, res) {
    models.Message.findAndCountAll({
      where: {
        groupId: req.params.groupId,
        userId: req.decoded.data.id
      }
    })
    .then((messages) => {
      const allMessages = messages.count;
      models.User.findOne({
        where: {
          id: req.decoded.data.id
        }
      })
      .then((user) => {
        user.getMessages({ where: { groupId: req.params.groupId } }).then((readMessages) => {
          const numberOfReadMessages = readMessages.length;
          const unreadMessages = Math.abs(allMessages - numberOfReadMessages);
          res.status(200).json({ unreadMessages });
        });
      });
    })
    .catch(() => {
      res.status(404).json({ message: 'no message found' });
    });
  }
  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {void}
   */
  static deleteNotifications(req, res) {
    models.UserNotification.destroy({
      where: {
        userId: req.decoded.data.id
      }
    }).then(() => {
      res.json({
        message: 'All notifications deleted'
      });
    });
  }
}
export default GroupController;

