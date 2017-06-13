import crypto from 'crypto';

import {sequelize} from '../db.js';

import Sequelize from 'sequelize';

//import {Group} from './groupModel.js';

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING,
    notEmpty: true,
    unique: true
  },
  email:{
  	type: Sequelize.STRING,
  	isEmail: true
  },
  password:{
  	type: Sequelize.STRING,
  	len: [5,30]
  },

  salt: Sequelize.STRING

});

const Group = sequelize.define('group', {
  name: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  creator:{
  	type: Sequelize.STRING
  },
});

const UserGroups = sequelize.define('usergroup',{
	userId: Sequelize.INTEGER,
	groupId: Sequelize.INTEGER
});

const Post = sequelize.define('post',{
	post: {
		type: Sequelize.STRING,
		allowNull: false
	},

	groupName: Sequelize.STRING

});

//Group.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
//User.hasMany(Group,{foreignKey: 'user_name', sourceKey: 'userName'});
//Group.belongsTo(User, {foreignKey: 'user_name', targetKey: 'userName'});

User.hasMany(Group, {as: 'groups'});
Group.hasMany(Post,{as: 'posts'});

const hashPassword = (password,salt) => {
	let hashedPassword = crypto.pbkdf2Sync(password, salt , 1000, 64, 'sha512');
	hashedPassword = hashedPassword.toString('hex');
	//console.log(hashedPassword.toString('hex')); 
	return hashedPassword;
}

User.beforeCreate((user, options) => {
    user.salt = crypto.randomBytes(16);

    user.password = hashPassword(user.password,user.salt);
    //user.salt; 	
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

export {User,hashPassword,Group,UserGroups,Post};