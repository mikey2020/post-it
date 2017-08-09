'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = _models2.default.Group;

var UserGroups = _models2.default.UserGroups;

var Message = _models2.default.Message;

/**
 * All group actions
 * @class
 */

var GroupActions = function () {

  /**
   * @constructor
   */
  function GroupActions() {
    _classCallCheck(this, GroupActions);

    this.error = '';
    this.userIsUnique = true;
    this.userValid = true;
  }

  /**
   * @param {object} res -  response object from an endpoint
   * @returns {object} - message to notify user something is wrong
   */


  _createClass(GroupActions, [{
    key: 'sendError',
    value: function sendError(res) {
      if (this.error) {
        res.status(500).json({ message: this.error });
      }
    }

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends (username) created successfully
     */

  }, {
    key: 'checkGroups',

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {void}
     */
    value: function checkGroups(req, res) {
      var _this = this;

      Group.findOne({
        where: {
          groupname: req.params.name
        }
      }).then(function (group) {
        res.json({ group: group });
      }).catch(function (err) {
        _this.error = err;
        _this.sendError(res);
      });
    }

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it returns an array of groups a user has created
     */

  }, {
    key: 'getUserGroups',
    value: function getUserGroups(req, res) {
      var _this2 = this;

      Group.findAll({
        where: {
          groupCreator: req.params.username
        }
      }).then(function (groups) {
        var data = JSON.stringify(groups);
        data = JSON.parse(data);
        res.json(data);
      }).catch(function (err) {
        _this2.error = err;
        _this2.sendError(res);
        // res.status(500).json({ errors: { message: 'error retrieving data from database' } });
      });
    }

    /**
    * @param {object} req - request object sent to a route
    * @param {object} res -  response object from the route
    * @returns {object} - if there is no error, it returns array of users in a group
    */

  }], [{
    key: 'createGroup',
    value: function createGroup(req, res) {
      Group.create({
        groupname: req.body.name,
        groupCreator: req.decoded.data.username,
        userId: req.decoded.data.id
      }).then(function (group) {
        group.addUser(req.decoded.data.id).then(function () {
          res.json({ group: { message: req.body.name + ' created successfully', data: group } });
        });
      }).catch(function () {
        res.status(400).json({ error: { message: 'group already exists' } });
      });
    }
    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends user added successfully
     */

  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(req, res) {
      _models2.default.Group.findOne({
        where: {
          id: req.params.groupId
        }
      }).then(function (group) {
        return group.addUser(req.validUserId).then(function () {
          res.json({ message: 'user added successfully' });
        });
      }).catch(function () {
        res.status(400).json({ error: { message: 'Group does not exist' } });
      });
    }

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends message posted to group
     */

  }, {
    key: 'postMessageToGroup',
    value: function postMessageToGroup(req, res) {
      Message.create({
        content: req.body.message,
        groupId: req.params.groupId,
        userId: req.decoded.data.id,
        priority: req.body.priority,
        messageCreator: req.body.creator
      }).then(function (message) {
        if (message !== null) {
          message.addUser(req.decoded.data.id).then(function () {
            res.json({ message: 'message posted to group', data: message });
          });
        }
      }).catch(function () {
        res.status(500).json({ error: { message: 'error saving to database' } });
      });
    }
    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it returns an array of messages
     */

  }, {
    key: 'getPosts',
    value: function getPosts(req, res) {
      Message.findAll({
        where: {
          groupId: req.params.groupId
        }
      }).then(function (posts) {
        var data = JSON.stringify(posts);
        data = JSON.parse(data);
        res.json({ posts: data });
      }).catch(function () {
        res.status(500).json({ errors: 'Something went wrong' });
      });
    }
  }, {
    key: 'getGroupMembers',
    value: function getGroupMembers(req, res) {
      UserGroups.findAll({
        where: {
          groupId: req.params.groupId
        }
      }).then(function (groups) {
        res.json({ data: groups });
      });
    }
    /**
       * @param {object} req - request object sent to a route
       * @param {object} res -  response object from the route
       * @returns {object} - if there is no error, it returns array of users in a group
       */

  }, {
    key: 'getGroupsUserIsMember',
    value: function getGroupsUserIsMember(req, res) {
      _models2.default.User.findOne({
        where: {
          id: req.decoded.data.id
        }
      }).then(function (user) {
        return user.getGroups({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).then(function (groups) {
          var userGroups = JSON.stringify(groups);
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

  }, {
    key: 'getUsersWhoReadMessage',
    value: function getUsersWhoReadMessage(req, res) {
      _models2.default.Message.findOne({
        where: {
          id: req.params.messageId
        }
      }).then(function (message) {
        return message.getUsers({ attributes: { exclude: ['createdAt', 'updatedAt'] } }).then(function (users) {
          var messageReaders = JSON.stringify(users);
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

  }, {
    key: 'readMessage',
    value: function readMessage(req, res) {
      _models2.default.Message.findOne({
        where: {
          id: req.params.messageId
        }
      }).then(function (message) {
        if (req.decoded.data.id !== message.userId) {
          message.addUser(req.decoded.data.id).then(function (user) {
            console.log(user);
            res.json({ message: 'user read this mesage', data: message });
          }).catch(function (err) {
            console.log(err);
            res.json({ message: 'something went wrong registering read message' });
          });
        } else {
          res.json({ message: 'user already read message' });
        }
      }).catch(function (err) {
        console.log(err);
        res.json({ message: 'something went wrong finding message' });
      });
    }
  }]);

  return GroupActions;
}();

exports.default = GroupActions;