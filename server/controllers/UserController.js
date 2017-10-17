  import bcrypt from 'bcrypt-nodejs';
  import dotenv from 'dotenv';
  import shortid from 'shortid';
  import isEmpty from 'lodash/isEmpty';

  import Validations from '../middlewares/Validations';
  import models from '../models';
  import sendEmail from '../helpers/sendEmail.js';
  import returnServerError from '../helpers/returnServerError.js';
  import generateToken from '../helpers/generateToken.js';

  dotenv.config();
  const User = models.User;
  const validate = new Validations();

  /**
   * All user actions
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
     * @description - it adds a new user to the database
     *
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {Object} - returns a token and message
     *
     */
    static signUp(request, response) {
      const { errors, isValid } = validate.signUp(request.body);
      const { username, email, password, phoneNumber } = request.body;
      if (!isValid) {
        response.status(400).json(errors);
      } else if (request.userAlreadyExists === true) {
        response.status(409).json(
          {
            errors:
            {
              message: 'User already exists'
            }
          }
        );
      } else {
        return User.create({
          username,
          email,
          password,
          phoneNumber
        })
        .then((user) => {
          let userData = JSON.stringify(user);
          userData = JSON.parse(userData);
          const token = generateToken(userData);
          response.status(201).json(
            {
              message: `${request.body.username} successfully added`,
              userToken: token
            }
          );
        })
        .catch(() => {
          returnServerError(response);
        });
      }
    }
    /**
     * @description - it signs in a user by generating a token,
     * that is unique to them
     *
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     *
     *
     */
    static signIn(request, response) {
      const username = request.body.username.toLowerCase();
      const { password } = request.body;
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
          if (username && password &&
            bcrypt.compareSync(password, userData.password) === true) {
            const token = generateToken(userData);
            response.status(200).json({
              message: `${username} signed in`,
              userToken: token });
          } else {
            response.status(401).json(
              {
                errors:
                {
                  form: 'Invalid Signin Parameters'
                }
              }
            );
          }
        } else {
          response.status(401).json({
            errors: {
              form: 'Invalid User'
            }
          });
        }
      })
      .catch(() => {
        returnServerError(response);
      });
    }
    /**
     * @description - it helps check whether a user,
     *  already exists in the database
     *
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     *
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
          response.status(404).json(
            {
              message: 'User does not exist'
            }
          );
        }
      })
      .catch(() => {
        returnServerError(response);
      });
    }

    /**
     * @description - it helps a user search for other users
     *
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     *
     */
    static getUsers(request, response) {
      User.findAll({ attributes:
        { exclude: ['password', 'createdAt', 'updatedAt', 'verificationCode'] },
        where: {
          username: {
            $iLike: `%${request.query.username}%`
          }
        } }
      ).then((users) => {
        if (typeof users[0] !== 'undefined') {
          response.status(200).json({ users });
        } else {
          response.status(404).json(
            {
              message: 'No user found'
            }
          );
        }
      }).catch(() => {
        returnServerError(response);
      });
    }

    /**
     * @description - It sends a user their verification code
     * and stores it on the user's table
     *
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     *
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
          const subject = 'Reset Password verification code';
          user.verificationCode = verificationCode;
          user.save().then(() => {});
          UserController.sendVerificationCode(email,
          user.username, verificationCode, subject);
          response.status(200).json(
            {
              message: 'Verification code sent'
            }
          );
        } else {
          response.status(400).json(
            {
              errors:
              {
                form: 'Invalid Username'
              }
            }
          );
        }
      })
      .catch(() => {
        returnServerError(response);
      });
    }
    /**
     * @description - It sends a verification code to a user
     *
     * @param {Array} userEmail
     * @param {String} username
     * @param {String} verificationCode
     * @param {String} subject
     *
     * @returns {void}
     */
    static sendVerificationCode(userEmail, username,
      verificationCode, subject) {
      const message = `<div><h2>Hello, ${username}!</h2>
            <p><strong>Your Verification code is:</strong> 
            ${verificationCode}</p>`;
      sendEmail(userEmail, subject, message);
    }


    /**
     * @description - It checks or verifies user's verification code
     * and allows user update their password
     *
     * @param {Object} request - request object sent to a route
     * @param {Object} response -  response object from the route
     *
     * @returns {void}
     */
    static checkVerificationCode(request, response) {
      const { code, newPassword } = request.body;
      User.findOne({
        where: {
          verificationCode: code
        }
      })
      .then((user) => {
        if (!isEmpty(user)) {
          if (code === user.verificationCode) {
            if (newPassword !== undefined && newPassword.trim() !== '') {
              user.password = newPassword;
              user.update({ password: newPassword }).then(() => {
                response.status(200).json(
                  {
                    message: 'password updated successfully'
                  }
                );
              });
            } else {
              response.status(400).json(
                {
                  message: 'New password is required'
                }
              );
            }
          } else {
            response.status(400).json(
              {
                message: 'Invalid verification code'
              }
            );
          }
        } else {
          request.status(404).json(
            {
              message: 'Invalid user'
            }
          );
        }
      })
      .catch(() => {
        returnServerError(response);
      });
    }

  /**
   * @description it returns array of users in a group
   *
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   *
   * @returns {void}
   *
   */
    static getUserNotifications(request, response) {
      models.User.findOne({
        where: {
          id: request.decoded.data.id
        }
      })
    .then((user) => {
      user.getNotifications({ attributes:
        { exclude: ['createdAt', 'updatedAt', 'UserNotification'] },
        joinTableAttributes: [] })
        .then((notices) => {
          if (typeof notices[0] !== 'undefined') {
            response.status(200).json({ notices });
          } else {
            response.status(404).json(
              {
                message: 'No notification found'
              }
            );
          }
        });
    })
    .catch(() => {
      returnServerError(response);
    });
    }

  /**
   * @description - deletes all user's notifications from the database
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   *
   */
    static deleteNotifications(request, response) {
      models.UserNotification.destroy({
        where: {
          userId: request.decoded.data.id
        }
      }).then((notification) => {
        if (!notification) {
          response.status(404).json(
            {
              message: 'No notification found'
            }
          );
        } else {
          response.status(200).json(
            {
              message: 'All notifications deleted'
            }
          );
        }
      })
    .catch(() => {
      returnServerError(response);
    });
    }

  /**
   * @description - It verifies user's token on the front end
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   */
    static verifyToken(request, response) {
      if (request.decoded !== undefined) {
        response.status(200).json(
          {
            message: 'User is valid'
          }
        );
      }
    }

  }

  export default UserController;
