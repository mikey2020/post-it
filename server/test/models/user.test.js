import should from 'should';
import models from '../../models';
import '../../app';

describe('User Model:', () => {
  it('should be able to add a new user to the database', (done) => {
    models.User.create({ username: 'user',
      password: 'pass',
      passwordConfirmation: 'pass',
      phoneNumber: '09038489099',
      email: 'user@email.com' })
      .then((user) => {
        should.exist(user);
        should.exist(user.username);
        user.username.should.equal('user');
        user.phoneNumber.should.equal('09038489099');
        user.email.should.equal('user@email.com');
      });
    done();
  });
});
