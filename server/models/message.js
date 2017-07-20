module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT,
    groupname: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        /*Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASACADE'
        });*/
      }
    }
  });
  return Message;
};
