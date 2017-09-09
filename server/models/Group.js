module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: {
      type: DataTypes.STRING,
      unique: true
    },
    groupCreator: DataTypes.STRING
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId'
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'UserGroups',
    });
    Group.hasMany(models.Notification, {
      foreignKey: 'groupId'
    });
  };
  return Group;
};

