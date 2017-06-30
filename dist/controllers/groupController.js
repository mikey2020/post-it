'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../db');

var _models = require('../models/models');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupActions = function () {
  function GroupActions() {
    _classCallCheck(this, GroupActions);
  }

  _createClass(GroupActions, [{
    key: 'createGroup',


    // Method for creating new group
    value: function createGroup(req, res) {
      if (req.session.name) {
        _models.Group.sync({ force: false }).then(function () {
          return _models.Group.create({
            name: req.body.input,
            creator: req.session.name,
            userId: req.session.userId
          }).catch(function (err) {
            res.status(500).json({ message: 'error saving to database' });
          });
        });

        res.json({ message: req.body.name + ' successfully created' });
      } else {
        res.status(401).json({ errors: { message: 'Please Sign in first' } });
      }
    }
  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(req, res) {
      if (req.session.name) {
        _models.UserGroups.findOne({
          where: {
            username: req.body.username,
            groupId: req.params.groupId
          }
        }).then(function (user) {
          if (user) {
            res.status(500).json({ errors: { message: req.body.username + ' already added to group' } });
          } else {
            _models.UserGroups.sync({ force: false }).then(function () {
              return _models.UserGroups.create({
                username: req.body.username,
                groupId: req.params.groupId
              }).catch(function (err) {
                console.log(err);
                res.json({ message: 'error saving to database' });
              });
            });

            res.json({ message: 'user added to group' });
          }
        }).catch(function (err) {
          _models.UserGroups.sync({ force: true }).then(function () {
            return _models.UserGroups.create({
              username: req.body.username,
              groupId: req.params.groupId
            }).catch(function (err) {
              console.log(err);
              res.json({ message: 'error saving to database' });
            });
          });
          res.json({ message: 'user added to group' });
        });
      } else {
        res.status(401).json({ errors: { message: 'Please Sign in first' } });
      }
    }
  }, {
    key: 'postMessageToGroup',
    value: function postMessageToGroup(req, res) {
      if (req.session.name) {
        _models.Post.sync({ force: false }).then(function () {
          return _models.Post.create({
            post: req.body.post,
            groupId: req.params.groupId
          }).catch(function (err) {
            console.log(err);
            res.status(500).json({ error: { message: 'error saving to database' } });
          });
        });

        res.json({ message: 'message posted to group' });
      } else {
        res.status(401).json({ errors: { message: 'please login first' } });
      }
    }
  }, {
    key: 'getPosts',
    value: function getPosts(req, res) {
      if (req.session.name) {
        _models.Post.findAll({
          where: {
            groupId: req.params.groupId
          }
        }).then(function (posts) {
          var data = JSON.stringify(posts);
          data = JSON.parse(data);
          res.json({ posts: data });
        }).catch(function (err) {
          res.json({ message: 'error saving to database' });
        });
      } else {
        res.status(401).json({ errors: { message: 'please login first' } });
      }
    }
  }, {
    key: 'checkGroups',
    value: function checkGroups(req, res) {
      _models.Group.findOne({
        where: {
          name: req.params.name
        }
      }).then(function (group) {
        res.json({ group: group });
      });
    }
  }, {
    key: 'getUserGroups',
    value: function getUserGroups(req, res) {
      _models.Group.findAll({
        where: {
          creator: req.params.username
        }
      }).then(function (groups) {
        var data = JSON.stringify(groups);
        data = JSON.parse(data);
        res.json(data);
      }).catch(function (err) {
        res.status(500).json({ errors: { message: 'error retrieving data from database' } });
      });
    }
  }, {
    key: 'getNumberOfGroups',
    value: function getNumberOfGroups(req, res) {
      _models.UserGroups.findAll({
        attributes: ['groupId'],

        where: {
          username: req.params.username
        }

      }).then(function (results) {
        var data = JSON.stringify(results);
        data = JSON.parse(data);
        console.log(data);
        res.json(data);
      });
    }
  }]);

  return GroupActions;
}();

exports.default = GroupActions;
// export {createGroup,addUserToGroup,postMessageToGroup,getPosts,checkGroups,getUserGroups} ;