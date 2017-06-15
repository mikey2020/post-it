//import Sequelize from sequelize model
import Sequelize from 'sequelize';

//import bcrypt bcrypt-nodejs to encrypt user's password 
import bcrypt from 'bcrypt-nodejs';


//import sequelize from database config file
import {sequelize} from '../db.js';


const User = sequelize.define('user', {

  userName: {

    type: Sequelize.STRING,

    notEmpty: true,

    unique: true
  } ,

  email: {

  	type: Sequelize.STRING,

  	isEmail: true
  } ,

  password: {

  	type: Sequelize.STRING,

  	len: [5,30]
  
  }

});

const Group = sequelize.define('group', {

  name: {

    type: Sequelize.STRING,

    notEmpty: true
  } ,

  creator: {
  	type: Sequelize.STRING

  } ,

});

const UserGroups = sequelize.define('usergroup',{

	userId: Sequelize.INTEGER,

	groupId: Sequelize.INTEGER

});

const Post = sequelize.define('post',{

	post: {

		type: Sequelize.STRING,

		allowNull: false

	} ,

	groupName: Sequelize.STRING

});

User.hasMany(Group, {as: 'groups'});

Group.hasMany(Post,{as: 'posts'});


User.beforeCreate((user, options) => {

    user.password = bcrypt.hashSync(user.password);	

});

User.afterCreate((user,options) => {

	console.log("user created successfully");

});

UserGroups.beforeCreate((user,options) => {

	user.groupId = parseInt(user.groupId);

})

Post.beforeCreate((user,options) => {

	user.groupId = parseInt(user.groupId);
  
});

export {User,Group,UserGroups,Post,bcrypt};