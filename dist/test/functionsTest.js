'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _validations = require('../middlewares/validations.js');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test Input Validations Class', function () {
  describe('Sign Up Input validations', function () {
    it('should return `Username is required`', function (done) {
      var validate = new _validations2.default();
      var mockData = { username: '', password: 'pass', email: 'email' };

      var _validate$signup = validate.signup(mockData),
          errors = _validate$signup.errors,
          isValid = _validate$signup.isValid;

      errors.username.should.equal('Username is required');

      done();
    });

    it('should return `Password is required`', function (done) {
      var validate = new _validations2.default();
      var mockData = { username: 'user', password: '', email: 'email' };

      var _validate$signup2 = validate.signup(mockData),
          errors = _validate$signup2.errors,
          isValid = _validate$signup2.isValid;

      errors.password.should.equal('Password is required');

      done();
    });

    it('should return `Email is required`', function (done) {
      var validate = new _validations2.default();
      var mockData = { username: 'user', password: 'pass', email: '' };

      var _validate$signup3 = validate.signup(mockData),
          errors = _validate$signup3.errors,
          isValid = _validate$signup3.isValid;

      errors.email.should.equal('Email is invalid');

      done();
    });

    it('should return `Password do not match`', function (done) {
      var validate = new _validations2.default();
      var mockData = { username: 'user', password: 'pass', email: 'email', passwordConfirmation: 'p' };

      var _validate$signup4 = validate.signup(mockData),
          errors = _validate$signup4.errors,
          isValid = _validate$signup4.isValid;

      errors.passwordConfirmation.should.equal('Passwords do not match');

      done();
    });

    it('should return `is required for each field`', function (done) {
      var validate = new _validations2.default();
      var mockData = { username: '', password: '', email: '', passwordConfirmation: '' };

      var _validate$signup5 = validate.signup(mockData),
          errors = _validate$signup5.errors,
          isValid = _validate$signup5.isValid;

      errors.username.should.equal('Username is required');
      errors.email.should.equal('Email is invalid');
      errors.password.should.equal('Password is required');
      errors.passwordConfirmation.should.equal('Password Confirmation is required');

      done();
    });
  });
});