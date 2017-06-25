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

    allowNull: false,

    unique: true
    
  } ,

  email: {

  	type: Sequelize.STRING,

  	isEmail: true,

    allowNull: false,

    unique: true


  } ,

  password: {

  	type: Sequelize.STRING,

    allowNull: false ,
  
    validate: {
      
        len: {
           
           args: 4,

           msg: "Name must be at least 3 characters in length"
        },


    }

   
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

	username: {

   type: Sequelize.STRING,

   allowNull: false

  },

	groupId: Sequelize.INTEGER

});

const Post = sequelize.define('post',{

	post: {

		type: Sequelize.STRING,

		allowNull: false

	} 

	//groupName: Sequelize.STRING

});

User.hasMany(Group, {as: 'groups'});

Group.hasMany(Post,{as: 'posts'});


User.beforeCreate((user, options) => {

    user.password = bcrypt.hashSync(user.password);	

    User.findOne({
          where: {
            userName: user.userName
          }
        }).then(user => {
          user.userName = " ";
          if(user) {
            throw new Error("user already exists ");

          }

    });
      
    //user.username = user.username.toLowerCase();

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