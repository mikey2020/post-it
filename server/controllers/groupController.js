import models from '../models';

const Group = models.Group;

const UserGroups = models.UserGroups;

const Message = models.Message;

/**
 * All group actions
 * @class
 */
class GroupActions {

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
        res.status(400).json({ error: { message: 'group already exists' } });
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
      priority: req.body.priority
    })
      .then((message) => {
        if (message !== null) {
          message.addUser(req.decoded.data.id).then(() => {
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
   * @returns {object} - if there is no error, it returns number of groups a user is part of
   */
  getNumberOfGroups(req, res) {
    UserGroups.findAll({
      attributes: ['groupId'],
      where: {
        userId: req.body.userId
      }
    })
      .then((results) => {
        let data = JSON.stringify(results);
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
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  static getGroupMembers(req, res) {
    UserGroups.findAll({
      where: {
        groupId: req.params.groupId
      }
    }).then((groups) => {
      res.json({ data: groups });
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
        message.addUser(req.decoded.data.id).then((user) => {
          console.log(user);
          res.json({ message: 'user read this mesage', data: message });
        }).catch((err) => {
          console.log(err);
          res.json({ message: 'something went wrong registering read message' });
        });
      } else {
        res.json({ message: 'user already read message' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: 'something went wrong finding message' });
    });
  }

}


export default GroupActions;

