import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        /*User.hasMany(models.Group, {
          foreignKey: {
            name: 'userId',
            allowNull: false
          }
        });*/
      }
    }
  });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password);
  });
  return User;
};
