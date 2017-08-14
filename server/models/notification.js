module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    groupId: DataTypes.INTEGER,
    event: DataTypes.STRING
  });
  return Notification;
};
