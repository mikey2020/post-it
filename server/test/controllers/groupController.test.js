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

  it('return "naruto signed in" when user signs in', (done) => {
    models.User.create(exampleUser).then(() => {
      user.post('/api/v1/user/signin')
          .send(exampleUser)
          .end((err, res) => {
            res.status.should.equal(200);
            should.not.exist(err);
            res.body.should.have.property('user', res.body.user);
            res.body.user.name.should.equal(exampleUser.username);
            res.body.user.message.should.equal('naruto signed in');
            token = res.body.user.userToken;
            done();
          });
    });
  });

  it('should create "test-group successfully" ', (done) => {
    user.post('/api/v1/group')
            .set('authorization', token)
            .send({ name: 'test-group' })
            .end((err, res) => {
              res.status.should.equal(201);
              res.body.group.data.groupName.should.equal('test-group');
              should.not.exist(err);
              groupId = res.body.group.data.id;
              done();
            });
  });

  it('should return "user added to group" ', (done) => {
    models.User.create({ username: 'bat', phoneNumber: '08123457690', email: 'batman@email.com', password: 'pass', passwordConfirmation: 'pass' }).then((newUser) => {
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

  it('should return "message posted to group" ', (done) => {
    user.post(`/api/v1/group/${groupId}/message`)
        .set('authorization', token)
        .send({ message: 'This functions is working well', priority: 'normal' })
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          res.body.data.content.should.equal('This functions is working well');
          res.body.data.priority.should.equal('normal');
          res.body.data.messageCreator.should.equal('naruto');
          res.body.should.have.property('message', res.body.message);
          res.body.message.should.equal('message posted to group');
          done();
        });
  });

  it('should return groups created by test-user', (done) => {
    user.get('/api/v1/groups/user')
        .set('authorization', token)
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          done();
        });
  });

  it('should return all messages posted to a particular group ', (done) => {
    user.get(`/api/v1/group/${groupId}/messages`)
        .set('authorization', token)
        .end((err, res) => {
          res.status.should.equal(200);
          should.not.exist(err);
          should.exist(res.body.posts);
          done();
        });
  });
});
