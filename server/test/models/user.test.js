import should from 'should';
import models from '../../models';
import '../../app';

describe('User Model:', () => {
  it('should be created successfully', (done) => {
    models.User.create({ username: 'user', password: 'pass', passwordConfirmation: 'pass', phoneNumber: '09038489099', email: 'user@email.com' })
      .then((user) => {
        should.exist(user);
        should.exist(user.username);
      });
    done();
  });
});
