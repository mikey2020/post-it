'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _models = require('../models/models');

require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User Model Unit Tests:', function () {

  it('User should be created successfully', function (done) {
    _models.User.sync({ force: true }).then(function () {
      _models.User.create({ userName: 'user', password: 'pass', email: 'user@email.com' });
      _models.User.findOne({
        where: {
          userName: 'user'
        }
      }).then(function (user) {
        _should2.default.exist(user);
        user.should.equal({ userName: 'user', password: 'pass', email: 'user@email.com' });
      });
    });
    done();
  });
});

describe('Group Model Unit Tests:', function () {

  before(function (done) {
    _models.Group.sync({ force: true }).then(function () {
      return _models.Group.create({ name: 'test-group', creator: 'user', userId: 1 });
    });
    done();
  });

  it('Group should be created successfully', function (done) {
    _models.Group.findOne({
      where: {
        name: 'test-group'
      }
    }).then(function (group) {
      if (group) {
        _should2.default.exist(group);
      }
    });
    done();
  });

  after(function (done) {
    _models.Group.destroy({
      where: {
        name: 'test-group'
      }
    });
    done();
  });
});

describe('Post Model Unit Tests:', function () {

  before(function (done) {
    _models.Post.sync({ force: true }).then(function () {
      return _models.Post.create({ post: 'test-post', groupId: 1, groupName: 'test-group' });
    });
    done();
  });

  it('Post should be created successfully', function (done) {
    _models.Post.findOne({
      where: {
        post: 'test-pos'
      }
    }).then(function (post) {
      if (post) {
        _should2.default.exist(post);
      }
    });
    done();
  });

  after(function (done) {
    _models.Post.destroy({
      where: {
        post: 'test-post'
      }
    });
    done();
  });
});