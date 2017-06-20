import {User} from '../models/models.js';

const isUnique = (username) => {

	let errors = {}; 

	User.findOne({
		where: {
			userName: username
		}
	}).then(user => {

	  if(user) {
	  	//console.log("user already exists ");
	  	let error = "User already exists";
	  	console.log(error);

	  	return {error};
	  }

	});

	
	
}

export default isUnique;
