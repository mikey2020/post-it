'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  User.associate = function (models) {
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups'
    });
    User.belongsToMany(models.Message, {
      foreignKey: 'userId',
      through: 'ReadMessages'
    });
  };

  User.beforeCreate(function (user) {
    user.password = _bcryptNodejs2.default.hashSync(user.password);
  });

  /* User.beforeSave((user) => {
    user.password = bcrypt.hashSync(user.password);
  }); */

  return User;
};