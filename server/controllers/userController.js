import bcrypt from 'bcrypt-nodejs';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import Validations from '../middlewares/validations';

import models from '../models';

dotenv.config();

const User = models.User;

const validate = new Validations();

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
        password: req.body.password
      })
      .then((user) => {
        let userData = JSON.stringify(user);
        userData = JSON.parse(userData);
        const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ message: `${req.body.username} successfully added`, userToken: token });
      })
      .catch(() => {
        res.status(400).json({ errors: { message: 'user already exists' } });
      });
    }
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  static signin(req, res) {
    User.findAll({
      where: {
        username: req.body.username
      }
    })
     .then((user) => {
       let userData = JSON.stringify(user);
       userData = JSON.parse(userData);
       if (req.body.username && req.body.password &&
         bcrypt.compareSync(req.body.password, userData[0].password) === true) {
         req.session.name = req.body.username;
         req.session.userId = userData[0].id;
         res.json({ user: { name: req.body.username, message: `${req.body.username} signed in` } });
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
  isUnique(req, res) {
    User.findOne({

      where: {
        userName: req.params.name
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


}


export default UserActions;
