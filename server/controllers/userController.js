import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import shortid from 'shortid';
import nodemailer from 'nodemailer';

import Validations from '../middlewares/validations';
import models from '../models';

dotenv.config();

const User = models.User;
const validate = new Validations();
// const forgotPasswordMessage = 'Please enter this verification code in the reset password page';

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
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static signup(req, res) {
    const { errors, isValid } = validate.signup(req.body);
    if (!isValid) {
      res.status(400).json(errors);
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
        // const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ message: `${req.body.username} successfully added` });
      })
      .catch(() => {
        res.status(400).json({ errors: { message: 'error something went wrong' } });
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
      }
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
       res.status(400).json({ errors: { form: 'Invalid Signin Parameters' } });
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
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  allUsers(req, res) {
    User.findAll({}).then((data) => {
      res.json({ data });
    }).catch((err) => {
      this.errors = err;
      res.json({ errors: { err } });
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
    console.log('verify code', verificationCode);
    User.findOne({
      where: {
        username: req.body.username
      }
    })
     .then((user) => {
       user.verificationCode = verificationCode;
       user.save().then((newUser) => {
         console.log(newUser);
       });
       UserController.sendVerificationCode(user.email, user.username, verificationCode);
       res.json({ message: 'Verification code sent' });
     })
     .catch(() => {
       res.status(400).json({ errors: { form: 'Invalid Username' } });
     });
  }
  /**
   * @returns {void}
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
      from: 'superdafe@gmail.com',
      to: userEmail,
      subject: 'Reset password verification code',
      html: `<h2>Hello, ${username}!</h2>
          <p><strong>Your Verification code is:</strong> ${verificationCode}</p>\
          <p><a href="${url}">Update my password</a></p><br /><br />\
          <p>Please use this link to update your password by inputing your verification code</p>\`
          <p>You can post messages on <a href="mike-post.herokuapp.com">POSTIT</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }

  /**
   * @returns {void}
   */
  static checkVerificationCode(req, res) {
    models.findOne({
      where: {
        verificationCode: req.body.verificationCode
      }
    })
    .then((user) => {
      if (req.body.verificationCode === user.verificationCode) {
        user.password = req.body.password;
        user.save().then((newUser) => {
           console.log('this my new symbol', newUser);
        });
      }
    });
  }
}


export default UserController;
