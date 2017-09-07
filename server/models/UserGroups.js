module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define('UserGroups', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserGroups;
};
