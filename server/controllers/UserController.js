import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import shortid from 'shortid';
import nodemailer from 'nodemailer';
import winston from 'winston';

import Validations from '../middlewares/Validations';
import models from '../models';

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
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static signup(request, response) {
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
        response.status(201).json({ message: `${request.body.username} successfully added`,
          userToken: token });
      })
      .catch(() => {
        response.status(409).json({ errors: { message: 'User already exists' } });
      });
    }
  }
  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static signin(request, response) {
    User.findOne({
      where: {
        username: request.body.username
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'verificationCode', 'phoneNumber'] }
    })
     .then((user) => {
       let userData = JSON.stringify(user);
       userData = JSON.parse(userData);
       if (request.body.username && request.body.password &&
         bcrypt.compareSync(request.body.password, userData.password) === true) {
         const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '5h' });
         response.json({ user: { name: request.body.username, message: `${request.body.username} signed in`, userToken: token } });
       } else {
         response.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
       }
     })
     .catch(() => {
       response.status(401).json({ errors: { form: 'Invalid User' } });
     });
  }
  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static checkUserExists(request, response) {
    User.findOne({
      where: {
        username: request.body.username
      }
    }).then((user) => {
      response.json({ user });
    })
    .catch(() => {
      response.status(500).json({ message: 'Internal Server Error' });
    });
  }

  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static getUsers(request, response) {
    User.findAll({ attributes:
      { exclude: ['password', 'createdAt', 'updatedAt', 'verificationCode'] },
      where: {
        username: {
          $iLike: `%${request.body.username}%`
        }
      } },
     { offset: request.body.offset, limit: 5 }
     ).then((data) => {
       response.json({ users: { data } });
     }).catch(() => {
       response.json({ errors: { message: 'something went wrong' } });
     });
  }

  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static startResetPassword(request, response) {
    const verificationCode = shortid.generate();
    User.findOne({
      where: {
        username: request.body.username
      }
    })
     .then((user) => {
       user.verificationCode = verificationCode;
       user.save().then(() => {});
       UserController.sendVerificationCode(user.email, user.username, verificationCode);
       response.json({ message: 'Verification code sent' });
     })
     .catch(() => {
       response.status(400).json({ errors: { form: 'Invalid Username' } });
     });
  }
  /**
   * @returns {void}
   * @param {Array} userEmail
   * @param {String} username
   * @param {String} verificationCode
   */
  static sendVerificationCode(userEmail, username, verificationCode) {
    const url = process.env.URL;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'superdafe@gmail.com',
        pass: 'odafe2020'
      }
    });

    const mailOptions = {
      from: 'PostIt',
      to: userEmail,
      subject: 'reset password verification code',
      html: `<div><h2>Hello, ${username}!</h2>
          <p><strong>Your Verification code is:</strong> ${verificationCode}</p>\
          <p><a href="${url}">Update my password</a></p><br /><br />\
          <p>Please use this link to update your password by inputing your verification code</p>\`
          <p>You can post messages on <a href="mike-post.herokuapp.com">POSTIT</a></p></div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        winston.log(error);
      } else {
        winston.info('Email sent: ', info.response);
      }
    });
  }

  /**
   * @param {object} request - request object sent to a route
   * @param {object} response -  response object from the route
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
          response.status(201).json({ message: 'password updated successfully' });
        });
      } else {
        response.status(400).json({ message: 'Invalid verification code' });
      }
    })
    .catch(() => {
      response.status(400).json({ message: 'Invalid verification code' });
    });
  }
}

export default UserController;
