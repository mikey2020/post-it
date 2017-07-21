import Bluebird from 'bluebird';

import should from 'should';

import request from 'supertest';

import app from '../../app';

import models from '../../models';

import { validUser } from '../../seeders/user-seeders';

const user = request.agent(app);

describe('user', () => {
  before(() => {
    models.sequelize.sync();
  });

  beforeEach(() => {
    return Bluebird.all([
      // models.Group.destroy({ truncate: true }),
      // models.User.destroy({ truncate: true })
    ]);
  });

  it('should be able to signin with correct parameters', (done) => {
    user.post('/api/user/signin')
      .send(validUser)
      .end((err, res) => {
        console.log(res.body);
        res.status.should.equal(200);
        should.not.exist(err);
        res.body.should.have.property('user', res.body.user);
        res.body.user.message.should.equal('john signed in');
        done();
      });
  });

  /* it('lists a user if there is one', (done) => {
    this.models.User.create({ username: 'johndoe' }).then(() => {
      request(app).get('/').expect(/johndoe/, done);
    });
  });

  it('lists the tickets for the user if available', function (done) {
    this.models.User.create({ username: 'johndoe' }).bind(this).then(function (user) {
      return this.models.Task.create({ title: 'johndoe task', UserId: user.id });
    }).then(function () {
      request(app).get('/').expect(/johndoe task/, done);
    });
  }); */
});
