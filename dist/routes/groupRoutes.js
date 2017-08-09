'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _groupController = require('../controllers/groupController');

var _groupController2 = _interopRequireDefault(_groupController);

var _unique = require('../middlewares/unique');

var _unique2 = _interopRequireDefault(_unique);

var _validations = require('../middlewares/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var group = new _groupController2.default();

exports.default = function (app) {
  app.get('/api/group/:groupId/messages', _validations2.default.authenticate, _validations2.default.checkGroupExists, _validations2.default.isGroupMember, _groupController2.default.getPosts);

  app.post('/api/group', _validations2.default.authenticate, _groupController2.default.createGroup);

  app.get('/api/group/:name', _validations2.default.authenticate, group.checkGroups);

  app.get('/api/groups/user', _validations2.default.authenticate, group.getUserGroups);

  app.post('/api/group/:groupId/user', _validations2.default.authenticate, _validations2.default.checkGroupExists, _validations2.default.checkUserIsValid, _unique2.default.userGroups, _groupController2.default.addUserToGroup);

  app.post('/api/group/:groupId/message', _validations2.default.authenticate, _validations2.default.checkGroupExists, _validations2.default.isGroupMember, _groupController2.default.postMessageToGroup);

  app.get('/api/group/:groupId/users', _validations2.default.checkGroupExists, _groupController2.default.getGroupMembers);

  app.post('/api/message/:messageId/readers', _groupController2.default.getUsersWhoReadMessage);

  app.post('/api/usergroups', _validations2.default.authenticate, _groupController2.default.getGroupsUserIsMember);

  app.post('/api/user/:messageId/read', _validations2.default.authenticate, _unique2.default.checkMessageRead, _groupController2.default.readMessage);
};