module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: DataTypes.STRING,
    groupCreator: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        /*Group.belongsTo(models.User, {
          as: 'user'
        });
        Group.hasMany(models.Message, {
          foreignKey: 'groupId'
        });*/
      }
    }
  });
  return Group;
};
