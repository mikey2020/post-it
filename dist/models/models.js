'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bcrypt = exports.Post = exports.UserGroups = exports.Group = exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _db = require('../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User model

// import bcrypt bcrypt-nodejs to encrypt user's password

var User = _db.sequelize.define('user', {

  userName: {

    type: _sequelize2.default.STRING,

    notEmpty: true,

    allowNull: false,

    unique: true

  },

  email: {

    type: _sequelize2.default.STRING,

    isEmail: true,

    allowNull: false,

    unique: true

  },

  password: {

    type: _sequelize2.default.STRING,

    allowNull: false,

    validate: {

      len: {

        args: 4,

        msg: 'Name must be at least 3 characters in length'
      }

    }

  }

});

// Group model 

// import sequelize from database config file

// import Sequelize from sequelize model

var Group = _db.sequelize.define('group', {

  name: {

    type: _sequelize2.default.STRING,

    notEmpty: true
  },

  creator: {
    type: _sequelize2.default.STRING

  }

});

// Model to determine how many groups a user is part of

var UserGroups = _db.sequelize.define('usergroup', {

  username: {

    type: _sequelize2.default.STRING,

    allowNull: false

  },

  groupId: _sequelize2.default.INTEGER

});

// Model that stores user's posts

var Post = _db.sequelize.define('post', {

  post: {

    type: _sequelize2.default.STRING

  },

  groupId: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },

  groupName: _sequelize2.default.STRING

});

// Association to determine how many groups a user has created

User.hasMany(Group, { as: 'groups' });

// Asscoiation to determine how many posts a group has

//Group.hasMany(Post, { as: 'posts' });


// Encrypting user password before saving to database

User.beforeCreate(function (user) {
  user.password = _bcryptNodejs2.default.hashSync(user.password);

  // user.username = user.username.toLowerCase();
});

/* User.afterCreate((user, options) => {
  console.log('user created successfully');
});*/

UserGroups.beforeCreate(function (user) {
  user.groupId = parseInt(user.groupId, 10);
});

Post.beforeCreate(function (user) {
  user.groupId = parseInt(user.groupId, 10);
});

// Exporting all models for use

exports.User = User;
exports.Group = Group;
exports.UserGroups = UserGroups;
exports.Post = Post;
exports.bcrypt = _bcryptNodejs2.default;