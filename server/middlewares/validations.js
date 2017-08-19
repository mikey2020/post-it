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
   * @param {object} data - signup object
   * @returns {object} - errors object if there is any
   */
  signup(data) {
    this.errors = {};
    console.log('th is my data', data.username.length);
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

    if (data.phoneNumber !== undefined) {
      if (data.phoneNumber.length > 11 || data.phoneNumber < 11) {
        this.errors.phoneNumber = 'Please enter a valid phone number';
      }
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
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @param {object} data - signup object
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
   * @param {object} next - returns data to next middleware
   * @returns {object} -returns error if there is any
   */
  static authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    let token;
    if (authorizationHeader) {
      token = authorizationHeader;
    }
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
   * @param {object} next - returns data to next middleware
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

}


export default Validations;

