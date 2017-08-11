import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 *  All Validations
 * @class
 */
class Validations {

  /**
   * @param {object} data - signup object
   * @returns {object} - errors object if there is any
   */
  signup(data) {
    this.errors = {};

    if (data.password) {
      data.password = data.password.trim();
    }
    if (!data.email || !data.password || !data.username) {
      this.errors.invalid = 'Invalid paramters';
    }

    if (data.username === null || data.username === '') {
      this.errors.username = 'Username is required';
    }

    if (data.email === null || data.email === '') {
      this.errors.email = 'Email is required';
    }

    if (data.phoneNumber === null || data.phoneNumber === '') {
      this.errors.phoneNumber = 'Phone Number is required';
    }

    if (data.email && !validator.isEmail(data.email)) {
      this.errors.email = 'Email is invalid';
    }

    if (data.password === null || data.password === '') {
      this.errors.password = 'Password is required';
    }
    if (data.password && data.password.length <= 4) {
      this.errors.password = 'Password length too short';
    }
    if (data.passwordConfirmation === null || data.passwordConfirmation === '') {
      this.errors.passwordConfirmation = 'Password Confirmation is required';
    }

    if (data.password && !validator.equals(data.password, data.passwordConfirmation)) {
      this.errors.passwordConfirmation = 'Passwords do not match';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }
  
  /**
   * @param {object} data - signup object
   * @returns {object} - errors object if there is any
   */
  signin(data) {
    this.errors = {};

    if (data.password) {
      data.password = data.password.trim();
    }
    if (data.username === null || data.username === '') {
      this.errors.username = 'Username is required';
    }

    if (data.password === null || data.password === '') {
      this.errors.password = 'Password is required';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }
  /**
   * @param {object} data - signup object
   * @returns {object} - errors object if there is any
   */
  input(data) {
    this.errors = {};

    if (data.input === null || data.input === '') {
      this.errors.input = 'This field is required';
    }

    if (data.message === null || data.message === '') {
      this.errors.input = 'Message is required';
    }

    if (data.priority === null || data.priority === '') {
      this.errors.priority = 'Priority Level is required';
    }
    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

}


export default Validations;

