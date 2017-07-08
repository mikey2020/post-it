import { User, bcrypt } from '../models/models';

import Validations from '../middlewares/validations';

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
    this.onlineStatus = true;
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  signup(req, res) {
    const { errors, isValid } = validate.signup(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else if (this.onlineStatus === true) {
      res.status(500).json({ error: 'you already have an account' });
    } else {
     // force: true will drop the table if it already exists

      User.sync({ force: false }).then(() =>
       // Table created
      User.create({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
       .catch((err) => {
         res.json({ message: err });
       }));

      res.json({ message: `${req.body.username} successfully added` });
    }
  }
  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @returns {object} - if there is no error, it sends (username) created successfully
   */
  signin(req, res) {
    req.session.username = req.body.username;
    // this.errors = { form: 'Invalid Signin Parameters' };
    User.findAll({
      where: {
        userName: req.body.username
      }
    })
     .then((user) => {
       let data = JSON.stringify(user);

       data = JSON.parse(data);


       if (bcrypt.compareSync(req.body.password, data[0].password) === true) {
         req.session.name = req.body.username;
         req.session.userId = data[0].id;
         res.json({ user: { name: req.body.username, message: `${req.body.username} signed in` } });
         this.onlineStatus = true;
       } else {
         res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
       }
     })

     .catch((err) => {
       // this.errros = err;
       res.status(401).json({ errors: { form: 'Invalid Signin Parameters' } });
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
      // res.json({ message: 'Error occured please try again' });
      res.json({ errors: { err } });
    });
  }


}


export default UserActions;
