import React from 'react';

import PropTypes from 'prop-types';

import {userSignupRequest} from '../../actions/signupActions';

class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e){
		e.preventDefault();

		this.props.userSignupRequest({"username": this.state.username ,"email":this.state.email ,"password":this.state.password}).then(
			() => {},

			({data}) => this.setState({errors: data})

		);
		
	}
	render(){

		return(
	    	<div className= "jumbotron" id="signup-body">
	          <form onSubmit={this.onSubmit}>
	              <div className="form-group" id="">
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
	            		<br/>
	            	<input 
	            		value={this.state.email}
	            	    onChange={this.onChange}
	            		type="email" 
	            		placeholder = "email" 
	            		name="email" 
	            		className="form-control" 
	            		id="usr" />
	            		<br/>
	            		
	            	<input 
	            		value={this.state.password}
	            	    onChange={this.onChange}
	            		type="password" 
	            		placeholder = "password" 
	            		name="password" 
	            		className="form-control" 
	            		id="pwd"/>
	            		<br/>
	            	<input 
	            		value={this.state.passwordConfirmation}
	            	    onChange={this.onChange}
	            		type="password" 
	            		placeholder = " Confirm password" 
	            		name="passwordConfirmation" 
	            		className="form-control" 
	            		id="pwd"/>
	            		<br/>
	            	<input 
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

	userSignupRequest:  PropTypes.func.isRequired
}

export default SignupForm ;


