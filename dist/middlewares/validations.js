'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validations = function () {
  function Validations() {
    _classCallCheck(this, Validations);
  }

  _createClass(Validations, [{
    key: 'signup',
    value: function signup(data) {
      var errors = {};

      if (data.username === null || data.username === '') {
        errors.username = 'Username is required';
      }

      if (data.email === null || data.email === '') {
        errors.email = 'Email is required';
      }

      if (data.email !== null || data.email !== '' && !_validator2.default.isEmail(data.email)) {
        errors.email = 'Email is invalid';
      }

      if (data.password === null || data.password === '') {
        errors.password = 'Password is required';
      }

      if (data.passwordConfirmation === null || data.passwordConfirmation === '') {
        errors.passwordConfirmation = 'Password Confirmation is required';
      }

      if (!_validator2.default.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords do not match';
      }

      return {
        errors: errors,

        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }, {
    key: 'signin',
    value: function signin(data) {
      var errors = {};

      if (data.username === null || data.username === '') {
        errors.username = 'Username is required';
      }

      if (data.password === null || data.password === '') {
        errors.password = 'Password is required';
      }

      return {
        errors: errors,

        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }, {
    key: 'createGroupInput',
    value: function createGroupInput(data) {
      var errors = {};

      if (data.input === null || data.input === '') {
        errors.input = 'Group name is required';
      }

      return {
        errors: errors,

        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }, {
    key: 'username',
    value: function username(data) {
      var errors = {};

      if (data.username === null || data.username === '') {
        errors.username = 'Username is required';
      }

      return {
        errors: errors,

        isValid: (0, _isEmpty2.default)(errors)
      };
    }
  }]);

  return Validations;
}();

exports.default = Validations;

// export {validateInput,validateSignIn,validateCreateGroupInput,validateUsername};