module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('UserNotification', {
    notificationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserNotification;
};
