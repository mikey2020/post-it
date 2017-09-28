import should from 'should';
import models from '../../models';
import '../../app';

describe('Message Model:', () => {
  it('should able to add a new message to the database', (done) => {
    models.Message.create({ content: 'test-post',
      groupId: 1,
      userId: 1,
      priority: 'normal',
      messageCreator: 'johnny' })
    .then((post) => {
      should.exist(post);
      should.exist(post.content);
      post.content.should.equal('test-post');
      post.priority.should.equal('normal');
      post.messageCreator.should.equal('johnny');
      done();
    });
  });
});
