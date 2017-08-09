'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();
/**
 *  All Validations
 * @class
 */

var Validations = function () {
  function Validations() {
    _classCallCheck(this, Validations);
  }

  _createClass(Validations, [{
    key: 'signup',


    /**
     * @param {object} data - signup object
     * @returns {object} - errors object if there is any
     */
    value: function signup(data) {
      this.errors = {};

      if (data.password) {
        data.password = data.password.trim();
      }
      if (!data.email || !data.password || !data.username) {
        this.errors.invalid = 'Invalid paramters';
      }

      if (data.username === null || data.username === '') {
        this.errors.username = 'Username is required';
      }

      if (data.email === null || data.email === '') {
        this.errors.email = 'Email is required';
      }

      if (data.email && !_validator2.default.isEmail(data.email)) {
        this.errors.email = 'Email is invalid';
      }

      if (data.password === null || data.password === '') {
        this.errors.password = 'Password is required';
      }
      if (data.password && data.password.length <= 4) {
        this.errors.password = 'Password length too short';
      }
      if (data.passwordConfirmation === null || data.passwordConfirmation === '') {
        this.errors.passwordConfirmation = 'Password Confirmation is required';
      }

      if (data.password && !_validator2.default.equals(data.password, data.passwordConfirmation)) {
        this.errors.passwordConfirmation = 'Passwords do not match';
      }

      var errors = this.errors;

      return {
        errors: errors,

        isValid: (0, _isEmpty2.default)(errors)
      };
    }

    /**
     * @param {object} data - signup object
     * @returns {object} - errors object if there is any
     */

  }], [{
    key: 'checkUserIsValid',
    value: function checkUserIsValid(req, res, next) {
      _models2.default.User.findOne({
        where: {
          id: req.body.userId
        }
      }).then(function (validUser) {
        console.log(validUser);
        if (validUser === null) {
          return res.status(400).json({ errors: { message: 'user does not exist' } });
        }
        req.validUserId = validUser.id;
        next();
      });
    }

    /**
     * @param {object} req - signup object
     * @param {object} res - errors object if there is any
     * @param {object} next - returns data to next middleware
     * @returns {object} -returns error if there is any
     */

  }, {
    key: 'authenticate',
    value: function authenticate(req, res, next) {
      var authorizationHeader = req.headers.authorization;
      var token = void 0;
      if (authorizationHeader) {
        token = authorizationHeader;
      }
      if (token) {
        _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
          if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
          }
          req.decoded = decoded;
          next();
        });
      } else {
        return res.status(400).send({
          success: false,
          message: 'No token provided'
        });
      }
    }
    /**
     * @param {object} req - signup object
     * @param {object} res - errors object if there is any
     * @param {object} next - returns data to next middleware
     * @returns {object} -returns error if there is any
     */

  }, {
    key: 'isGroupMember',
    value: function isGroupMember(req, res, next) {
      _models2.default.UserGroups.findOne({
        where: {
          userId: req.decoded.data.id,
          groupId: req.params.groupId
        }
      }).then(function (user) {
        if (user) {
          next();
        } else {
          res.status(400).json({ errors: { message: 'You are not a part of this group' } });
        }
      });
    }

    /**
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Object} next - response object
     * @returns {void}
     */

  }, {
    key: 'checkGroupExists',
    value: function checkGroupExists(req, res, next) {
      _models2.default.Group.findOne({
        where: {
          id: req.params.groupId
        }
      }).then(function (validGroup) {
        if (validGroup === null) {
          return res.status(400).json({ errors: { message: 'group does not exist' } });
        }
        next();
      });
    }
  }]);

  return Validations;
}();

exports.default = Validations;