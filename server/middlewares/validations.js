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

    if (data.username === null || data.username === '') {
      this.errors.username = 'Username is required';
    }

    if (data.email === null || data.email === '') {
      this.errors.email = 'Email is required';
    }

    if (!validator.isEmail(data.email)) {
      this.errors.email = 'Email is invalid';
    }

    if (data.password === null || data.password === '') {
      this.errors.password = 'Password is required';
    }

    if (data.passwordConfirmation === null || data.passwordConfirmation === '') {
      this.errors.passwordConfirmation = 'Password Confirmation is required';
    }

    if (!validator.equals(data.password, data.passwordConfirmation)) {
      this.errors.passwordConfirmation = 'Passwords do not match';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }
  /**
   * @param {object} data - signin object
   * @returns {object} - errors object if there is any
   */
  signin(data) {
    this.errors = {};

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
   * @param {object} data - user' group name
   * @returns {object} - errors object if there is any
   */
  createGroupInput(data) {
    this.errors = {};

    if (data.input === null || data.input === '') {
      this.errors.input = 'Group name is required';
    }
    const errors = this.errors;
    return {
      errors,

      isValid: isEmpty(errors)
    };
  }
  /**
   * @param {object} data - username of user you want to add to a group
   * @returns {object} - errors object if there is any
   */
  username(data) {
    this.errors = {};

    if (data.username === null || data.username === '') {
      this.errors.username = 'Username is required';
    }
    const errors = this.errors;
    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

}


export default Validations;


// export {validateInput,validateSignIn,validateCreateGroupInput,validateUsername};
