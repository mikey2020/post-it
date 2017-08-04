'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserGroups = sequelize.define('UserGroups', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserGroups;
};