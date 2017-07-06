'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _models = require('../models/models');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = _supertest2.default.agent(_app2.default);

describe('Test api routes', function () {
  before(function (done) {
    _models.User.sync({ force: true }).then(function () {
      _models.User.create({ userName: 'test-user', email: 'test-email@yahoo.com', password: 'pass' });

      done();
    });
  });

  describe(' All routes should work after signing in', function () {
    it('should return "test-user signed in" ', function (done) {
      user.post('/api/user/signin').send({ username: 'test-user', password: 'pass' }).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('user', res.body.user);
        res.body.user.message.should.equal('test-user signed in');
        done();
      });
    });

    it('should create `test-group successfully` ', function (done) {
      user.post('/api/group').send({ name: 'test-group' }).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('test-group successfully created');
        done();
      });
    });

    it('should return "user added to group" ', function (done) {
      user.post('/api/group/1/user').send({ username: 'user3' }).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('user added to group');
        done();
      });
    });

    it('should return "message posted to group" ', function (done) {
      user.post('/api/group/1/message').send({ post: 'how is everybody doing?' }).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('message posted to group');
        done();
      });
    });

    it('should return all messages posted to group ', function (done) {
      user.get('/api/group/1/messages').end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('posts', res.body.posts);
        res.body.posts.should.not.equal(null);
        done();
      });
    });

    it('should return group created by test-user', function (done) {
      user.get('/api/groups/test-user').end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        done();
      });
    });
  });

  describe('Routes should not work without signing in', function () {
    it('should return "please sign in" ', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/group').end(function (err, res) {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('Please Sign in');
        done();
      });
    });

    it('should return "please sign in" ', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/group/1/user').end(function (err, res) {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('Please Sign in');
        done();
      });
    });

    it('should return "please sign in" ', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/group/1/message').end(function (err, res) {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('Please Sign in');
        done();
      });
    });

    it('should return "please sign in" ', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/group/1/messages').end(function (err, res) {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('Please Sign in');
        done();
      });
    });
  });

  describe('Test Edge Cases', function () {

    it('should return "invalid sign in parameters" when there is no username', function (done) {
      user.post('/api/user/signin').send({ username: '', password: 'pass' }).end(function (err, res) {
        //res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "invalid sign in parameters" when there is no password', function (done) {
      user.post('/api/user/signin').send({ username: 'user', password: '' }).end(function (err, res) {
        //res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });
  });

  after(function (done) {
    _models.Group.destroy({
      where: {
        name: 'test-group'
      }
    });

    _models.User.destroy({
      where: {
        userName: 'test-user'
      }
    });

    _models.Post.destroy({
      where: {
        groupId: 1,
        post: 'how is everybody doing?'
      }
    });

    _models.UserGroups.destroy({
      where: {
        username: 'user3'
      }
    });

    done();
  });
});