import {sequelize} from '../db.js';

import {User} from '../models/userModel.js'

const getErrorMessage = (err) => {  
  let message = '';
  if (err.code) {    
    switch (err.code) {      
      case 11000:
      message = "Email has  been used"   ;
      break;   
      case 11001:        
      message = 'Username already exists';        
      break;      
      default:       
      message = 'Something went wrong';    
    }  
  } 
  else {    
    for (let errName in err.errors) {      
      if (err.errors[errName].message) 
        message = err.errors[errName]. message;    
    }  
  }
  return message; 
};


const home = (req,res) => {
	res.send("welcome home");
}

const signup = (req,res) =>{
	console.log(req.body);
	// force: true will drop the table if it already exists
	User.sync({force: true}).then(() => {
	  // Table created
	  return User.create({
	  	userName: req.body.username,
	  	email: req.body.email,
	  	password: req.body.password
	  })
	  .catch((err) => {
		  console.log(err);
		  res.send(getErrorMessage(err));
		});
	 
	});
}

const allUsers = (req,res) => {
	User.findAll({}).then((data) => {
	    console.log(JSON.stringify(data));
	    res.json(data);
	}).catch((err) => {
	    console.log(err);
	});
}

export {home,signup,allUsers} ;