import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';
import models from '../models';
import socket from 'socket.io';

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
      group.addUser(req.decoded.data.id).then(() => {
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
      group.addUser(req.validUserId)
        .then(() => {
          group.notifications.push(`${req.decoded.data.username} added ${req.ValidUsername} to ${group.groupname}`);
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
            const newNotification = GroupController.notificationMessage(req.decoded.data.username);
            GroupController.addNotification(req.params.groupId, newNotification);
            if (message.priority === 'urgent') {
              GroupController.sendEmail(req.usersEmails, newNotification);
            } else if (message.priority === 'critical') {
              GroupController.sendEmail(req.usersEmails,
              GroupController.notificationMessage(req.decoded.data.username));
            }
            res.json({ message: 'message posted to group', data: message });
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
      }
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
       // res.status(500).json({ errors: { message: 'error retrieving data from database' } });
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
          res.json({ message: 'user read this mesage', data: message });
        }).catch(() => {
          res.json({ message: 'something went wrong registering read message' });
        });
      } else {
        res.json({ message: 'user already read message' });
      }
    })
    .catch(() => {
      res.json({ message: 'something went wrong finding message' });
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
        user: 'superdafe@gmail.com',
        pass: 'odafe2020'
      }
    });

    const mailOptions = {
      from: 'superdafe@gmail.com',
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
   * @param {string} username - user posting the message
   */
  static notificationMessage(username) {
    return `${username} posted a message to a group you are part of`;
  }

  /**
   * @returns {void}
   * @param {number} id - group id
   * @param {string} notification
   */
  static addNotification(id, notification) {
    models.Notification.create({
      groupId: id,
      event: notification
    })
   .then(() => {
     // console.log('checkout notifcs', event);
   });
  }
  /**
   * @returns {void}
   * @param {number} id - group id
   */
  static getNotifications(id) {
    return models.Notification.findAll({
      where: {
        groupId: id
      }
    })
    .then((notific) => {
      return notific;
    });
  }

  static getUserNotifications(req, res) {
    const userNotifications = [];
    models.User.findOne({
      where: {
        id: req.decoded.data.id
      }
    })
    .then((user) => {
      user.getGroups().then((groups) => {
        Object.keys(groups).forEach((group) => {
          // console.log('ecah group', group);
          GroupController.getNotifications(groups[group].id).then((notifics) => {
            notifics = JSON.stringify(notifics);
            notifics = JSON.parse(notifics);
            // console.log('this noticfis', notifics);
            Object.keys(notifics).forEach((eachValue) => {
              // console.log('notifications', notifics[eachValue]);
              userNotifications.push(notifics[eachValue]);
              console.log('all notifcations', userNotifications);
            });
          });
           res.json({ notifications: userNotifications });
        });
      });
    });
  }
  /**
   * @returns {void}
   * @param {object} req
   * @param {object} res
   */
  static AllGroupMembers(req, res) {
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

}

export default GroupController;

