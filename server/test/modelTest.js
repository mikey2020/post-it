import should from 'should';

import models from '../models';
import '../app';


describe('User Model:', () => {
  it('should be created successfully', (done) => {
    models.User.create({ username: 'user', password: 'pass', email: 'user@email.com' })
      .then((user) => {
        should.exist(user);
      });
    done();
  });
});


describe('Group Model:', () => {
  it('should be created successfully', (done) => {
    models.Group.create({ groupname: 'group', groupCreator: 'user', userId: 1 })
    .then((group) => {
      should.exist(group);
      done();
    });
  });
});

describe('Message Model:', () => {
  it('should be created successfully', (done) => {
    models.Message.create({ content: 'test-post', groupId: 1, userId: 1, priority: 'normal', messageCreator: 'johnny' })
    .then((post) => {
      should.exist(post);
      done();
    });
  });
});
