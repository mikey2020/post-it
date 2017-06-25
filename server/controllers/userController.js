import {sequelize} from '../db.js';

import {User,hashPassword,bcrypt} from '../models/models.js';

import {validateInput} from '../middlewares/validations.js';



const signup = (req,res) =>{

	const {errors,isValid} = validateInput(req.body);


	if(!isValid){
		res.status(400).json(errors);
	}

	else{
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

		res.json({  message:  req.body.username + ' successfully added' });
	}
	
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
	
	req.session.username = req.body.username;

	User.findAll({
		where: {
			userName: req.body.username
		}
	})
	.then((user) => {

	   let data = JSON.stringify(user);

	   data = JSON.parse(data);


	  if(bcrypt.compareSync(req.body.password, data[0].password) === true){

	  	console.log(data[0].id);
	  	req.session.name = req.body.username ;
	  	req.session.userId = data[0].id;

		res.json({ user: { name: req.body.username , message:  req.body.username + ' signed in' } });

	  }

	  else{

		res.status(401).json({errors: { form: "Invalid Signin Parameters"}});

	  }
	 
	})

	.catch((err) => {
		console.log(err);
		res.status(404).json({ errors: { message: "Invalid login parameters"} });
	})
}


const isUnique = (req,res) => {
	console.log(req.params.name);
	User.findOne({
	  where: {
	   userName: req.params.name
	  }
	}).then((user) => {
		res.json({user});
	});
}

export {signup,allUsers,signin,isUnique} ;

