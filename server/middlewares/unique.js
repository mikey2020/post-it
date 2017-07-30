import models from '../models';

/** All uniqueness validators
 * @class
 */
class Unique {

  /**
   * @constructor
   */
  constructor() {
    Unique.isAuthenticated = false;
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @param {object} next - response object that sends data to the next middleware
   * @returns {object} - if there is no error, it returns array of users in a group
   */
  userGroups(req, res, next) {
    models.UserGroups.findOne({
      where: {
        userId: req.body.userId,
        groupId: req.params.groupId
      }
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({ errors: { message: 'user already added to group' } });
      }
      next();
    });
  }

  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - returns data to the next middleware
   * @returns {object} - errors object if there is any
   */
  checkUserIsValid(req, res, next) {
    models.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then((validUser) => {
      console.log(validUser);
      if (validUser === null) {
        return res.status(400).json({ errors: { message: 'user does not exist' } });
      }
      req.validUserId = validUser.id;
      next();
    });
  }

  /**
   * @param {object} req - signup object
   * @param {object} res - errors object if there is any
   * @param {object} next - returns data to next middleware
   * @returns {object} -returns error if there is any
   */
  authenticate(req, res, next) {
    Unique.isAuthenticated = true;
    if (req.session.name) {
      next();
    } else {
      res.status(400).json({ errors: { message: 'Please Sign in' } });
    }
  }

  /**
   * @param {object} req - signup object
   * @param {object} res - errors object if there is any
   * @param {object} next - returns data to next middleware
   * @returns {object} -returns error if there is any
   */
  isGroupMember(req, res, next) {
    console.log(req.session.userId);
    if (Unique.isAuthenticated === true) {
      models.UserGroups.findOne({
        where: {
          userId: req.session.userId,
          groupId: req.params.groupId
        }
      }).then((user) => {
        if (user !== null) {
          next();
        } else {
          res.status(400).json({ errors: { message: 'You are not a part of this group' } });
        }
      });
    }
  }

  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - returns data to the next middleware
   * @returns {object} - errors object if there is any
   */
  checkGroupExists(req, res, next) {
    if (Unique.isAuthenticated === true) {
      models.Group.findOne({
        where: {
          id: req.params.groupId
        }
      }).then((validGroup) => {
        if (validGroup === null) {
          return res.status(400).json({ errors: { message: 'group does not exist' } });
        }
        next();
      });
    }
  }
}


export default Unique;
