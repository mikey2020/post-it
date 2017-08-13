module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      unique: true
    },
    groupCreator: DataTypes.STRING,
    notifications: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allownull: true
    }
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

