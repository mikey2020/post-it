import {sequelize} from '../db.js';

import {Group} from '../models/userModel.js';

const createGroup = (req,res) => {
	console.log(req.body);
	Group.sync({force: false}).then(() => {
	  // Table created
	  return Group.create({
	  	name: req.body.name,
	  	creator: req.body.creator,
	  	userId: req.body.user_id
	  })
	  .catch((err) => {
		  console.log(err);
		  res.json({ message : "error saving to database"});
		});
	});
	res.json({ message:  req.body.name + ' successfully added' });
}

export {createGroup} ;