'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models/models');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupActions = function () {
  function GroupActions() {
    _classCallCheck(this, GroupActions);

    this.error = '';
    this.userIsUnique = true;
  }

  _createClass(GroupActions, [{
    key: 'sendError',
    value: function sendError(res) {
      if (this.error) {
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  }, {
    key: 'createGroup',
    value: function createGroup(req, res) {
      var _this = this;

      if (req.session.name) {
        _models.Group.sync({ force: false }).then(function () {
          return _models.Group.create({
            name: req.body.name,
            creator: req.session.name,
            userId: req.session.userId
          }).catch(function (err) {
            _this.error = err;
            _this.sendError(res);
            // res.status(500).json({ message: 'error saving to database' });
          });
        });

        res.json({ message: req.body.name + ' successfully created' });
      } else {
        res.status(401).json({ errors: { message: 'Please Sign in' } });
      }
    }
  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(req, res) {
      var _this2 = this;

      if (req.session.name) {

        GroupActions.checkUserisUnique(req.body.username, req.params.groupId);

        if (GroupActions.userIsUnique == false) {
          res.status(500).json({ errors: { message: req.body.username + ' already added to group' } });
        } else {
          _models.UserGroups.sync({ force: false }).then(function () {
            return _models.UserGroups.create({
              username: req.body.username,
              groupId: req.params.groupId
            }).catch(function (err) {
              _this2.error = err;
              _this2.sendError(res);
            });
          });

          res.json({ message: 'user added to group' });
        }
      } else {
        res.status(401).json({ errors: { message: 'Please Sign in' } });
      }
    }
  }, {
    key: 'postMessageToGroup',
    value: function postMessageToGroup(req, res) {
      var _this3 = this;

      if (req.session.name) {
        _models.Post.sync({ force: false }).then(function () {
          return _models.Post.create({
            post: req.body.post,
            groupId: req.params.groupId
          }).catch(function (err) {
            _this3.error = err;
            _this3.sendError(res);
            // res.status(500).json({ error: { message: 'error saving to database' } });
          });
        });

        res.json({ message: 'message posted to group' });
      } else {
        res.status(401).json({ errors: { message: 'Please Sign in' } });
      }
    }
  }, {
    key: 'getPosts',
    value: function getPosts(req, res) {
      var _this4 = this;

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
          _this4.error = err;
          _this4.sendError(res);
        });
      } else {
        res.status(401).json({ errors: { message: 'Please Sign in' } });
      }
    }
  }, {
    key: 'checkGroups',
    value: function checkGroups(req, res) {
      var _this5 = this;

      _models.Group.findOne({
        where: {
          name: req.params.name
        }
      }).then(function (group) {
        res.json({ group: group });
      }).catch(function (err) {
        _this5.error = err;
        _this5.sendError(res);
      });
    }
  }, {
    key: 'getUserGroups',
    value: function getUserGroups(req, res) {
      var _this6 = this;

      _models.Group.findAll({
        where: {
          creator: req.params.username
        }
      }).then(function (groups) {
        var data = JSON.stringify(groups);
        data = JSON.parse(data);
        res.json(data);
      }).catch(function (err) {
        _this6.error = err;
        _this6.sendError(res);
        // res.status(500).json({ errors: { message: 'error retrieving data from database' } });
      });
    }
  }, {
    key: 'getNumberOfGroups',
    value: function getNumberOfGroups(req, res) {
      var _this7 = this;

      _models.UserGroups.findAll({
        attributes: ['groupId'],

        where: {
          username: req.params.username
        }

      }).then(function (results) {
        var data = JSON.stringify(results);
        data = JSON.parse(data);
        res.json(data);
      }).catch(function (err) {
        _this7.error = err;
        _this7.sendError(res);
        // res.json({ message: 'error saving to database' });
      });
    }
  }, {
    key: 'checkUserisUnique',
    value: function checkUserisUnique(username, id) {
      var _this8 = this;

      _models.UserGroups.findOne({
        where: {
          username: username,
          groupId: id
        }
      }).then(function (user) {
        _this8.userUniqueness = false;
      });
    }
  }], [{
    key: 'checkUserisUnique',
    value: function checkUserisUnique(username, id) {
      var _this9 = this;

      _models.UserGroups.findOne({
        where: {
          username: username,
          groupId: id
        }
      }).then(function (user) {
        _this9.userUniqueness = false;
      });
    }
  }]);

  return GroupActions;
}();

exports.default = GroupActions;