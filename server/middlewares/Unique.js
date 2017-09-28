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

  /** @description - checks if a user has already been added to a group
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   * @param {Function} next
   * - response object that sends data to the next middleware
   *
   * @returns {Object}
   * - if there is no error, it returns array of users in a group
   */
  static isAlreadyGroupMember(request, response, next) {
    models.UserGroups.findOne({
      where: {
        userId: request.validUserId,
        groupId: request.params.groupId
      }
    })
    .then((user) => {
      if (user) {
        return response.status(400).json(
          { errors: { message: 'user already added to group' } });
      }
      next();
    });
  }

  /** @description - checks if message has already been read by a user
   *
   * @param {Object} request - request object sent to a route
   * @param {Object} response -  response object from the route
   * @param {Object} next
   * - response object that sends data to the next middleware
   *
   * @returns {Object}
   * - if there is no error, it returns array of users in a group
   */
  static checkReadMessages(request, response, next) {
    models.ReadMessages.findOne({
      where: {
        messageId: request.params.messageId,
        userId: request.decoded.data.id
      }
    })
    .then((readMessage) => {
      if (readMessage) {
        return response.json(
          { errors: { message: 'user has already read this message' } });
      }
      next();
    });
  }
  /** @description - check number of messages a group has,
   * so as to determine the limit and offset being sent out
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @param {Obeject} next - next object
   *
   * @returns {void} - it number of read message by the logged in user
   */
  static setNumberOfMessages(request, response, next) {
    models.Message.findAndCountAll({
      where: {
        groupId: request.params.groupId
      }
    }).then((message) => {
      const messageNumber = message.count;
      if (messageNumber <= request.query.offset) {
        request.query.limit = messageNumber;
        request.query.offset = 0;
      }
      next();
    });
  }

}


export default Unique;
