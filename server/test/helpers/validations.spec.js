import should from 'should';
import Validations from '../../middlewares/validations';

describe('Validations ', () => {
  describe('Sign up Input validation', () => {
    it('should return `Username is required` when no username is given', (done) => {
      const validate = new Validations();
      const mockData = { username: '', password: 'pass', email: 'email', phoneNumber: '' };
      const { errors } = validate.signup(mockData);
      errors.username.should.equal('Username is required');

      done();
    });

    it('should return `Password is required` when no password is given ', (done) => {
      const validate = new Validations();
      const mockData = { username: 'user', password: '', email: 'email', phoneNumber: '' };
      const { errors } = validate.signup(mockData);
      errors.password.should.equal('Password is required');

      done();
    });

    it('should return `Email is required` when no email is given', (done) => {
      const validate = new Validations();
      const mockData = { username: 'user', password: 'pass', email: '', phoneNumber: '' };
      const { errors } = validate.signup(mockData);
      errors.email.should.equal('Email is required');

      done();
    });

    it('should return `Password do not match` when no password is given', (done) => {
      const validate = new Validations();
      const mockData = { username: 'user',
        password: 'pass',
        email: 'email',
        passwordConfirmation: 'p',
        phoneNumber: '' };
      const { errors } = validate.signup(mockData);
      errors.passwordConfirmation.should.equal('Passwords do not match');

      done();
    });

    it('should return `is required for each field` when all parameters are null or empty', (done) => {
      const validate = new Validations();
      const mockData = { username: '',
        password: '',
        email: '',
        passwordConfirmation: '',
        phoneNumber: '' };
      const { errors } = validate.signup(mockData);
      errors.username.should.equal('Username is required');
      errors.email.should.equal('Email is required');
      errors.password.should.equal('Password is required');
      errors.passwordConfirmation.should.equal('Password Confirmation is required');

      done();
    });
  });
});

