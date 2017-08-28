module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    groupId: DataTypes.INTEGER,
    event: DataTypes.STRING
  });

  Notification.associate = (models) => {
    Notification.belongsToMany(models.User, {
      foreignKey: 'notificationId',
      through: 'UserNotification'
    });
  };
  return Notification;
};
