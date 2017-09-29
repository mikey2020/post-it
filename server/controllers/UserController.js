  import bcrypt from 'bcrypt-nodejs';
  import jwt from 'jsonwebtoken';
  import dotenv from 'dotenv';
  import shortid from 'shortid';
  import isEmpty from 'lodash/isEmpty';

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
     * @param {Object} response -  response object from the route
     *
     * @returns {Object} - returns a token and message
     *
     * @description - it adds a new user to the database
     */
    static signUp(request, response) {
      const { errors, isValid } = validate.signUp(request.body);
      if (!isValid) {
        response.status(400).json(errors);
      } else if (request.userAlreadyExists === true) {
        response.status(409)
          .json({ errors:
            { message: 'User already exists' } });
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
          process.env.JWT_SECRET, { expiresIn: '20h' });
          response.status(201).json(
            { message: `${request.body.username} successfully added`,
              userToken: token });
        })
        .catch(() => {
          returnServerError(response);
        });
      }
    }
    /**
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
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
        if (!isEmpty(user)) {
          let userData = JSON.stringify(user);
          userData = JSON.parse(userData);
          if (request.body.username && request.body.password &&
          bcrypt.compareSync(request.body.password, userData.password)
          === true) {
            const token = jwt.sign({ data: userData }, process.env.JWT_SECRET,
            { expiresIn: '20h' });
            response.json({ user: { message: `${username} signed in`,
              userToken: token } });
          } else {
            response.status(401).json({ errors:
            { form: 'Invalid Signin Parameters' } });
          }
        } else {
          response.status(401).json({ errors: { form: 'Invalid User' } });
        }
      })
      .catch(() => {
        returnServerError(response);
      });
    }
    /**
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     *
     * @description - it helps check whether a user,
     *  already exists in the database
     */
    static checkUserExists(request, response) {
      const { username, email } = request.body;
      User.findOne({ attributes:
        { exclude: ['password', 'createdAt', 'updatedAt', 'verificationCode'] },
        where: {
          $or: [
            { username: {
              $iLike: username
            } },
            { email }
          ]
        }
      }).then((user) => {
        if (!isEmpty(user)) {
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
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
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
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     *
     * @description - It sends a user their verification code
     * and stores it on the user's table
     */
    static setVerificationCode(request, response) {
      const verificationCode = shortid.generate();
      User.findOne({
        where: {
          username: {
            $iLike: request.body.username
          }
        }
      })
      .then((user) => {
        if (!isEmpty(user)) {
          const { email } = user;
          user.verificationCode = verificationCode;
          user.save().then(() => {});
          UserController.sendVerificationCode(email,
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
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
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
        if (!isEmpty(user)) {
          if (request.body.code === user.verificationCode) {
            user.password = request.body.newPassword;
            user.update({ password: request.body.newPassword }).then(() => {
              response.status(200).json(
                { message: 'password updated successfully' });
            });
          } else {
            response.status(400).json({ message: 'Invalid verification code' });
          }
        } else {
          request.status(404).json({ message: 'Invalid user' });
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
     * @param {Object} request - request object
     * @param {Object} response - response object
     * @param {Function} next
     */
    static isAlreadyUser(request, response, next) {
      const { username, email } = request.body;
      models.User.findOne({
        where: {
          $or: [
            { username },
            { email }
          ]
        }
      })
      .then((user) => {
        if (isEmpty(user) === true) {
          request.userAlreadyExists = false;
        } else {
          request.userAlreadyExists = true;
        }
        next();
      });
    }
  }

  export default UserController;
