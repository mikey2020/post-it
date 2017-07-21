import models from '../models';

import Validations from '../middlewares/validations';


const Group = models.Group;

const UserGroups = models.UserGroups;

const User = models.User;

const Message = models.Message;

const validate = new Validations();

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
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  createGroup(req, res) {
      Group.create({
        groupname: req.body.name,
        groupCreator: req.session.name,
        userId: req.session.userId
      }).then((group) => {
        group.addUser(req.session.userId).then(() => {
          res.json({ group: { message: `${req.body.name} created successfully`, data: group } });
        });
      })
      .catch((err) => {
        res.status(400).json({ error: { message: 'group already exists' } });
      });
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends user added successfully
   */
  addUserToGroup(req, res) {
      models.Group.findOne({
        where: {
          id: req.params.groupId
        }
      }).then((group) => {
        return group.addUser(req.body.userId)
        .then((user) => {
          console.log(user);
          res.json({ message: 'user added successfully' });
        });
      }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: { message: 'Group does not exist' } });
      });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends message posted to group
   */
  postMessageToGroup(req, res) {
      Message.create({
        content: req.body.message,
        groupId: req.params.groupId,
        userId: req.session.userId
      })
      .then((message) => {
        console.log(message);
        res.json({ message: 'message posted to group' });
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
  getPosts(req, res) {
      Message.findAll({
        where: {
          groupId: req.params.groupId
        }
      })
        .then((posts) => {
          console.log(posts);
          let data = JSON.stringify(posts);
          data = JSON.parse(data);
          res.json({ posts: data });
        })
        .catch((err) => {
          console.log(err);
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
      });
  }
   /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  getGroupMembers(req, res) {
    UserGroups.findAll({
      where: {
        groupId: req.params.groupId
      }
    }).then((groups) => {
      res.json({ data: groups });
    });
  }

}


export default GroupActions;

