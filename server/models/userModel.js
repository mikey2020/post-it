import crypto from 'crypto';

import {sequelize} from '../db.js';

import Sequelize from 'sequelize';

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  email:{
  	type: Sequelize.STRING,
  	isEmail: true
  },
  password:{
  	type: Sequelize.STRING,
  	len: [5,30]
  },
  groups:{
  	type: Sequelize.ARRAY(Sequelize.STRING)
  },

  salt: Sequelize.STRING

});

const hashPassword = (password,salt) => {
	let hashedPassword = crypto.pbkdf2Sync(password, salt , 1000, 64, 'sha512');
	hashedPassword = hashedPassword.toString('hex');
	console.log(hashedPassword.toString('hex')); 
	return hashedPassword;
}

/*User.beforeCreate((user, options) => {
  user.salt = new Buffer(crypto.randomBytes(16));
  return hashPassword(user.password,user.salt).then(hashedPw => {
    user.password = hashedPw;
  });
});*/


export {User};