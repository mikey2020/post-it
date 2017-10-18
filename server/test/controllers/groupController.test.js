import should from 'should';
import request from 'supertest';

import app from '../../app';
import models from '../../models';

const user = request.agent(app);
let token;
let groupId;

const exampleUser = {
  username: 'naruto',
  email: 'naruto@konoha.com',
  password: 'hinata',
  passwordConfirmation: 'hinata',
  phoneNumber: '0902345957'
};

describe('GroupController', () => {
  before((done) => {
    models.sequelize.sync();
    done();
  });

  it('should return a token when a user signs in', (done) => {
    models.User.create(exampleUser).then(() => {
      user.post('/api/v1/user/signin')
          .send(exampleUser)
          .end((err, res) => {
            res.status.should.equal(200);
            should.not.exist(err);
            res.body.should.have.property('message', res.body.message);
            res.body.should.have.property('userToken', res.body.userToken);
            res.body.message.should.equal('naruto signed in');
            token = res.body.userToken;
            done();
          });
    });
  });

  it('should create a group when a valid group name is submitted',
  (done) => {
    user.post('/api/v1/group')
            .set('authorization', token)
            .send({ name: 'test-group' })
            .end((err, res) => {
              res.status.should.equal(201);
              res.body.group.groupName.should.equal('test-group');
              res.body.message.should.equal('test-group created successfully');
              should.not.exist(err);
              groupId = res.body.group.id;
              done();
            });
  });

  it('should return a success message when a user has been added to a group',
  (done) => {
    models.User.create({ username: 'bat',
      phoneNumber: '08123457690',
      email: 'batman@email.com',
      password: 'pass',
      passwordConfirmation: 'pass'
    }).then((newUser) => {
      user.post('/api/v1/group/1/user')
        .set('authorization', token)
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

  it('should return a message object and a success message when message has been posted to a group',
  (done) => {
    user.post(`/api/v1/group/${groupId}/message`)
        .set('authorization', token)
        .send({ message: 'These functions are working well', priority: 'normal' })
        .end((err, res) => {
          res.status.should.equal(201);
          should.not.exist(err);
          res.body.postedMessage.content
          .should.equal('These functions are working well');
          res.body.postedMessage.priority.should.equal('normal');
          res.body.postedMessage.messageCreator.should.equal('naruto');
          res.body.postedMessage
          .should.have.property('userId', res.body.postedMessage.userId);
          res.body.message
          .should.equal('message posted to group');
          done();
        });
  });

  it('should return all messages posted to a particular group', (done) => {
    user.get(`/api/v1/group/${groupId}/messages`)
        .set('authorization', token)
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          should.exist(res.body.messages);
          res.body.should.have.property('messages', res.body.messages);
          res.body.messages[0].content.should.be.eql(
            'These functions are working well');
          res.body.messages[0].id.should.be.eql(1);
          res.body.messages[0].priority.should.be.eql('normal');
          res.body.messages[0].messageCreator.should.be.eql('naruto');
          res.body.messages[0].groupId.should.be.eql(1);
          res.body.messages[0].userId.should.be.eql(1);
          done();
        });
  });
});
