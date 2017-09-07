module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('UserNotification', {
    notificationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  return UserNotification;
};
