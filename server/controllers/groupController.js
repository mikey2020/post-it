import { Group, UserGroups, Post } from '../models/models';

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
  static checkUserisUnique(name, id) {
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
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  createGroup(req, res) {
    if (req.session.name) {
      Group.sync({ force: false }).then(() => Group.create({
        name: req.body.name,
        creator: req.session.name,
        userId: req.session.userId
      })
        .catch((err) => {
          this.error = err;
          this.sendError(res);
          // res.status(500).json({ message: 'error saving to database' });
        }));

      res.json({ message: `${req.body.name} successfully created` });
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
      GroupActions.checkUserisUnique(req.body.username, req.params.groupId);

      if (GroupActions.userIsUnique === false) {
        res.status(500).json({ errors: { message: `${req.body.username} already added to group` } });
      } else {
        UserGroups.sync({ force: false }).then(() => UserGroups.create({
          username: req.body.username,
          groupId: req.params.groupId
        })
        .catch((err) => {
          this.error = err;
          this.sendError(res);
        }));

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
      Post.sync({ force: false }).then(() => Post.create({
        post: req.body.post,
        groupId: req.params.groupId
      })
        .catch((err) => {
          this.error = err;
          this.sendError(res);
          // res.status(500).json({ error: { message: 'error saving to database' } });
        }));

      res.json({ message: 'message posted to group' });
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
      Post.findAll({
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
          this.error = err;
          this.sendError(res);
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
        name: req.params.name
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
        creator: req.params.username
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

