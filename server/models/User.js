import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    verificationCode: DataTypes.STRING
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups',
    });
    User.belongsToMany(models.Message, {
      foreignKey: 'userId',
      through: 'ReadMessages'
    });
    User.belongsToMany(models.Notification, {
      foreignKey: 'userId',
      through: 'UserNotification'
    });
  };

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password);
  });

  User.beforeUpdate((user) => {
    user.password = bcrypt.hashSync(user.password);
  });

  return User;
};