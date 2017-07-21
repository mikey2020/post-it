import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups',
    });
    User.hasMany(models.Message, {
      foreignKey: 'userId',
    });
  };

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password);
  });
  return User;
};
