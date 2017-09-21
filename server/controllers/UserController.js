import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import shortid from 'shortid';

import Validations from '../middlewares/Validations';
import models from '../models';
import sendEmail from '../helpers/sendEmail.js';
import returnServerError from '../helpers/returnServerError.js';

dotenv.config();
const User = models.User;
const validate = new Validations();

/**
 *  All user actions
 * @class
 */
class UserController {
  /**
   * @constructor
   */
  constructor() {
    this.onlineStatus = false;
    this.userValid = true;
  }

  /**
   * @param {Object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - returns a token and message
   *
   * @description - it adds a new user to the database
   */
  static signUp(request, response) {
    const { errors, isValid } = validate.signup(request.body);
    if (!isValid) {
      response.status(400).json(errors);
    } else {
      return User.create({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        phoneNumber: request.body.phoneNumber
      })
      .then((user) => {
        let userData = JSON.stringify(user);
        userData = JSON.parse(userData);
        const token = jwt.sign({ data: userData },
        process.env.JWT_SECRET, { expiresIn: '5h' });
        response.status(201).json(
          { message: `${request.body.username} successfully added`,
            userToken: token });
      })
      .catch((error) => {
        response.status(409)
        .json({ errors:
          { message: `${error.errors[0].value} already exists` } });
      });
    }
  }
  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - if there is no error, a token and message
   *
   * @description - it signs in a user by generating a token,
   * that is unique to them
   */
  static signIn(request, response) {
    const username = request.body.username.toLowerCase();
    User.findOne({
      where: {
        username
      },
      attributes: { exclude: ['createdAt', 'updatedAt',
        'verificationCode', 'phoneNumber'] }
    })
     .then((user) => {
       let userData = JSON.stringify(user);
       userData = JSON.parse(userData);
       if (request.body.username && request.body.password &&
         bcrypt.compareSync(request.body.password, userData.password)
         === true) {
         const token = jwt.sign({ data: userData }, process.env.JWT_SECRET,
          { expiresIn: '5h' });
         response.json({ user: { message: `${username} signed in`,
           userToken: token } });
       } else {
         response.status(401).json({ errors:
           { form: 'Invalid Signin Parameters' } });
       }
     })
     .catch(() => {
       response.status(401).json({ errors: { form: 'Invalid User' } });
     });
  }
  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - either an error or success object
   *
   * @description - it helps check whether a user already exists in the database
   */
  static checkUserExists(request, response) {
    User.findOne({ attributes:
      { exclude: ['password', 'createdAt', 'updatedAt', 'verificationCode'] },
      where: {
        username: request.body.username,
      }
    }).then((user) => {
      if (user) {
        response.status(200).json({ user });
      } else {
        response.status(404).json({ message: 'User does not exist' });
      }
    })
    .catch(() => {
      returnServerError(response);
    });
  }

  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - number of results that match the user's query
   *
   * @description - it helps a user search for other users
   */
  static getUsers(request, response) {
    User.findAll({ attributes:
      { exclude: ['password', 'createdAt', 'updatedAt', 'verificationCode'] },
      where: {
        username: {
          $iLike: `%${request.query.username}%`
        }
      } },
     { offset: 0, limit: 5 }
     ).then((users) => {
       if (typeof users[0] !== 'undefined') {
         response.status(200).json({ users });
       } else {
         response.status(404).json({ message: 'No user found' });
       }
     }).catch(() => {
       returnServerError(response);
     });
  }

  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {object} - if there is no error
   *
   * @description - It sends a user their verification code
   * and stores it on the user's table
   */
  static setVerificationCode(request, response) {
    const verificationCode = shortid.generate();
    User.findOne({
      username: {
        $iLike: `%${request.body.username}%`
      }
    })
     .then((user) => {
       if (user) {
         user.verificationCode = verificationCode;
         user.save().then(() => {});
         UserController.sendVerificationCode(user.email,
         user.username, verificationCode);
         response.json({ message: 'Verification code sent' });
       } else {
         response.status(400).json({ errors: { form: 'Invalid Username' } });
       }
     })
     .catch(() => {
       returnServerError(response);
     });
  }
  /**
   * @returns {void}
   *
   * @param {Array} userEmail
   * @param {String} username
   * @param {String} verificationCode
   */
  static sendVerificationCode(userEmail, username, verificationCode) {
    const message = `<div><h2>Hello, ${username}!</h2>
          <p><strong>Your Verification code is:</strong> 
          ${verificationCode}</p>`;
    const subject = 'Reset Password verification code';
    sendEmail(userEmail, subject, message);
  }


  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {void}
   */
  static checkVerificationCode(request, response) {
    User.findOne({
      where: {
        verificationCode: request.body.code
      }
    })
    .then((user) => {
      if (request.body.code === user.verificationCode) {
        user.password = request.body.newPassword;
        user.update({ password: request.body.newPassword }).then(() => {
          response.status(200).json(
            { message: 'password updated successfully' });
        });
      } else {
        response.status(400).json({ message: 'Invalid verification code' });
      }
    })
    .catch(() => {
      returnServerError(response);
    });
  }

  /**
   * @description - It checks if a user already exists
   *
   * @returns {Boolean} - returns true or false
   *
   * @param {String} username
   */
  static isAlreadyUser(username) {
    models.User.findOne({
      where: {
        username
      }
    })
    .then((user) => {
      if (user) {
        return true;
      }
      return false;
    });
  }
}

export default UserController;
