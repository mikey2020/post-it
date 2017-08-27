import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import shortid from 'shortid';
import nodemailer from 'nodemailer';
import winston from 'winston';

import Validations from '../middlewares/validations';
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
   * @param {Object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static signup(req, res) {
    const { errors, isValid } = validate.signup(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else if (UserController.checkGoogleUserExists(req.body.username) === true) {
      User.findOne({
        where: {
          username: req.body.username
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'verificationCode', 'phoneNumber'] }
      })
     .then((user) => {
       let userData = JSON.stringify(user);
       userData = JSON.parse(userData);
       if (req.body.username && req.body.password &&
         bcrypt.compareSync(req.body.password, userData.password) === true) {
         const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
         res.json({ user: { name: req.body.username, message: `${req.body.username} signed in`, userToken: token } });
       } else {
         res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
       }
     });
    } else {
      return User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
      })
      .then((user) => {
        let userData = JSON.stringify(user);
        userData = JSON.parse(userData);
        const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(201).json({ message: `${req.body.username} successfully added`, userToken: token });
      })
      .catch(() => {
        res.status(400).json({ errors: { message: 'User already exists' } });
      });
    }
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static signin(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'verificationCode', 'phoneNumber'] }
    })
     .then((user) => {
       let userData = JSON.stringify(user);
       userData = JSON.parse(userData);
       if (req.body.username && req.body.password &&
         bcrypt.compareSync(req.body.password, userData.password) === true) {
         const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
         res.json({ user: { name: req.body.username, message: `${req.body.username} signed in`, userToken: token } });
       } else {
         res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
       }
     })
     .catch(() => {
       res.status(400).json({ errors: { form: 'Invalid User' } });
     });
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static checkUserExists(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      res.json({ user });
    });
  }

  /**
   * @param {string} username
   * @returns {boolean} - whether true or false
   */
  static checkGoogleUserExists(username) {
    return User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (user !== null) {
        return true;
      }
      return false;
    });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static allUsers(req, res) {
    User.findAll({}).then((data) => {
      res.json({ data });
    }).catch(() => {
      res.status(404).json({ errors: {} });
    });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static getUsers(req, res) {
    User.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: {
        username: {
          $iLike: `%${req.body.username}%`
        }
      } },
     { offset: req.body.offset, limit: 5 }
     ).then((data) => {
       res.json({ users: { data } });
     }).catch(() => {
       res.json({ errors: { message: 'something went wrong' } });
     });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static resetPassword(req, res) {
    const verificationCode = shortid.generate();
    User.findOne({
      where: {
        username: req.body.username
      }
    })
     .then((user) => {
       user.verificationCode = verificationCode;
       user.save().then(() => {});
       UserController.sendVerificationCode(user.email, user.username, verificationCode);
       res.json({ message: 'Verification code sent' });
     })
     .catch(() => {
       res.status(400).json({ errors: { form: 'Invalid Username' } });
     });
  }
  /**
   * @returns {void}
   * @param {Array} userEmail
   * @param {String} username
   * @param {String} verificationCode
   */
  static sendVerificationCode(userEmail, username, verificationCode) {
    const url = 'http://localhost:3000';
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
      subject: 'Reset password verification code',
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
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {void}
   */
  static checkVerificationCode(req, res) {
    User.findOne({
      where: {
        verificationCode: req.body.code
      }
    })
    .then((user) => {
      if (req.body.code === user.verificationCode) {
        user.password = req.body.newPassword;
        user.update().then(() => {
          res.status(201).json({ message: 'password updated successfully' });
        });
      } else {
        res.status(400).json({ message: 'Invalid verification code' });
      }
    })
    .catch(() => {
      res.status(400).json({ message: 'Invalid verification code' });
    });
  }
}


export default UserController;
