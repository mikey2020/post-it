import {sequelize} from '../db';

import {Group,UserGroups,Post} from '../models/models';


class GroupActions {

	//Method for creating new group
	createGroup(req,res){
	
		if(req.session.name){
			Group.sync({force: false}).then(() => {
		 
			  return Group.create({
			  	name: req.body.input,
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

			res.status(401).json({errors: { message: "Please Sign in first"}});

		}
	
	
	}

	addUserToGroup(req,res){
	
		if(req.session.name){

			UserGroups.findOne({
				where: {
					username: req.body.username,
					groupId: req.params.groupId
				}
			})
			.then((user) => {

				if(user){
					res.status(500).json({ errors : { message : req.body.username + " already added to group"}});
				}

				else{

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
				}
					
			})		
		}

		else{

			res.status(401).json({errors: { message: "Please Sign in first"}});

		}
			
	}

	postMessageToGroup(req,res){
	
		if(req.session.name){
			Post.sync({force: false}).then(() => {
		
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

	getPosts(req,res){

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

	checkGroups(req,res){

		Group.findOne({
			where: {
				name: req.params.name
			}
		})
		.then(group => {
			res.json({group})
		});

	}

	getUserGroups(req,res){

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
		    res.status(500).json({ errors : {message : "error retrieving data from database"}})
		});

	}


}



export default GroupActions;
//export {createGroup,addUserToGroup,postMessageToGroup,getPosts,checkGroups,getUserGroups} ;