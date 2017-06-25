import {sequelize} from '../db.js';

import {Group,UserGroups,Post} from '../models/models.js';

const createGroup = (req,res) => {
	console.log(req.body);
	console.log(req.session.name);
	if(req.session.name){
		Group.sync({force: false}).then(() => {
	  // Table created
		  return Group.create({
		  	name: req.body.name,
		  	creator: req.session.name,
		  	userId: req.session.userId
		  })
		  .catch((err) => {
			  console.log(err);
			  res.status(500).json({ message : "error saving to database"});
			});
		});

		res.json({ message:  req.body.name + ' successfully created' });
	}

	else{
		res.status(401).json({ error: { message : "You are not allowed to create a group , please login first" } });
	}
	
	
}

const addUserToGroup = (req,res) => {
	console.log(req.session.name);
	console.log(req.body);
	console.log(req.params.groupId);
	if(req.session.name){
		UserGroups.sync({force: false}).then(() => {
	  // Table created
		  return UserGroups.create({
		  	username: req.body.username,
		  	groupId: req.params.groupId
		  })
		  .catch((err) => {
			  console.log(err);
			  res.status(500).json({ message : "error saving to database"});
			});
		});

		res.json({ message : "user added to group"});
	}
	
	else{
		res.status(401).json({ error: { message : "please login first"}});
	}
		
	
}

const postMessageToGroup = (req,res) => {
	console.log(req.body);
	console.log(req.params.groupId);
	if(req.session.name){
		Post.sync({force: false}).then(() => {
	  // Table created
		  return Post.create({
		  	post: req.body.message,
		  	groupId: req.params.groupId
		  })
		  .catch((err) => {
			  console.log(err);
			  res.status(500).json({ error: { message : "error saving to database"}});
			});
		});

		res.json({ message : "message posted to group"});
	}
	
	else{
		res.status(401).json({ error: { message : "please login first"}});
	}
	
}

const getPosts = (req,res) => {
	if(req.session.name){
		Post.findAll({
		where: {
			groupId: req.params.groupId
		}
		})
		.then((posts) =>{
			let data = JSON.stringify(posts);
			data = JSON.parse(data);
			res.json( { posts: data });
		})
		.catch((err) => {
			  console.log(err);
			  res.json({ message : "error saving to database"});
		});

	}

	else{
		res.status(401).json({ message : "please login first"});
	}
	
}

export {createGroup,addUserToGroup,postMessageToGroup,getPosts} ;