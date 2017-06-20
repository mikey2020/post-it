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

const validateSignIn = (data) => {
	let errors = {} ;

	if(data.username === null || data.username == ''){
		errors.username = "Username is required";
	}

	if(data.password === null || data.password == '' ){
		errors.password = "Password is required";
	}

	return {
		errors,
		
		isValid: isEmpty(errors)
	}
}


export {validateInput,validateSignIn};