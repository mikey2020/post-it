import {sequelize} from '../db.js';

import Sequelize from 'sequelize';

const Group = sequelize.define('group', {
  name: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  posts:{
  	type: Sequelize.STRING,
  	
  },
  creator:{
  	type: Sequelize.STRING,
  	len: [5,30]
  },
  members:{
  	type: Sequelize.ARRAY(Sequelize.STRING)
  },

  salt: Sequelize.STRING

});