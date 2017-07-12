import isEmpty from 'lodash/isEmpty';

import { User, Group, UserGroups, Post } from '../models/models';


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
    GroupActions.groupUnique = true;
    // GroupActions.userValid = true;
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
    User.findAll({
      where: {
        userName: name
      }

    }).then((user) => {
      console.log(user);
      if (isEmpty(user)) {
        GroupActions.userValid = false;
        console.log(GroupActions.userValid);
      } else {
        GroupActions.userValid = true;
      }
    });
  }
  /**
   * @param {string} groupname - name of the group
   * @param {string} id -  group id
   * @returns {object} - if there is no error, it sends message group created successfully
   */
  static checkGroupIsUnique(groupname) {
    Group.findOne({
      where: {
        name: groupname
      }

    }).catch((err) => {
      console.log(err);
      GroupActions.groupUnique = true;
    })
    .then((group) => {
      GroupActions.groupUnique = false;
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
      }).then((group) => {
        res.json({ group: { message: `${req.body.name} created successfully` , data: group} });
      })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ errors: { message: err.errors[0].message } });
        }));
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
      User.findAll({
        where: {
          userName: req.body.username
        }

      }).then((user) => {
        // console.log(GroupActions.userValid);
        if (isEmpty(user)) {
          res.status(500).json({ errors: { message: 'User does not exist' } });
        } else {
          // this.checkUserisUnique(req.body.username);
          UserGroups.findOne({
            where: {
              username: req.body.username,
              groupId: req.params.groupId
            }
          }).then((user) => {
            console.log(user);
            if (isEmpty(user) || user === null) {
              UserGroups.sync({ force: false }).then(() => UserGroups.create({
                username: req.body.username,
                groupId: req.params.groupId
              })
              .then((results) => {
                console.log(results);
                if (results) {
                  res.json({ message: 'user added to group' });
                } else {
                  res.status(500).json({ message: 'user already added to group' });
                }
              })
              .catch((err) => {
                res.status(500).json({ errors: { message: 'user added to group' } });
              }));
            } else if (user) {
              res.status(500).json({ message: 'user already added to group' });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ errors: { message: 'User does not exist' } });
      });
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
      Post.sync({ force: true }).then(() => Post.create({
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

