import {sequelize} from '../db.js';

import {Group,UserGroups,Post} from '../models/userModel.js';

const createGroup = (req,res) => {
	console.log(req.body);
	console.log(req.session.username);
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

const addUserToGroup = (req,res) => {
	console.log(req.body);
	console.log(req.params.groupId);
	UserGroups.sync({force: false}).then(() => {
	  // Table created
	  return UserGroups.create({
	  	userId: req.body.user_id,
	  	groupId: req.params.groupId
	  })
	  .catch((err) => {
		  console.log(err);
		  res.json({ message : "error saving to database"});
		});
	});
	
	res.json({ message : "user added to group"});	
	
}

const postMessageToGroup = (req,res) => {
	console.log(req.body);
	console.log(req.params.groupId);
	Post.sync({force: false}).then(() => {
	  // Table created
	  return Post.create({
	  	post: req.body.message,
	  	groupName: req.body.groupName,
	  	groupId: req.params.groupId
	  })
	  .catch((err) => {
		  console.log(err);
		  res.json({ message : "error saving to database"});
		});
	});

	res.json({ message : "message posted to group"});
	
}

const getPosts = (req,res) => {
	Post.findAll({
		where: {
			groupId: req.params.groupId
		}
	})
	.then((posts) =>{
		let data = JSON.stringify(posts);
		data = JSON.parse(data);
		res.json(data);
	})
	.catch((err) => {
		  console.log(err);
		  res.json({ message : "error saving to database"});
		});

}

export {createGroup,addUserToGroup,postMessageToGroup,getPosts} ;