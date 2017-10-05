/* eslint-disable import/no-extraneous-dependencies */
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * All Validations
 * @class
 */
class Validations {
  /**
   * @param {object} user - signup object
   *
   * @returns {object} - errors object if there is any
   */
  signUp(user) {
    this.errors = {};
    const space = new RegExp(' ');
    const usernameContainsSpace = space.test(user.username);

    if (user.password) {
      user.password = user.password.trim();
    }
    if (!user.email || !user.password || !user.username) {
      this.errors.invalid = 'Invalid paramters';
    }

    if (user.username === null || user.username === '') {
      this.errors.username = 'Username is required';
    }

    if (usernameContainsSpace === true) {
      this.errors.username = 'Username should not contain space';
    }

    if (user.email === null || user.email === '') {
      this.errors.email = 'Email is required';
    }

    if (user.phoneNumber !== null || user.phoneNumber !== '') {
      if (user.phoneNumber.length > 11 || user.phoneNumber < 11) {
        this.errors.phoneNumber = 'Please enter a valid phone number';
      }

      if (Validations.isPhoneNumber(user.phoneNumber) !== true) {
        this.errors.phoneNumber = 'Please enter a valid phone number';
      }
    } else {
      this.errors.phoneNumber = 'Phone number is required';
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
    if (user.passwordConfirmation === null ||
    user.passwordConfirmation === '') {
      this.errors.passwordConfirmation = 'Password Confirmation is required';
    }

    if (user.password &&
    !validator.equals(user.password, user.passwordConfirmation)) {
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
   *
   * @returns {object} - errors object if there is any
   */
  signIn(user) {
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
   *
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
   * @param {object} group - group object
   *
   * @returns {object} - errors object if there is any
   */
  groupInput(group) {
    this.errors = {};

    if (group.name.trim() === null || group.name.trim() === '') {
      this.errors.name = 'This field is required';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  /**
   * @param {object} user - signup object
   *
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
    if (user.newPasswordConfirmation === null
    || user.newPasswordConfirmation === '') {
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

  /**
   * @param  {String} userInput
   *
   * @description checks if the string pass in is a digit.
   * Means all the charcters are digit
   *
   * @return {boolean} true or false
   */
  static isPhoneNumber(userInput) {
    if (userInput.length === 0) {
      return false;
    }
    for (let i = 0; i < userInput.length; i += 1) {
      if (/[0-9]/.test(userInput[i]) === false) {
        return false;
      }
    }
    return true;
  }
}


export default Validations;

