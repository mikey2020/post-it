// import Sequelize from sequelize model

import Sequelize from 'sequelize';

// import bcrypt bcrypt-nodejs to encrypt user's password

import bcrypt from 'bcrypt-nodejs';


// import sequelize from database config file

import sequelize from '../db';


// User model

const User = sequelize.define('user', {

  userName: {

    type: Sequelize.STRING,

    notEmpty: true,

    allowNull: false,

    unique: true

  },

  email: {

    type: Sequelize.STRING,

    isEmail: true,

    allowNull: false,

    unique: true


  },

  password: {

    type: Sequelize.STRING,

    allowNull: false,

    validate: {

      len: {

        args: 4,

        msg: 'Name must be at least 3 characters in length'
      },


    }


  }

});

// Group model

const Group = sequelize.define('group', {

  name: {

    type: Sequelize.STRING,

    unique: true,

    allowNull: false
  },

  creator: {
    type: Sequelize.STRING

  },

});


const UserGroups = sequelize.define('usergroup', {

  username: {

    type: Sequelize.STRING,

    allowNull: false
  },

  groupId: Sequelize.INTEGER

});


// Model that stores user's posts

const Post = sequelize.define('post', {

  post: {

    type: Sequelize.STRING,

    allowNull: false

  },

  groupId: {
    type: Sequelize.STRING,
    allowNull: false
  }

});


// Association to determine how many groups a user has created

User.hasMany(Group, { as: 'groups' });


// Asscoiation to determine how many posts a group has

// Group.hasMany(Post, { as: 'posts' });


// Encrypting user password before saving to database

User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password);

    // user.username = user.username.toLowerCase();
});

/* User.afterCreate((user, options) => {
  console.log('user created successfully');
});*/

UserGroups.beforeCreate((user) => {
  user.groupId = parseInt(user.groupId, 10);
});

Post.beforeCreate((user) => {
  user.groupId = parseInt(user.groupId, 10);
});


// Exporting all models for use

export { User, Group, UserGroups, Post, bcrypt };
