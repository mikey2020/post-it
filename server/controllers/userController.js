import {sequelize} from '../db.js';

import {User,hashPassword,bcrypt} from '../models/models.js';

import validator from 'validator' ;

import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
	let errors = {} ;

	if(data.username === null || data.username == ''){
		errors.username = "Username is required";
	}

	if(data.email === null || data.email == '' ){
		errors.email = "Email is required";
	}

	if(!validator.isEmail(data.email)){
		errors.email = "Email is invalid";
	}

	if(data.password === null || data.password == '' ){
		errors.password = "Password is required";
	}

	if(data.passwordConfirmation === null || data.passwordConfirmation == ''){
		errors.passwordConfirmation = "Password Confirmation is required";
	}

	if(!validator.equals(data.password,data.passwordConfirmation)){
		errors.passwordConfirmation = "Passwords do not match";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

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
		res.json({ message:  req.body.username + ' successfully added' });
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
	  	req.session.id = data[0].id;
		res.json({message: req.body.username + " is valid"});
	  }

	  else{

		res.json(data);

	  }
	 
	})

	.catch((err) => {
		console.log(err);
		res.json({message: "Invalid login parameters"});
	})
}

const checkPassword = (password1,password2) => {
	if(password1 == password2){
		return true;
	}
	else{
		return false;
	}
}

export {signup,allUsers,signin} ;