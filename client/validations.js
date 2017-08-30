/* eslint-disable import/no-extraneous-dependencies */
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 *  All Validations
 * @class
 */
class Validations {

  /**
   * @param {object} user - signup object
   * @returns {object} - errors object if there is any
   */
  signup(user) {
    this.errors = {};

    if (user.password) {
      user.password = user.password.trim();
    }
    if (!user.email || !user.password || !user.username) {
      this.errors.invalid = 'Invalid paramters';
    }

    if (user.username === null || user.username === '') {
      this.errors.username = 'Username is required';
    }

    if (user.email === null || user.email === '') {
      this.errors.email = 'Email is required';
    }

    if (user.phoneNumber === null || user.phoneNumber === '') {
      this.errors.phoneNumber = 'Phone Number is required';
    }

    if (user.email && !validator.isEmail(user.email)) {
      this.errors.email = 'Email is invalid';
    }

    if (user.password === null || user.password === '') {
      this.errors.password = 'Password is required';
    }
    if (user.password && user.password.length <= 4) {
      this.errors.password = 'Password length too short';
    }
    if (user.passwordConfirmation === null || user.passwordConfirmation === '') {
      this.errors.passwordConfirmation = 'Password Confirmation is required';
    }

    if (user.password && !validator.equals(user.password, user.passwordConfirmation)) {
      this.errors.passwordConfirmation = 'Passwords do not match';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  /**
   * @param {object} user - signup object
   * @returns {object} - errors object if there is any
   */
  signin(user) {
    this.errors = {};

    if (user.password) {
      user.password = user.password.trim();
    }
    if (user.username === null || user.username === '') {
      this.errors.username = 'Username is required';
    }

    if (user.password === null || user.password === '') {
      this.errors.password = 'Password is required';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }
  /**
   * @param {object} user - signup object
   * @returns {object} - errors object if there is any
   */
  input(user) {
    this.errors = {};

    if (user.input === null || user.input === '') {
      this.errors.input = 'This field is required';
    }

    if (user.message === null || user.message === '') {
      this.errors.message = 'Message is required';
    }

    if (user.priority === null || user.priority === '') {
      this.errors.priority = 'Priority Level is required';
    }
    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  /**
   * @param {object} user - signup object
   * @returns {object} - errors object if there is any
   */
  groupInput(user) {
    this.errors = {};

    if (user.name === null || user.name === '') {
      this.errors.input = 'This field is required';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  /**
   * @param {object} user - signup object
   * @returns {object} - errors object if there is any
   */
  newPasswordInputs(user) {
    this.errors = {};
    if (user.code === null || user.code === '') {
      this.errors.code = 'Please enter verification code';
    }
    if (user.newPassword === null || user.newPassword === '') {
      this.errors.newPassword = 'New Password is required';
    }
    if (user.newPasswordConfirmation === null || user.newPasswordConfirmation === '') {
      this.errors.newPasswordConfirmation = 'Password Confirmation is required';
    }
    if (user.newPasswordConfirmation !== user.newPassword) {
      this.errors.newPasswordConfirmation = 'Passwords do not match';
    }
    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }
}


export default Validations;

