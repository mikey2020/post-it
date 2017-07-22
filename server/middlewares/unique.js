import models from '../models';

/** All uniqueness validators
 * @class
 */
class Unique {
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
}


export default Unique;