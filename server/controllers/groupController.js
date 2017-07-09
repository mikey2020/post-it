// import { User, Group, UserGroups, Post } from '../models/models';
import models from '../models';

const Group = models.Group;

const UserGroups = models.UserGroups;

const User = models.User;

const Message = models.Message;

/**
 *  All group actions
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
   * @param {string} name - username
   * @param {string} id -  group id
   * @returns {object} - if there is no error, it sends message group created successfully
   */
  checkUserisUnique(name, id) {
    this.name = name;
    // GroupActions.checkUserIsValid(this.name);
    if (this.userValid === false) {
      return 'Invalid user';
    }
    UserGroups.findOne({
      where: {
        username: name,
        groupId: id
      }
    })
      .then((user) => {
        this.userUniqueness = false;
        JSON.stringify(user);
      });
  }
  /**
   * @param {string} name - username
   * @param {string} id -  group id
   * @returns {object} - if there is no error, it sends message group created successfully
   */
  static checkUserIsValid(name) {
    User.findOne({
      where: {
        username: name
      }

    }).then((user) => {
      GroupActions.userValid = false;
    });
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  createGroup(req, res) {
    if (req.session.name) {
      Group.create({
        groupname: req.body.name,
        groupCreator: req.session.name,
        userId: req.session.userId
      })
        .then(() => {
          res.json({ message: `${req.body.name} successfully created` });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: 'error saving to database' });
        });
    } else {
      res.status(401).json({ errors: { message: 'Please Sign in' } });
    }
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends user added successfully
   */
  addUserToGroup(req, res) {
    if (req.session.name) {
      GroupActions.checkUserIsValid(req.body.username);
      if (GroupActions.userValid === false) {
        res.status(500).json({ errors: { message: 'User does not exist' } });
      } else {
        UserGroups.create({
          username: req.body.username,
          groupId: req.params.groupId,
          groupname: req.body.groupname
        })
        .catch((err) => {
          this.error = err;
          this.sendError(res);
        });

        res.json({ message: 'user added to group' });
      }
    } else {
      res.status(401).json({ errors: { message: 'Please Sign in' } });
    }
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends message posted to group
   */
  postMessageToGroup(req, res) {
    if (req.session.name) {
      Message.create({
        content: req.body.message,
        groupname: req.body.groupname,
        groupId: req.params.groupId
      })
      .then(() => {
        res.json({ message: 'message posted to group' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: { message: 'error saving to database' } });
      });
    } else {
      res.status(401).json({ errors: { message: 'Please Sign in' } });
    }
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns an array of messages
   */
  getPosts(req, res) {
    if (req.session.name) {
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
        .catch((err) => {
          console.log(err);
          res.status(500).json({ errors: 'Something went wrong' });
        });
    } else {
      res.status(401).json({ errors: { message: 'Please Sign in' } });
    }
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
        username: req.params.username
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
          // res.json({ message: 'error saving to database' });
      });
  }

}


export default GroupActions;

