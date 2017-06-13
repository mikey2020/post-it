import {sequelize} from '../db.js';

import {User,hashPassword} from '../models/userModel.js';

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
	});
}

//not finished with signin route
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

	  let tempPass = hashPassword(req.body.password,data[0].salt);
	  
	  console.log(tempPass);

	  if(checkPassword(data[0].password,tempPass) === true){

	  	res.json({message: req.body.username + " is valid"});
	  }

	  else{
	  	res.json(data);
	  	//res.json({message: "user is not valid"});
	  }
	  //console.log(tempPass);
	  //res.json(data);
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

export {home,signup,allUsers,signin} ;