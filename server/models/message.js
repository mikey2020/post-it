module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASACADE'
    });

    Message.belongsToMany(models.User, {
      foreignKey: 'messageId',
      through: 'ReadMessages'
    });
  };

  return Message;
};
