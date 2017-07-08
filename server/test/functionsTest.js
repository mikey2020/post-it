import should from 'should';

import Validations from '../middlewares/validations';

describe('Test Input Validations Class', () => {
  describe('Sign Up Input validations', () => {
    it('should return `Username is required`', (done) => {
      const validate = new Validations();
      const mockData = { username: '', password: 'pass', email: 'email' };
      const { errors } = validate.signup(mockData);
      errors.username.should.equal('Username is required');

      done();
    });

    it('should return `Password is required`', (done) => {
      const validate = new Validations();
      const mockData = { username: 'user', password: '', email: 'email' };
      const { errors } = validate.signup(mockData);
      errors.password.should.equal('Password is required');

      done();
    });

    it('should return `Email is required`', (done) => {
      const validate = new Validations();
      const mockData = { username: 'user', password: 'pass', email: '' };
      const { errors } = validate.signup(mockData);
      errors.email.should.equal('Email is required');

      done();
    });

    it('should return `Password do not match`', (done) => {
      const validate = new Validations();
      const mockData = { username: 'user', password: 'pass', email: 'email', passwordConfirmation: 'p' };
      const { errors } = validate.signup(mockData);
      errors.passwordConfirmation.should.equal('Passwords do not match');

      done();
    });

    it('should return `is required for each field`', (done) => {
      const validate = new Validations();
      const mockData = { username: '', password: '', email: '', passwordConfirmation: '' };
      const { errors } = validate.signup(mockData);
      errors.username.should.equal('Username is required');
      errors.email.should.equal('Email is required');
      errors.password.should.equal('Password is required');
      errors.passwordConfirmation.should.equal('Password Confirmation is required');

      done();
    });
  });
});

