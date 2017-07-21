module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: DataTypes.STRING,
    groupCreator: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId'
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'UserGroups',
    });
  };
  return Group;
};

