import React from 'react';

import PropTypes from 'prop-types';

import { addUser } from '../../actions/signupActions';

import classnames from 'classnames';

import Validations from '../../../../server/middlewares/validations.js';

import { connect } from 'react-redux';

import { addFlashMessage } from '../../actions/flashMessageActions';

const validate = new Validations();

/**
 *  SignupForm class component
 * @class
 */
class SignupForm extends React.Component {
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

		const {errors,isValid} = validate.signup(this.state);

		if(!isValid){
			this.setState({errors});
		}

		return isValid;

	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e){

			e.preventDefault();

			this.props.addUser(this.state).then(
				(res) => {
					if(res.data.message){
                       this.props.addFlashMessage({
						type: 'success',
						text: res.data.message
					   })
					} else {
                        this.props.addFlashMessage({
						type: 'error',
						text: res.data.errors.message
					   })
					   //this.setState({errors: {} , isLoading: true});
					}
					

					this.context.router.push('/')
				},
                

				({data}) => this.setState({errors: data})
			);
		
		
	}

	render(){
		const {errors} = this.state ;
		return(
	    	<div className= "" id="signup-body">
	          <form onSubmit={this.onSubmit}>
	              <div className="jumbotron signup-form">
	              <p  id="signup-header" className="flow-text">Sign Up here</p>
	            	{errors.username ? <span className="help-block">{errors.username}</span> : <br/>}
	            	<input 
	            	    value={this.state.username}
	            	    onChange={this.onChange}
	            		type="text" 
	            		placeholder = "username" 
	            		name="username" 
	            		className="" 
	            		/>
                
				    {errors.email ? <span className="help-block">{errors.email}</span> : <br/>}  
	            		
	            	<input 
	            		value={this.state.email}
	            	    onChange={this.onChange}
	            		type="email" 
	            		placeholder = "email" 
	            		name="email" 
	            		className="" 
	            		id="usr" />
	            		
	            	{ errors.password ? <span className="help-block">{errors.password}</span> : <br/>}	
	            		
	            	<input 
	            		value={this.state.password}
	            	    onChange={this.onChange}
	            		type="password" 
	            		placeholder = "password" 
	            		name="password" 
	            		className="" 
	            		id="pwd"/>
	            		
	            	{errors.passwordConfirmation ? <span className="help-block">{errors.passwordConfirmation}</span> : <br/>}

	            	<input 
	            		value={this.state.passwordConfirmation}
	            	    onChange={this.onChange}
	            		type="password" 
	            		placeholder = " Confirm password" 
	            		name="passwordConfirmation" 
	            		className="" 
	            		id="pwd"/>
	            		
	            		

	            	<input 
	            		disabled={this.state.isLoading}
	            		type="submit" 
	            		name="sign up" 
	            		value="Sign Up" 
	            		className="btn waves-effect waves-light red darken-4"/>

	               </div>  
	          </form>
	      </div>
   
		);
	}
}

SignupForm.propTypes = {
   addFlashMessage: PropTypes.func.isRequired,
   addUser: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null,{addUser,addFlashMessage})(SignupForm) ;