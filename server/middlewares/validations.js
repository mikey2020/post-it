/* eslint-disable import/no-extraneous-dependencies */
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();
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

    if (user.phoneNumber !== undefined) {
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
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @param {object} user - signup object
   * @returns {object} - errors object if there is any
   */
  static checkUserIsValid(req, res, next) {
    models.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then((validUser) => {
      if (validUser === null) {
        return res.status(400).json({ errors: { message: 'user does not exist' } });
      }
      req.validUsername = validUser.username;
      req.validUserId = validUser.id;
      next();
    });
  }

  /**
   * @param {object} req - signup object
   * @param {object} res - errors object if there is any
   * @param {object} next - returns user to next middleware
   * @returns {object} -returns error if there is any
   */
  static authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader || null;
    // if (authorizationHeader) {
    //   token = authorizationHeader;
    // }
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(400).send({
        success: false,
        message: 'No token provided'
      });
    }
  }
  /**
   * @param {object} req - signup object
   * @param {object} res - errors object if there is any
   * @param {object} next - returns user to next middleware
   * @returns {object} -returns error if there is any
   */
  static isGroupMember(req, res, next) {
    models.UserGroups.findOne({
      where: {
        userId: req.decoded.data.id,
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
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - response object
   * @returns {void}
   */
  static checkGroupExists(req, res, next) {
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

  /**
   * @param  {userInput} str
   * @description checks if the string pass in is a digit. Means all the charcters are digit
   * @return {boolean} true or false
   */
  static isPhoneNumber (userInput) {
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

