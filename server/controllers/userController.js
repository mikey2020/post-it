import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
class UserActions {

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
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errors: { message: 'Something went wrong' } });
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
    User.findOne({
      where: {
        username: req.body.username
      }
    })
     .then((user) => {
       let userData = JSON.stringify(user);
       userData = JSON.parse(userData);
       console.log('old password', userData);
       user.password = req.body.password;

       user.save().then((newUser) => {
         console.log('new user', newUser);
         console.log('passsword seems to be updated');
         res.json({ message: 'password has been changed' });
       });
     })
     .catch((err) => {
       console.log(err);
       res.status(400).json({ errors: { form: 'Invalid Username' } });
     });
  }

}


export default UserActions;
