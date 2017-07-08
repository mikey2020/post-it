import validator from 'validator';

import isEmpty from 'lodash/isEmpty';

import { User } from '../models/models';

/**
 *  All Validations
 * @class
 */
class Validations {

  /**
   * @constructor
   */
  constructor() {
    this.userValid = '';
  }
  /**
   * @param {object} value - username for validation
   * @returns {void} - it returns whether a user already exists
   */
  checkUserIsValid(value) {
    User.findAll({
      where: {
        email: value
      }
    }).then((user) => {
      console.log(user);
      if (user === null || user === undefined) {
        this.userValid = true;
      } else {
        this.userValid = false;
      }
      // this.userValid = false;
    });
  }
  /**
   * @param {object} data - signup object
   * @returns {object} - errors object if there is any
   */
  signup(data) {
    // console.log(this.userValid);
    //this.userValid = true;
    this.errors = {};
    this.checkUserIsValid(data.email);

    if (!data.email || !data.password || !data.username) {
      this.errors.invalid = 'Invalid paramters';
    }

    if (data.username === null || data.username === '') {
      this.errors.username = 'Username is required';
    }

    if (data.email === null || data.email === '') {
      this.errors.email = 'Email is required';
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

    if (this.userValid === false) {
      this.errors.invalid = 'User already exists';
    }

    console.log(this.userValid);

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

}


export default Validations;


// export {validateInput,validateSignIn,validateCreateGroupInput,validateUsername};
