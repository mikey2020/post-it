'use strict';

module.exports = function (sequelize, DataTypes) {
  var ReadMessages = sequelize.define('ReadMessages', {
    messageId: {
      type: DataTypes.INTEGER,
      unique: false
    },
    userId: DataTypes.INTEGER
  });
  return ReadMessages;
};