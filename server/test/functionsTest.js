import assert from 'assert';

import should from 'should';

import Validations from '../middlewares/validations.js';

describe('Test Validations Class', () => {
  describe('Sign Up validations', () => {
    it('should return `Username is required`', (done) => {
    	const validate = new Validations();
	    const mockData = { username: '', password: 'pass', email: 'email' };
	    const { errors, isValid } = validate.signup(mockData);
      errors.username.should.equal('Username is required');

      done();
    });

    it('should return `Password is required`', (done) => {
    	const validate = new Validations();
	    const mockData = { username: 'user', password: '', email: 'email' };
	    const { errors, isValid } = validate.signup(mockData);
      errors.password.should.equal('Password is required');

      done();
    });

    it('should return `Email is required`', (done) => {
    	const validate = new Validations();
	    const mockData = { username: 'user', password: 'pass', email: '' };
	    const { errors, isValid } = validate.signup(mockData);
      errors.email.should.equal('Email is invalid');

      done();
    });
  });
});

