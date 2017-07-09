/*import should from 'should';

import { User, Group, Post } from '../models/models';

import '../app';


describe('User Model Unit Tests:', () => {

  it('User should be created successfully', (done) => {
    User.sync({force: true}).then(()=> {
     User.create({userName: 'user' , password: 'pass' , email: 'user@email.com'});
     User.findOne({
       where: {
         userName: 'user'
       }
     }).then((user) => {
       should.exist(user);
       user.should.equal({userName: 'user' , password: 'pass' , email: 'user@email.com'});
     })
    });
    done();
  });

});

describe('Group Model Unit Tests:', () => {

  before((done) => {
    Group.sync({force: true}).then(() => {
    return Group.create({name: 'test-group' , creator: 'user' , userId: 1});
    })
    done();
  });

  it('Group should be created successfully', (done) => {
    Group.findOne({
      where: {
        name: 'test-group'
      }
    })
    .then((group) => {
      if(group){
        should.exist(group);
      }
    })
    done();
  });

  after((done) => {
    Group.destroy({
      where: {
        name: 'test-group'
      }
    })
    done();
  })
});

describe('Post Model Unit Tests:', () => {

  before((done) => {
    Post.sync({force: true}).then(() => {
    return Post.create({post: 'test-post' , groupId: 1 , groupName: 'test-group'});
    })
    done();
  });

  it('Post should be created successfully', (done) => {
    Post.findOne({
      where: {
        post: 'test-pos'
      }
    })
    .then((post) => {
      if(post){
        should.exist(post);
      }
    })
    done();
  });

  after((done) => {
    Post.destroy({
      where: {
        post: 'test-post'
      }
    })
    done();
  })
});
*/