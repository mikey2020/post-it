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
   * @param {object} next
   * - response object that sends data to the next middleware
   * @returns {object}
   * - if there is no error, it returns array of users in a group
   */
  static isAlreadyGroupMember(req, res, next) {
    models.UserGroups.findOne({
      where: {
        userId: req.validUserId,
        groupId: req.params.groupId
      }
    })
    .then((user) => {
      if (user) {
        return res.status(400).json(
          { errors: { message: 'user already added to group' } });
      }
      next();
    });
  }

  /**
   * @param {object} req - request object sent to a route
   * @param {object} res -  response object from the route
   * @param {object} next
   * - response object that sends data to the next middleware
   *
   * @returns {object}
   * - if there is no error, it returns array of users in a group
   */
  static checkMessageRead(req, res, next) {
    models.ReadMessages.findOne({
      where: {
        messageId: req.params.messageId,
        userId: req.decoded.data.id
      }
    })
    .then((readMessage) => {
      if (readMessage) {
        return res.json(
          { errors: { message: 'user has already read this message' } });
      }
      next();
    });
  }
  /**
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Obeject} next - next object
   *
   * @returns {void} - it number of read message by the logged in user
   */
  static checkMessageNumber(req, res, next) {
    models.Message.findAndCountAll({
      where: {
        groupId: req.params.groupId
      }
    }).then((message) => {
      const messageNumber = message.count;
      if (messageNumber <= req.query.offset) {
        req.query.limit = messageNumber;
        req.query.offset = 0;
      }
      next();
    });
  }

}


export default Unique;
