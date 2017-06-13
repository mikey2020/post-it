import {sequelize} from '../db.js';

import Sequelize from 'sequelize';

import {User} from './userModel.js'

const Group = sequelize.define('group', {
  name: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  creator:{
  	type: Sequelize.STRING
  },
});

//User.hasMany(Group, {as: 'groups'});
//User.hasMany(Group,{foreignKey: 'user_name', sourceKey: 'userName'});
Group.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});

export {Group} ;