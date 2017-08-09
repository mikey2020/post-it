'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _userSeeders = require('../seeders/user-seeders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = _supertest2.default.agent(_app2.default);
var token = void 0;
var groupId = void 0;
describe('All routes', function () {
  before(function (done) {
    _models2.default.sequelize.sync();
    done();
  });

  describe('should work', function () {
    it('should add user to database', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/user/signup').send(_userSeeders.validUserSignup).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('john successfully added');
        token = res.body.userToken;
        done();
      });
    });
    it('should return "john signed in" ', function (done) {
      _models2.default.User.create(_userSeeders.validUserSignin).then(function () {
        user.post('/api/user/signin').send(_userSeeders.validUserSignin).end(function (err, res) {
          res.status.should.equal(200);
          _should2.default.not.exist(err);
          res.body.should.have.property('user', res.body.user);
          res.body.user.message.should.equal('johnny signed in');
          done();
        });
      });
    });

    it('should create `test-group successfully` ', function (done) {
      user.post('/api/group').set('authorization', token).send({ name: 'test-group' }).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        groupId = res.body.group.data.id;
        done();
      });
    });

    it('should return "user added to group" ', function (done) {
      _models2.default.User.create({ username: 'bat', email: 'batman@email.com', password: 'pass', passwordConfirmation: 'pass' }).then(function (newUser) {
        user.post('/api/group/1/user').set('authorization', token).send({ userId: newUser.id }).end(function (err, res) {
          res.status.should.equal(200);
          _should2.default.not.exist(err);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('user added successfully');
          done();
        });
      });
    });

    it('should return "message posted to group" ', function (done) {
      user.post('/api/group/' + groupId + '/message').set('authorization', token).send({ message: 'This functions is working well', priority: 'normal', creator: 'johnny' }).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('message posted to group');
        done();
      });
    });

    it('should return all messages posted to a particular group ', function (done) {
      user.get('/api/group/' + groupId + '/messages').set('authorization', token).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        done();
      });
    });

    it('should return groups created by test-user', function (done) {
      user.get('/api/groups/user').set('authorization', token).end(function (err, res) {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
        done();
      });
    });
  });

  describe('should not work without signing in', function () {
    it('should return "please sign in" when trying to create group', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/group').end(function (err, res) {
        res.status.should.equal(400);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('No token provided');
        done();
      });
    });

    it('should return "please sign in" when trying to add user ', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/group/1/user').end(function (err, res) {
        res.status.should.equal(400);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('No token provided');
        done();
      });
    });

    it('should return "please sign in" when trying to post message', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/group/1/message').end(function (err, res) {
        res.status.should.equal(400);
        res.body.should.have.property('message', res.body.message);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
  });

  describe('Test Edge Cases', function () {
    it('should return "invalid sign in parameters" when there is no username', function (done) {
      user.post('/api/user/signin').set('authorization', token).send({ username: '', password: 'pass' }).end(function (err, res) {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "invalid sign in parameters" when there is no password', function (done) {
      user.post('/api/user/signin').set('authorization', token).send({ username: 'user', password: '' }).end(function (err, res) {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "user does not exist" when trying added an unregistered user', function (done) {
      user.post('/api/group/1/user').set('authorization', token).send({ username: 'user20' }).end(function (err, res) {
        res.status.should.equal(400);
        res.body.should.have.property('errors', res.body.errors);
        done();
      });
    });

    it('should return "password length too short" when password is less than or equal to 4', function (done) {
      user.post('/api/user/signup').send({ username: 'test', password: 'pass', email: 'test-email@yahoo.com', passwordConfirmation: 'pass' }).end(function (err, res) {
        res.status.should.equal(400);
        _should2.default.not.exist(err);
        res.body.should.have.property('password', res.body.password);
        res.body.password.should.equal('Password length too short');
        done();
      });
    });

    it('should return "password do not match" when password & password confirmation are not equal', function (done) {
      user.post('/api/user/signup').send({ username: 'test', password: 'password', email: 'test-email@yahoo.com', passwordConfirmation: 'password1' }).end(function (err, res) {
        res.status.should.equal(400);
        _should2.default.not.exist(err);
        res.body.should.have.property('passwordConfirmation', res.body.passwordConfirmation);
        res.body.passwordConfirmation.should.equal('Passwords do not match');
        done();
      });
    });
  });
});