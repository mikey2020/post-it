import bcrypt from 'bcrypt-nodejs';

import Validations from '../middlewares/validations';

import models from '../models';

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
  signup(req, res) {
    const { errors, isValid } = validate.signup(req.body);
    req.session.status = false;
    if (!isValid) {
      res.status(400).json(errors);
    } else if (req.session.status === true) {
      res.status(500).json({ error: 'you already have an account' });
    } else {
      return User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(() => {
        res.json({ message: `${req.body.username} successfully added` });
      })
      .catch((err) => {
        res.status(400).json({ errors: { message: 'user already exists' } });
      });
    }
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  signin(req, res) {
    req.session.username = req.body.username;
    User.findAll({
      where: {
        username: req.body.username
      }
    })
     .then((user) => {
       let data = JSON.stringify(user);

       data = JSON.parse(data);

       if (req.body.username && req.body.password &&
         bcrypt.compareSync(req.body.password, data[0].password) === true) {
         req.session.name = req.body.username;
         req.session.userId = data[0].id;
         res.json({ user: { name: req.body.username, id: data[0].id, message: `${req.body.username} signed in` } });
       } else {
         res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
       }
     })
     .catch((err) => {
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
        username: req.params.name
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
  getUsers(req, res) {
    User.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: {
        username: {
          $iLike: '%' + req.body.username + '%'
        }
    } }).then((data) => {
      res.json({ users: { data } });
    }).catch((err) => {
      res.json({ errors: { message: 'something went wrong' } });
    });
  }


}


export default UserActions;
