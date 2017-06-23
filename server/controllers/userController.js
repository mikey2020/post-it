import {sequelize} from '../db.js';

import {User,hashPassword,bcrypt} from '../models/models.js';

const signup = (req,res) =>{

	// force: true will drop the table if it already exists
	User.sync({force: false}).then(() => {
	  // Table created
	  return User.create({
		userName: req.body.username,
		email: req.body.email,
		password: req.body.password
	  })
	  .catch((err) => {
		  console.log(err);
		  res.json({ message : "error saving to database"});
		});
	});
	res.json({ message:  req.body.username + ' successfully added' });
}

const allUsers = (req,res) => {
	User.findAll({}).then((data) => {
		console.log(JSON.stringify(data));
		res.json(data);
	}).catch((err) => {
		console.log(err);
		res.json({message : "Error occured please try again"})
	});
}


const signin = (req,res) => {
	console.log(req.body);
	
	req.session.username = req.body.username;

	User.findAll({
		where: {
			userName: req.body.username
		}
	})
	.then((user) => {

	   let data = JSON.stringify(user);

	   data = JSON.parse(data);

	  console.log(data[0].password);

	  if(bcrypt.compareSync(req.body.password, data[0].password) === true){

	  	req.session.name = req.body.username ;
	  	req.session.userId = data[0].id;
		res.json({message: req.body.username + " is valid"});
	  }

	  else{

		res.status(404).json({ errors: { message: req.body.username + " is not valid"} });

	  }
	 
	})

	.catch((err) => {
		console.log(err);
		res.status(404).json({ errors: { message: "Invalid login parameters"} });
	})
}

export {signup,allUsers,signin} ;