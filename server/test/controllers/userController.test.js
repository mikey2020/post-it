import should from 'should';
import request from 'supertest';
import app from '../../app';
import models from '../../models';
import { johnSignup, johnnySignin } from '../../seeders/user-seeders';

const user = request.agent(app);
let token;

describe('UserController', () => {
  before((done) => {
    models.sequelize.sync();
    done();
  });

  describe('should be able to', () => {
    it('register a new user to the database', (done) => {
      request(app).post('/api/v1/user/signup')
        .send(johnSignup)
        .end((err, res) => {
          res.status.should.equal(201);
          should.not.exist(err);
          should.exist(res.body.userToken);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('john successfully added');
          done();
        });
    });

    it('return success message when user signs in', (done) => {
      models.User.create(johnnySignin).then(() => {
        user.post('/api/v1/user/signin')
          .send(johnnySignin)
          .end((err, res) => {
            res.status.should.equal(200);
            should.not.exist(err);
            res.body.should.have.property('user', res.body.user);
            res.body.user.message.should.equal('johnny signed in');
            token = res.body.user.userToken;
            done();
          });
      });
    });
  });

  describe('should not work without signing in', () => {
    it('should return error message when trying to create group', (done) => {
      request(app).post('/api/v1/group')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('No token provided');
          done();
        });
    });

    it('should return error message when trying to add user to a group ', (done) => {
      request(app).post('/api/v1/group/1/user')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('No token provided');
          done();
        });
    });

    it('should return error message when trying to post message', (done) => {
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
    it(`should return return error message
      when there is no username`, (done) => {
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

    it(`should return error message 
      when there is no password`, (done) => {
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

    it(`should return error message 
     when trying to add an unregistered user`, (done) => {
      user.post('/api/v1/group/1/user')
      .set('authorization', token)
      .send({ username: 'user20' })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('errors', res.body.errors);
        done();
      });
    });

    it('should return error message when password is equal to 4',
    (done) => {
      user.post('/api/v1/user/signup')
      .send(
        { username: 'test',
          password: 'pass',
          phoneNumber: '08123457690',
          email: 'test-email@yahoo.com',
          passwordConfirmation: 'pass' })
      .end((err, res) => {
        res.status.should.equal(400);
        should.not.exist(err);
        res.body.should.have.property('password', res.body.password);
        res.body.password.should.equal('Password length too short');
        done();
      });
    });

    it('should return error message when password confirmation fails',
    (done) => {
      user.post('/api/v1/user/signup')
      .send({ username: 'test',
        password: 'password',
        email: 'test-email@yahoo.com',
        passwordConfirmation: 'password1',
        phoneNumber: '' })
      .end((err, res) => {
        res.status.should.equal(400);
        should.not.exist(err);
        res.body.should.have.property('passwordConfirmation',
        res.body.passwordConfirmation);
        res.body.passwordConfirmation.should.equal('Passwords do not match');
        done();
      });
    });
  });
});
