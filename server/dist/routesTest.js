

const _should = require('should');

const _should2 = _interopRequireDefault(_should);

const _supertest = require('supertest');

const _supertest2 = _interopRequireDefault(_supertest);

const _models = require('../models/models');

const _app = require('../app');

const _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const user = _supertest2.default.agent(_app2.default);

describe('Test api routes', () => {
  before((done) => {
    _models.User.sync({ force: false }).then(() => {
      _models.User.create({ userName: 'test-user', email: 'test-email@yahoo.com', password: 'pass' });

      done();
    });
  });

  describe(' All routes should work', () => {
    it('should return "test-user is valid"', (done) => {
      user.post('/api/user/signin').send({ username: 'test-user', password: 'pass' }).end((err, res) => {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('user', res.body.user);

        done();
      });
    });

    it('should return "test-group  successfully created" ', (done) => {
      user.post('/api/group').send({ name: 'test-group' }).end((err, res) => {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('message', res.body.message);

        done();
      });
    });

    it('should return "user added to group" ', (done) => {
      user.post('/api/group/1/user').send({ username: 'user3' }).end((err, res) => {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('message', res.body.message);

        done();
      });
    });

    it('should return "message posted to group" ', (done) => {
      user.post('/api/group/1/message').send({ message: 'how is everybody doing?' }).end((err, res) => {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('message', res.body.message);

        done();
      });
    });

    it('should return messages posted to group ', (done) => {
      user.get('/api/group/1/messages'
						// .expect(200)
						).end((err, res) => {
  res.status.should.equal(200);
  _should2.default.not.exist(err);
								// res.body.error.should.be.a.object();
  res.body.should.have.property('posts', res.body.posts);

  done();
});
    });

    it('should return group created by test-user', (done) => {
      user.get('/api/groups/test-user').end((err, res) => {
        res.status.should.equal(200);
        _should2.default.not.exist(err);
								// res.body.error.should.be.a.object();
								// res.body.should.have.property('posts', res.body.posts);


        done();
      });
    });
  });

  describe('All routes should not work without login', () => {
    it('should not return "test-group  successfully created" ', (done) => {
      (0, _supertest2.default)(_app2.default).post('/api/group').send({ name: 'test-group' }).end((err, res) => {
        res.status.should.equal(401);
								// should.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('errors', res.body.errors);

        done();
      });
    });

    it('should not return "user added to group" ', (done) => {
      (0, _supertest2.default)(_app2.default).post('/api/group/1/user').send({ username: 'user3' }).end((err, res) => {
        res.status.should.equal(401);
								// should.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('errors', res.body.errors);

        done();
      });
    });

    it('should not return "message posted to group" ', (done) => {
      (0, _supertest2.default)(_app2.default).post('/api/group/1/message').send({ message: 'how is everybody doing?' }).end((err, res) => {
        res.status.should.equal(401);
								// should.exist(err);
								// res.body.error.should.be.a.object();
        res.body.should.have.property('errors', res.body.errors);

        done();
      });
    });

    it('should not return messages posted to group ', (done) => {
      (0, _supertest2.default)(_app2.default).get('/api/group/1/messages'
						// .expect(200)
						).end((err, res) => {
  res.status.should.equal(401);
								// should.exist(err);
								// res.body.error.should.be.a.object();
  res.body.should.have.property('errors', res.body.errors);

  done();
});
    });
  });

  after((done) => {
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
