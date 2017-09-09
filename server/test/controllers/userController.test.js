import should from 'should';
import request from 'supertest';
import app from '../../app';
import models from '../../models';
import { validUserSignup, validUserSignin } from '../../seeders/user-seeders';

const user = request.agent(app);
let token;

describe('UserController', () => {
  before((done) => {
    models.sequelize.sync();
    done();
  });

  describe('should be able to', () => {
    it('add user to database', (done) => {
      request(app).post('/api/v1/user/signup')
        .send(validUserSignup)
        .end((err, res) => {
          res.status.should.equal(201);
          should.not.exist(err);
          should.exist(res.body.userToken);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('john successfully added');
          done();
        });
    });

    it('return "john signed in" when user signs in', (done) => {
      models.User.create(validUserSignin).then(() => {
        user.post('/api/v1/user/signin')
          .send(validUserSignin)
          .end((err, res) => {
            res.status.should.equal(200);
            should.not.exist(err);
            res.body.user.name.should.equal(validUserSignin.username);
            res.body.should.have.property('user', res.body.user);
            res.body.user.message.should.equal('johnny signed in');
            token = res.body.user.userToken;
            done();
          });
      });
    });
  });

  describe('should not work without signing in', () => {
    it('should return "please sign in" when trying to create group', (done) => {
      request(app).post('/api/v1/group')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('No token provided');
          done();
        });
    });

    it('should return "please sign in" when trying to add user ', (done) => {
      request(app).post('/api/v1/group/1/user')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('No token provided');
          done();
        });
    });

    it('should return "please sign in" when trying to post message', (done) => {
      request(app).post('/api/v1/group/1/message')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('No token provided');
          done();
        });
    });
  });

  describe('Test Edge Cases', () => {
    it('should return "invalid sign in parameters" when there is no username', (done) => {
      user.post('/api/v1/user/signin')
      .set('authorization', token)
      .send({ username: '', password: 'pass' })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "invalid sign in parameters" when there is no password', (done) => {
      user.post('/api/v1/user/signin')
      .set('authorization', token)
      .send({ username: 'user', password: '' })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "user does not exist" when trying added an unregistered user', (done) => {
      user.post('/api/v1/group/1/user')
      .set('authorization', token)
      .send({ username: 'user20' })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('errors', res.body.errors);
        done();
      });
    });

    it('should return "password length too short" when password is less than or equal to 4', (done) => {
      user.post('/api/v1/user/signup')
      .send({ username: 'test', password: 'pass', phoneNumber: '08123457690', email: 'test-email@yahoo.com', passwordConfirmation: 'pass' })
      .end((err, res) => {
        res.status.should.equal(400);
        should.not.exist(err);
        res.body.should.have.property('password', res.body.password);
        res.body.password.should.equal('Password length too short');
        done();
      });
    });

    it('should return "password do not match" when password & password confirmation are not equal', (done) => {
      user.post('/api/v1/user/signup')
      .send({ username: 'test', password: 'password', email: 'test-email@yahoo.com', passwordConfirmation: 'password1', phoneNumber: '' })
      .end((err, res) => {
        res.status.should.equal(400);
        should.not.exist(err);
        res.body.should.have.property('passwordConfirmation', res.body.passwordConfirmation);
        res.body.passwordConfirmation.should.equal('Passwords do not match');
        done();
      });
    });
  });
});
