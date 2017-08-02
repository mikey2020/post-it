
import should from 'should';

import request from 'supertest';

import app from '../app';

import models from '../models';

import { validUserSignup, validUserSignin } from '../seeders/user-seeders';

const user = request.agent(app);

describe('All routes', () => {
  before((done) => {
    models.sequelize.sync();
    done();
  });

  describe('should work', () => {
    it('should add user to database', (done) => {
      request(app).post('/api/user/signup')
        .send(validUserSignup)
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('john successfully added');
          done();
        });
    });
    it('should return "john signed in" ', (done) => {
      models.User.create(validUserSignin).then(() => {
        user.post('/api/user/signin')
        .send(validUserSignin)
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('user', res.body.user);
          res.body.user.message.should.equal('johnny signed in');
          done();
        });
      });
    });

    it('should create `test-group successfully` ', (done) => {
      user.post('/api/group')
        .send({ name: 'test-group' })
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          done();
        });
    });

    it('should return "user added to group" ', (done) => {
      models.User.create({ username: 'bat', email: 'batman@email.com', password: 'pass', passwordConfirmation: 'pass' }).then((newUser) => {
      user.post('/api/group/1/user')
        .send({ userId: newUser.id })
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('user added successfully');
          done();
        });
      });
    });

    it('should return "message posted to group" ', (done) => {
      user.post('/api/group/2/message')
        .send({ message: 'how is everybody doing?', groupname: 'test-group' })
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('message posted to group');
          done();
        });
    });

    it('should return all messages posted to group ', (done) => {
      user.get('/api/group/2/messages')
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          done();
        });
    });

    it('should return groups created by test-user', (done) => {
      user.get('/api/groups/user')
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          done();
        });
    });
  });

  describe('should not work without signing in', () => {
    it('should return "please sign in" when trying to create group', (done) => {
      request(app).post('/api/group')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('errors', res.body.errors);
          res.body.errors.message.should.equal('Please Sign in');
          done();
        });
    });

    it('should return "please sign in" when trying to add user ', (done) => {
      request(app).post('/api/group/1/user')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('errors', res.body.errors);
          res.body.errors.message.should.equal('Please Sign in');
          done();
        });
    });

    it('should return "please sign in" when trying to post message', (done) => {
      request(app).post('/api/group/1/message')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('errors', res.body.errors);
          res.body.errors.message.should.equal('Please Sign in');
          done();
        });
    });
  });

  describe('Test Edge Cases', () => {
    it('should return "invalid sign in parameters" when there is no username', (done) => {
      user.post('/api/user/signin')
      .send({ username: '', password: 'pass' })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "invalid sign in parameters" when there is no password', (done) => {
      user.post('/api/user/signin')
      .send({ username: 'user', password: '' })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "user does not exist" when trying added an unregistered user', (done) => {
      user.post('/api/group/1/user')
      .send({ username: 'user20' })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('errors', res.body.errors);
        done();
      });
    });

    /*it('should return "username should be unique" when to use already registered username', (done) => {
      user.post('/api/user/signup')
      .send({ username: 'test-user', password: 'password', email: 'est@email.com', passwordConfirmation: 'password' })
      .end((err, res) => {
        res.status.should.equal(400);
        should.not.exist(err);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('username must be unique');
        done();
      });
    });*/

    it('should return "password length too short" when password is less than or equal to 4', (done) => {
      user.post('/api/user/signup')
      .send({ username: 'test', password: 'pass', email: 'test-email@yahoo.com', passwordConfirmation: 'pass' })
      .end((err, res) => {
        res.status.should.equal(400);
        should.not.exist(err);
        res.body.should.have.property('password', res.body.password);
        res.body.password.should.equal('Password length too short');
        done();
      });
    });

    it('should return "password do not match" when password & password confirmation are not equal', (done) => {
      user.post('/api/user/signup')
      .send({ username: 'test', password: 'password', email: 'test-email@yahoo.com', passwordConfirmation: 'password1' })
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
