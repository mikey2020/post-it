import should from 'should';
import models from '../../models';
import '../../app';


describe('UserGroup Model:', () => {
  it('should be created successfully', (done) => {
    models.UserGroups.create({ userId: 1, groupId: 3 })
    .then((usergroup) => {
      should.exist(usergroup);
      should.exist(usergroup.userId);
      should.exist(usergroup.groupId);
      done();
    });
  });
});
