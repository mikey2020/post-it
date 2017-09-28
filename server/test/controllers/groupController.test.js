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

  it('should return success message when user signs in', (done) => {
    models.User.create(exampleUser).then(() => {
      user.post('/api/v1/user/signin')
          .send(exampleUser)
          .end((err, res) => {
            res.status.should.equal(200);
            should.not.exist(err);
            res.body.should.have.property('user', res.body.user);
            res.body.user.message.should.equal('naruto signed in');
            token = res.body.user.userToken;
            done();
          });
    });
  });

  it(`should return success message when trying to create a group
  and a valid group name is submitted`, (done) => {
    user.post('/api/v1/group')
            .set('authorization', token)
            .send({ name: 'test-group' })
            .end((err, res) => {
              res.status.should.equal(201);
              res.body.group.groupName.should.equal('test-group');
              should.not.exist(err);
              groupId = res.body.group.id;
              done();
            });
  });

  it(`should return success message
    when trying to add a user to a group`, (done) => {
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

  it(`should return success message
    when trying to post a message to a group`, (done) => {
    user.post(`/api/v1/group/${groupId}/message`)
        .set('authorization', token)
        .send({ message: 'This functions is working well', priority: 'normal' })
        .end((err, res) => {
          console.log(res.body);
          res.status.should.equal(201);
          should.not.exist(err);
          res.body.postedMessage.content
          .should.equal('This functions is working well');
          res.body.postedMessage.priority.should.equal('normal');
          res.body.postedMessage.messageCreator.should.equal('naruto');
          res.body.postedMessage
          .should.have.property('userId', res.body.postedMessage.userId);
          res.body.message
          .should.equal('message posted to group');
          done();
        });
  });

  it('should return all messages posted to a particular group ', (done) => {
    user.get(`/api/v1/group/${groupId}/messages`)
        .set('authorization', token)
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          should.exist(res.body.messages);
          res.body.should.have.property('messages', res.body.messages);
          done();
        });
  });
});
