/* eslint-disable import/no-extraneous-dependencies */
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import models from '../models';
import handleInvalidNumber from '../helpers/handleInvalidNumber';

dotenv.config();
/**
 *  All Validations
 * @class
 */
class Validations {

  /**
   * @description - validates a user's signUp object
   *
   * @param {Object} user - sign up object
   *
   * @returns {Object} - errors object if there is any
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

    if (user.phoneNumber === null || user.phoneNumber === '') {
      this.errors.phoneNumber = 'Phone Number is required';
    }

    if (user.phoneNumber !== undefined || user.phoneNumber !== '') {
      if (user.phoneNumber.length > 11 || user.phoneNumber < 11) {
        this.errors.phoneNumber = 'Please enter a valid phone number';
      }

      if (Validations.isPhoneNumber(user.phoneNumber) !== true) {
        this.errors.phoneNumber = 'Please enter a valid phone number';
      }
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
   * @description - validates message input
   *
   * @param {String} postedMessage
   *
   * @returns {Object} - errors object if there is any
   */
  message(postedMessage) {
    this.errors = {};
    if (postedMessage.message === undefined || postedMessage.message === '') {
      this.errors.message = 'message is required';
    }
    if (postedMessage.priority === undefined || postedMessage.priority === '') {
      this.errors.priority = 'message priority is required';
    }

    const errors = this.errors;

    return {
      errors,

      isValid: isEmpty(errors)
    };
  }

  /**
   * @description - checks if a user is valid
   *
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @param {Object} user - signup object
   *
   * @returns {Object} - errors object if there is any
   */
  static checkUserIsValid(request, response, next) {
    const { username, userId } = request.body;
    if (username === undefined && userId === undefined) {
      return response.status(400).json(
        { message: 'username or userId is required' });
    }
    models.User.findOne({
      where: {
        $or: [
            { id: userId },
          { username: {
            $iLike: username
          } }
        ]
      }
    }).then((validUser) => {
      if (validUser === null) {
        return response.status(400).json({ errors:
          { message: 'user does not exist' } });
      }
      request.validUsername = validUser.username;
      request.validUserId = validUser.id;
      next();
    });
  }

  /**
   * @description - It verifies a user by accessing the user's token
   *
   * @param {Object} request - signup object
   * @param {Object} response - errors object if there is any
   * @param {Function} next - returns user to next middleware
   *
   * @returns {Object} -returns error if there is any
   */
  static authenticate(request, response, next) {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader || null;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return response.status(401).json(
            { success: false, message: 'Failed to authenticate token.' });
        }
        request.decoded = decoded;
        next();
      });
    } else {
      return response.status(401).send({
        success: false,
        message: 'No token provided'
      });
    }
  }
  /**
   * @description - It checks if a user is a member of a group
   *
   * @param {Object} request - signup object
   * @param {Object} response - errors object if there is any
   * @param {Function} next - returns user to next middleware
   *
   * @returns {Object} -returns error if there is any
   */
  static isGroupMember(request, response, next) {
    models.UserGroups.findOne({
      where: {
        userId: request.decoded.data.id,
        groupId: request.params.groupId
      }
    }).then((user) => {
      if (user) {
        next();
      } else {
        response.status(403).json({ errors:
          { message: 'You are not a part of this group' } });
      }
    });
  }

  /**
   * @description - It checks if a group exists
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Function} next - response object
   *
   * @returns {void}
   */
  static checkGroupExists(request, response, next) {
    const groupId = request.params.groupId;
    if (groupId !== undefined) {
      handleInvalidNumber(groupId, response);
    }
    models.Group.findOne({
      where: {
        $or: [
          { groupName: {
            $iLike: request.body.name
          } },
          { id: request.params.groupId }
        ]
      }
    }).then((validGroup) => {
      if (validGroup === null) {
        request.existingGroup = false;
      } else {
        request.existingGroup = true;
      }
      next();
    });
  }

  /**
   * @param  {String} userInput
   *
   * @description checks if the string passed in is a digit.
   * which means all the charcters are digit
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

