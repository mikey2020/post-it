import React from 'react';

import PropTypes from 'prop-types';

import {userSignupRequest} from '../../actions/signupActions';

import classnames from 'classnames';

import {validateInput} from '../../../server/middlewares/validations.js';

import addFlashMessage from '../../actions/flashMessage';

class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
			isLoading: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	isValid(){

		const {errors,isValid} = validateInput(this.state);

		if(!isValid){
			this.setState({errors});
		}

		return isValid;

	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e){

		//if(this.isValid()){
			this.setState({errors: {} , isLoading: true});

			e.preventDefault();

			this.props.userSignupRequest(this.state).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Signed up successfully'
					})
					this.context.router.push('/')
				},

				({data}) => this.setState({errors: data})
			);
		//}
		
	}

	render(){
		const {errors} = this.state ;
		return(
	    	<div className= "jumbotron" id="signup-body">
	          <form onSubmit={this.onSubmit}>
	              <div className="form-group">
	              <p  id="signup-header">Sign Up here</p>
	            	<br/>
	            	<input 
	            	    value={this.state.username}
	            	    onChange={this.onChange}
	            		type="text" 
	            		placeholder = "username" 
	            		name="username" 
	            		className="form-control" 
	            		id="usr" />
	 
	            		{errors.username ? <span className="help-block">{errors.username}</span> : <br/>}
	            		
	            	<input 
	            		value={this.state.email}
	            	    onChange={this.onChange}
	            		type="email" 
	            		placeholder = "email" 
	            		name="email" 
	            		className="form-control" 
	            		id="usr" />
	            		
	            		{errors.email ? <span className="help-block">{errors.email}</span> : <br/>}
	            		
	            	<input 
	            		value={this.state.password}
	            	    onChange={this.onChange}
	            		type="password" 
	            		placeholder = "password" 
	            		name="password" 
	            		className="form-control" 
	            		id="pwd"/>
	            		
	            		{ errors.password ? <span className="help-block">{errors.password}</span> : <br/>}

	            	<input 
	            		value={this.state.passwordConfirmation}
	            	    onChange={this.onChange}
	            		type="password" 
	            		placeholder = " Confirm password" 
	            		name="passwordConfirmation" 
	            		className="form-control" 
	            		id="pwd"/>
	            		
	            		{errors.passwordConfirmation ? <span className="help-block">{errors.passwordConfirmation}</span> : <br/>}

	            	<input 
	            		disabled={this.state.isLoading}
	            		type="submit" 
	            		name="sign up" 
	            		value="Sign Up" 
	            		className="btn btn-primary active"/>

	               </div>  
	          </form>
	      </div>
   
		);
	}
}

SignupForm.propTypes ={

	userSignupRequest:  PropTypes.func.isRequired,
	addFlashMessage:  PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default SignupForm ;


