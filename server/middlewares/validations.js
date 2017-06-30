import validator from 'validator';

import isEmpty from 'lodash/isEmpty';


class Validations {

  signup(data) {
    const errors = {};

    if (data.username === null || data.username === '') {
      errors.username = 'Username is required';
    }

    if (data.email === null || data.email === '') {
      errors.email = 'Email is required';
    }

    if(data.email !== null || data.email !== '' && !validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (data.password === null || data.password === '') {
      errors.password = 'Password is required';
    }

    if (data.passwordConfirmation === null || data.passwordConfirmation === '') {
      errors.passwordConfirmation = 'Password Confirmation is required';
    }

    if (!validator.equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords do not match';
    }

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  signin(data) {
    const errors = {};

    if (data.username === null || data.username === '') {
      errors.username = 'Username is required';
    }

    if (data.password === null || data.password === '') {
      errors.password = 'Password is required';
    }

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  createGroupInput(data) {
    const errors = {};

    if (data.input === null || data.input === '') {
      errors.input = 'Group name is required';
    }

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  username(data) {
    const errors = {};

    if (data.username === null || data.username === '') {
      errors.username = 'username is required';
    }

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

}


export default Validations;


// export {validateInput,validateSignIn,validateCreateGroupInput,validateUsername};
