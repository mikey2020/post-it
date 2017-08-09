'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _validations = require('../middlewares/validations');

var _validations2 = _interopRequireDefault(_validations);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var User = _models2.default.User;

var validate = new _validations2.default();

/**
 *  All user actions
 * @class
 */

var UserActions = function () {

  /**
   * @constructor
   */
  function UserActions() {
    _classCallCheck(this, UserActions);

    this.onlineStatus = false;
    this.userValid = true;
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */


  _createClass(UserActions, [{
    key: 'allUsers',


    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends (username) created successfully
     */
    value: function allUsers(req, res) {
      var _this = this;

      User.findAll({}).then(function (data) {
        res.json({ data: data });
      }).catch(function (err) {
        _this.errors = err;
        res.json({ errors: { err: err } });
      });
    }

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends (username) created successfully
     */

  }], [{
    key: 'signup',
    value: function signup(req, res) {
      var _validate$signup = validate.signup(req.body),
          errors = _validate$signup.errors,
          isValid = _validate$signup.isValid;

      if (!isValid) {
        res.status(400).json(errors);
      } else {
        return User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }).then(function (user) {
          var userData = JSON.stringify(user);
          userData = JSON.parse(userData);
          var token = _jsonwebtoken2.default.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
          res.json({ message: req.body.username + ' successfully added', userToken: token });
        }).catch(function () {
          res.status(400).json({ errors: { message: 'error something went wrong' } });
        });
      }
    }
    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends (username) created successfully
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      User.findOne({
        where: {
          username: req.body.username
        }
      }).then(function (user) {
        var userData = JSON.stringify(user);
        userData = JSON.parse(userData);
        if (req.body.username && req.body.password && _bcryptNodejs2.default.compareSync(req.body.password, userData.password) === true) {
          var token = _jsonwebtoken2.default.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
          res.json({ user: { name: req.body.username, message: req.body.username + ' signed in', userToken: token } });
        } else {
          res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
        }
      }).catch(function () {
        res.status(400).json({ errors: { form: 'Invalid Signin Parameters' } });
      });
    }
    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends (username) created successfully
     */

  }, {
    key: 'checkUserExists',
    value: function checkUserExists(req, res) {
      User.findOne({

        where: {
          username: req.body.username
        }

      }).then(function (user) {
        res.json({ user: user });
      });
    }
  }, {
    key: 'getUsers',
    value: function getUsers(req, res) {
      User.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {
          username: {
            $iLike: '%' + req.body.username + '%'
          }
        } }, { offset: req.body.offset, limit: 5 }).then(function (data) {
        res.json({ users: { data: data } });
      }).catch(function () {
        res.json({ errors: { message: 'something went wrong' } });
      });
    }

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @returns {object} - if there is no error, it sends (username) created successfully
     */

  }, {
    key: 'resetPassword',
    value: function resetPassword(req, res) {
      User.findOne({
        where: {
          username: req.body.username
        }
      }).then(function (user) {
        var userData = JSON.stringify(user);
        userData = JSON.parse(userData);
        console.log('old password', userData);
        user.password = req.body.password;

        user.save().then(function (newUser) {
          console.log('new user', newUser);
          console.log('passsword seems to be updated');
          res.json({ message: 'password has been changed' });
        });
      }).catch(function (err) {
        console.log(err);
        res.status(400).json({ errors: { form: 'Invalid Username' } });
      });
    }
  }]);

  return UserActions;
}();

exports.default = UserActions;