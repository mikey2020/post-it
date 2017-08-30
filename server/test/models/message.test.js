import should from 'should';
import models from '../../models';
import '../../app';

describe('Message Model:', () => {
  it('should be created successfully', (done) => {
    models.Message.create({ content: 'test-post', groupId: 1, userId: 1, priority: 'normal', messageCreator: 'johnny' })
    .then((post) => {
      should.exist(post);
      done();
    });
  });
});
