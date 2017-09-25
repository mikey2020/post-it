import should from 'should';
import models from '../../models';
import '../../app';


describe('Group Model:', () => {
  it('should be able add a new group to the database', (done) => {
    models.Group.create({ groupName: 'group', groupCreator: 'user', userId: 1 })
    .then((group) => {
      should.exist(group);
      should.exist(group.id);
      group.groupName.should.equal('group');
      group.groupCreator.should.equal('user');
      done();
    });
  });
});
