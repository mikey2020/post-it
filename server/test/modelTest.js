import should from 'should';

import { User, Group, Post } from '../models/models';

import '../app';


describe('User Model Unit Tests:', () => {
  it('User should be created successfully', (done) => {
    User.sync({ force: true }).then(() => {
      User.create({ userName: 'user', password: 'pass', email: 'user@email.com' })
      .then((user) => {
        should.exist(user);
      });
      done();
    });
  });
});

describe('Group Model Unit Tests:', () => {
  it('Group should be created successfully', (done) => {
    Group.create({ name: 'test-group', creator: 'user', userId: '1' })
    .then((group) => {
      should.exist(group);
      done();
    });
  });
});

describe('Post Model Unit Tests:', () => {
  it('Post should be created successfully', (done) => {
    Post.sync({ force: true }).then(() => {
      Post.create({ post: 'test-post', groupId: 1, groupName: 'test-group' })
    .then((post) => {
      should.exist(post);
      done();
    });
    });
  });
});

