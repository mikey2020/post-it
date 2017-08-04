'use strict';

module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      unique: true
    },
    groupCreator: DataTypes.STRING
  });
  Group.associate = function (models) {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId'
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'UserGroups'
    });
  };
  return Group;
};