import {User} from '../models/models.js';

const isUnique = (username) => {

	let errors = {}; 

	User.findOne({
		where: {
			userName: username
		}
	}).then(user => {

	  if(user) {
	  	console.log("user already exists ");
	  	errors.username = "User already exists";
	  }

	});

	if(errors.username){
		return errors;
	}
	
}

export default isUnique;
