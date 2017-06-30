
import should from 'should';

import request from 'supertest';

import { User, Group, Post, UserGroups } from '../models/models';

import app from '../app';


const user = request.agent(app);

describe('Test api routes', () => {
  before((done) => {
    User.sync({ force: false }).then(() => {
      User.create({ userName: 'test-user', email: 'test-email@yahoo.com', password: 'pass' });

      done();
    });
  });

  describe(' All routes should work', () => {
    it('should return "test-user is valid"', (done) => {
      user.post('/api/user/signin')
			.send({ username: 'test-user', password: 'pass' })
			.end((err, res) => {
  res.status.should.equal(200);
  should.not.exist(err);
  res.body.should.have.property('user', res.body.user);
  done();
});
    });

    it('should return "test-group  successfully created" ', (done) => {
      user.post('/api/group')
				.send({ name: 'test-group' })
				.end((err, res) => {
  res.status.should.equal(200);
  should.not.exist(err);
  res.body.should.have.property('message', res.body.message);
  done();
});
    });

    it('should return "user added to group" ', (done) => {
      user.post('/api/group/1/user')
				.send({ username: 'user3' })
				.end((err, res) => {
  res.status.should.equal(200);
  should.not.exist(err);
  res.body.should.have.property('message', res.body.message);
  done();
});
    });

    it('should return "message posted to group" ', (done) => {
      user.post('/api/group/1/message')
				.send({ message: 'how is everybody doing?' })
				.end((err, res) => {
  res.status.should.equal(200);
  should.not.exist(err);
  res.body.should.have.property('message', res.body.message);
  done();
});
    });

    it('should return messages posted to group ', (done) => {
      user.get('/api/group/1/messages')
		  	.end((err, res) => {
    res.status.should.equal(200);
    should.not.exist(err);
    res.body.should.have.property('posts', res.body.posts);
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

  describe('All routes should not work without login', () => {
    it('should not return "test-group  successfully created" ', (done) => {
      request(app).post('/api/group')
				.end((err, res) => {
  res.status.should.equal(401);
  res.body.should.have.property('errors', res.body.errors);
  done();
});
    });

    it('should not return "user added to group" ', (done) => {
      request(app).post('/api/group/1/user')
				.end((err, res) => {
  res.status.should.equal(401);
  res.body.should.have.property('errors', res.body.errors);
  done();
});
    });

    it('should not return "message posted to group" ', (done) => {
      request(app).post('/api/group/1/message')
				.end((err, res) => {
  res.status.should.equal(401);
  res.body.should.have.property('errors', res.body.errors);
  done();
});
    });

    it('should not return messages posted to group ', (done) => {
      request(app).get('/api/group/1/messages')
				.end((err, res) => {
  res.status.should.equal(401);
  res.body.should.have.property('errors', res.body.errors);
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

    User.destroy({
      where: {
        userName: 'test-user'
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
