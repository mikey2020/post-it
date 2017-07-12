
import should from 'should';

import request from 'supertest';

import { User, Group, Post, UserGroups } from '../models/models';

import app from '../app';


const user = request.agent(app);

describe('Test api routes', () => {
  before((done) => {
    User.sync({ force: false }).then(() => {
      User.create({ userName: 'test-user', email: 'test-email@yahoo.com', password: 'pass', passwordConfirmation: 'pass' });
      // User.create({ userName: 'user3', email: 'test@yahoo.com', password: 'pass', passwordConfirmation: 'pass' });
      done();
    });
  });

  describe(' All routes should work after signing in', () => {
    it('should return "test-user signed in" ', (done) => {
      user.post('/api/user/signin')
      .send({ username: 'test-user', password: 'pass' })
      .end((err, res) => {
        res.status.should.equal(200);
        should.not.exist(err);
        res.body.should.have.property('user', res.body.user);
        res.body.user.message.should.equal('test-user signed in');
        done();
      });
    });

    it('should create `test-group successfully` ', (done) => {
      user.post('/api/group')
        .send({ name: 'test-group' })
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          // res.body.should.have.property('message', res.body.message);
          // res.body.message.should.equal('test-group successfully created');
          done();
        });
    });

    /*it('should return "user added to group" ', (done) => {
      user.post('/api/group/1/user')
        .send({ username: 'batman' })
        .end((err, res) => {
          console.log(res.body);
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('user added to group');
          done();
        });
    });*/

    it('should return "message posted to group" ', (done) => {
      user.post('/api/group/1/message')
        .send({ post: 'how is everybody doing?' })
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('message posted to group');
          done();
        });
    });

    it('should return all messages posted to group ', (done) => {
      user.get('/api/group/1/messages')
        .end((err, res) => {
          console.log(res.body);
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.should.have.property('posts', res.body.posts);
          res.body.posts.should.not.equal(null);
          done();
        });
    });

    it('should return group created by test-user', (done) => {
      user.get('/api/groups/test-user')
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          done();
        });
    });
  });

  describe('Routes should not work without signing in', () => {
    it('should return "please sign in" ', (done) => {
      request(app).post('/api/group')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('errors', res.body.errors);
          res.body.errors.message.should.equal('Please Sign in');
          done();
        });
    });

    it('should return "please sign in" ', (done) => {
      request(app).post('/api/group/1/user')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('errors', res.body.errors);
          res.body.errors.message.should.equal('Please Sign in');
          done();
        });
    });

    it('should return "please sign in" ', (done) => {
      request(app).post('/api/group/1/message')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('errors', res.body.errors);
          res.body.errors.message.should.equal('Please Sign in');
          done();
        });
    });

    it('should return "please sign in" ', (done) => {
      request(app).get('/api/group/1/messages')
        .end((err, res) => {
          res.status.should.equal(401);
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
        res.status.should.equal(500);
        res.body.should.have.property('errors', res.body.errors);
        // res.body.errors.form.should.equal('Invalid Signin Parameters');
        done();
      });
    });

    it('should return "username should be unique" when to use already registered username', (done) => {
      user.post('/api/user/signup')
      .send({ username: 'test-user', password: 'password', email: 'test@email.com', passwordConfirmation: 'password' })
      .end((err, res) => {
        res.status.should.equal(500);
        should.not.exist(err);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('userName must be unique');
        done();
      });
    });

    it('should return "email should be unique" when to use already registered email', (done) => {
      user.post('/api/user/signup')
      .send({ username: 'test', password: 'password', email: 'test-email@yahoo.com', passwordConfirmation: 'password' })
      .end((err, res) => {
        res.status.should.equal(500);
        should.not.exist(err);
        res.body.should.have.property('errors', res.body.errors);
        res.body.errors.message.should.equal('email must be unique');
        done();
      });
    });

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

  after((done) => {
    Group.destroy({
      where: {
        name: 'test-group'
      }
    });

    Post.destroy({
      where: {
        groupId: 1,
        post: 'how is everybody doing?'
      }
    });

    UserGroups.destroy({
      where: {
        username: 'user3'
      }
    });


    done();
  });
});
