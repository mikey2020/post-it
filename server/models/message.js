module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT,
    groupname: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASACADE'
    });
  };

  return Message;
};
