'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User Model:', function () {
  it('should be created successfully', function (done) {
    _models2.default.User.create({ username: 'user', password: 'pass', email: 'user@email.com' }).then(function (user) {
      _should2.default.exist(user);
    });
    done();
  });
});

describe('Group Model:', function () {
  it('should be created successfully', function (done) {
    _models2.default.Group.create({ groupname: 'group', groupCreator: 'user', userId: 1 }).then(function (group) {
      _should2.default.exist(group);
      done();
    });
  });
});

describe('Message Model:', function () {
  it('should be created successfully', function (done) {
    _models2.default.Message.create({ content: 'test-post', groupId: 1, userId: 1, priority: 'normal', messageCreator: 'johnny' }).then(function (post) {
      _should2.default.exist(post);
      done();
    });
  });
});