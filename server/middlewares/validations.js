import validator from 'validator';

import isEmpty from 'lodash/isEmpty';

import models from '../models';

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
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - returns data to the next middleware
   * @returns {object} - errors object if there is any
   */
  checkUserIsValid(req, res, next) {
    models.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then((validUser) => {
      if (validUser === null) {
        return res.status(400).json({ errors: { message: 'user does not exist' } });
      }
      next();
    });
  }

  /**
   * @param {object} req - signup object
   * @param {object} res - errors object if there is any
   * @param {object} next - returns data to next middleware
   * @returns {object} -returns error if there is any
   */
  authenticate(req, res, next) {
    if (req.session.name) {
      next();
    } else {
      res.status(400).json({ errors: { message: 'Please Sign in' } });
    }
  }

  /**
   * @param {object} req - signup object
   * @param {object} res - errors object if there is any
   * @param {object} next - returns data to next middleware
   * @returns {object} -returns error if there is any
   */
  isGroupMember(req, res, next) {
    models.UserGroups.findOne({
      where: {
        userId: req.session.userId,
        groupId: req.params.groupId
      }
    }).then((user) => {
      if (user) {
        next();
      } else {
        res.status(400).json({ errors: { message: 'You are not a part of this group' } });
      }
    });
  }

  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - returns data to the next middleware
   * @returns {object} - errors object if there is any
   */
  checkGroupExists(req, res, next) {
    models.Group.findOne({
      where: {
        id: req.params.groupId
      }
    }).then((validGroup) => {
      if (validGroup === null) {
        return res.status(400).json({ errors: { message: 'group does not exist' } });
      }
      next();
    });
  }

}


export default Validations;

