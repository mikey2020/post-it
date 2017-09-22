import should from 'should';
import Validations from '../../validations';

describe('Test Input Validations Class', () => {
  describe('Sign Up Input validations', () => {
    it(`should return 'Username is required' 
    when there is no username provided`, (done) => {
      const validate = new Validations();
      const mockData = { username: '',
        password: 'pass',
        email: 'email',
        phoneNumber: '' };
      const { errors } = validate.signUp(mockData);
      errors.username.should.equal('Username is required');

      done();
    });

    it(`should return 'Password is required' 
    when there is no password provided`, (done) => {
      const validate = new Validations();
      const mockData = { username: 'user',
        password: '',
        email: 'email',
        phoneNumber: '' };
      const { errors } = validate.signUp(mockData);
      errors.password.should.equal('Password is required');

      done();
    });

    it(`should return 'Email is required' 
      when there is no email provided`, (done) => {
      const validate = new Validations();
      const mockData = { username: 'user',
        password: 'pass',
        email: '',
        phoneNumber: '' };
      const { errors } = validate.signUp(mockData);
      errors.email.should.equal('Email is required');

      done();
    });

    it(`should return 'Password do not match' 
      when password and password confirmation are not the same`, (done) => {
      const validate = new Validations();
      const mockData = { username: 'user',
        password: 'pass',
        email: 'email',
        passwordConfirmation: 'p',
        phoneNumber: '' };
      const { errors } = validate.signUp(mockData);
      errors.passwordConfirmation.should.equal('Passwords do not match');

      done();
    });

    it('should return `error message` when all required input are not provided',
    (done) => {
      const validate = new Validations();
      const mockData = { username: '',
        password: '',
        email: '',
        passwordConfirmation: '',
        phoneNumber: '' };
      const { errors } = validate.signUp(mockData);
      errors.username.should.equal('Username is required');
      errors.email.should.equal('Email is required');
      errors.password.should.equal('Password is required');
      errors.passwordConfirmation.should.equal(
        'Password Confirmation is required');

      done();
    });

    it('should return `username should not contain space` when username contins space',
    (done) => {
      const validate = new Validations();
      const mockData = { username: 'sasuke uchiha',
        password: 'uchiha',
        email: 'sasuke@uchiha.com',
        passwordConfirmation: 'uchiha',
        phoneNumber: '09029385838' };
      const { errors } = validate.signUp(mockData);
      errors.username.should.equal('Username should not contain space');
      done();
    });
  });

  describe('Sign In Input validations', () => {
    it('should return `Username is required` when username is not provided',
     (done) => {
       const validate = new Validations();
       const mockData = { username: '', password: 'pass' };
       const { errors } = validate.signIn(mockData);
       errors.username.should.equal('Username is required');

       done();
     });

    it('should return `Password is required` when password is not provided',
    (done) => {
      const validate = new Validations();
      const mockData = { username: 'user', password: '' };
      const { errors } = validate.signIn(mockData);
      errors.password.should.equal('Password is required');

      done();
    });
  });

  describe('Input validations', () => {
    it('should return `This field is required` when input is not provided', 
    (done) => {
      const validate = new Validations();
      const mockData = { input: '' };
      const { errors } = validate.input(mockData);
      errors.input.should.equal('This field is required');

      done();
    });

    it('should return `Message is required` when message is not provided', (done) => {
      const validate = new Validations();
      const mockData = { message: '' };
      const { errors } = validate.input(mockData);
      errors.message.should.equal('Message is required');

      done();
    });
  });

  describe('New password validations', () => {
    it(`should return 'please enter verification code' 
    when no verification code is provided `, (done) => {
      const validate = new Validations();
      const mockData = { code: '' };
      const { errors } = validate.newPasswordInputs(mockData);
      errors.code.should.equal('Please enter verification code');

      done();
    });

    it(`should return 'New Password is required' 
    when no new password is provided`, (done) => {
      const validate = new Validations();
      const mockData = { newPassword: '' };
      const { errors } = validate.newPasswordInputs(mockData);
      errors.newPassword.should.equal('New Password is required');

      done();
    });

    it(`should return 'Password Confirmation is required' 
    when no new password confirmation is provided`, (done) => {
      const validate = new Validations();
      const mockData = { newPasswordConfirmation: '', newPassword: 'data' };
      const { errors } = validate.newPasswordInputs(mockData);
      errors.newPasswordConfirmation.should.equal('Passwords do not match');

      done();
    });
  });
});

