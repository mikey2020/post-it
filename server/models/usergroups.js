module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define('UserGroups', {
    username: DataTypes.STRING,
    groupname: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return UserGroups;
};
