import {sequelize} from '../db.js';

import {Group,UserGroups,Post} from '../models/models.js';

const createGroup = (req,res) => {
	console.log(req.body);
	console.log(req.session.name);
	if(req.session.name){
		Group.sync({force: false}).then(() => {
	  // Table created
		  return Group.create({
		  	name: req.body.input,
		  	creator: req.session.name,
		  	userId: req.session.userId
		  })
		  .catch((err) => {
			  console.log(err);
			  res.json({ message : "error saving to database"});
			});
		});

		res.json({ message:  req.body.name + ' successfully added' });
	}

	else{
		res.status(401).json({errors: { message: "Please Sign in first"}});
	}
	
	
}

const addUserToGroup = (req,res) => {
	console.log(req.body);
	console.log(req.params.groupId);

	if(req.session.name){
		UserGroups.findOne({
			where: {
				username: req.body.username,
				groupId: req.params.groupId
			}
		})
		.then((user) => {
			if(user){
				res.status(500).json({ errors : { message : req.body.username + " alredy added to group"}});
			}
				
		})
		.catch((err) => {
			  UserGroups.sync({force: false}).then(() => {
	
				  return UserGroups.create({
				  	username: req.body.username,
				  	groupId: req.params.groupId
				  })

				  .catch((err) => {
					  console.log(err);
					  res.json({ message : "error saving to database"});
					});

				});

			   res.json({ message : "user added to group"});

				
		});			
	}

	else{
		res.status(401).json({errors: { message: "Please Sign in first"}});
	}
		
	
}

const postMessageToGroup = (req,res) => {
	console.log(req.body);
	console.log(req.params.groupId);
	if(req.session.name){
		Post.sync({force: false}).then(() => {
	
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
	
	else{
		res.json({ message : "please login first"});
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
			res.json(data);
		})
		.catch((err) => {
			  console.log(err);
			  res.json({ message : "error saving to database"});
		});

	}

	else{
		res.json({ message : "please login first"});
	}
	
}

const checkGroups = (req,res) => {
	Group.findOne({
		where: {
			name: req.params.name
		}
	})
	.then(group => {
		res.json({group})
	});
}

const getUserGroups = (req,res) => {

	Group.findAll({
		where: {
			creator: req.params.username 
		}
	})
	.then(groups => {
		let data = JSON.stringify(groups);
		data = JSON.parse(data);
		console.log(data);
		res.json(data);
	})
	.catch((err) => {
		console.log(err);
	    res.status(500).json({ errors : {message : "error retrieving data from database"}});
	});
}


export {createGroup,addUserToGroup,postMessageToGroup,getPosts,checkGroups,getUserGroups} ;