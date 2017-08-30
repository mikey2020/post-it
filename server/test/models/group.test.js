import should from 'should';
import models from '../../models';
import '../../app';


describe('Group Model:', () => {
  it('should be created successfully', (done) => {
    models.Group.create({ groupName: 'group', groupCreator: 'user', userId: 1 })
    .then((group) => {
      should.exist(group);
      done();
    });
  });
});
