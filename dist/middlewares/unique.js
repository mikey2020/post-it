'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** All uniqueness validators
 * @class
 */
var Unique = function () {

  /**
   * @constructor
   */
  function Unique() {
    _classCallCheck(this, Unique);

    Unique.isAuthenticated = false;
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @param {object} next - response object that sends data to the next middleware
   * @returns {object} - if there is no error, it returns array of users in a group
   */


  _createClass(Unique, null, [{
    key: 'userGroups',
    value: function userGroups(req, res, next) {
      _models2.default.UserGroups.findOne({
        where: {
          userId: req.validUserId,
          groupId: req.params.groupId
        }
      }).then(function (user) {
        if (user) {
          return res.status(400).json({ errors: { message: 'user already added to group' } });
        }
        next();
      });
    }

    /**
     * @param {object} req - request object sent to a route
     * @param {object} res -  response object from the route
     * @param {object} next - response object that sends data to the next middleware
     * @returns {object} - if there is no error, it returns array of users in a group
     */

  }, {
    key: 'checkMessageRead',
    value: function checkMessageRead(req, res, next) {
      _models2.default.ReadMessages.findOne({
        where: {
          messageId: req.params.messageId,
          userId: req.decoded.data.id
        }
      }).then(function (readMessage) {
        if (readMessage) {
          return res.status(400).json({ errors: { message: 'user has already read this message' } });
        }
        next();
      });
    }
  }]);

  return Unique;
}();

exports.default = Unique;