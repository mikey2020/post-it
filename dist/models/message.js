'use strict';

module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true
    },
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  Message.associate = function (models) {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASACADE'
    });
  };

  return Message;
};