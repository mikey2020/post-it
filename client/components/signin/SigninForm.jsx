import React from 'react' ;

import {validateSignIn} from '../../../server/middlewares/validations.js';

import {signin} from '../../actions/signinActions.js';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {addFlashMessage} from '../../actions/flashMessage';



class SigninForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			errors: {},
			isLoading: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);


	}

	isValid(){
		const {errors, isValid} = validateSignIn(this.state);

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
		if(this.isValid()){
			this.setState({errors: {} , isLoading: true});
			this.props.signin(this.state).then(

					(res) => {
						this.context.router.push('/home'),
						this.props.addFlashMessage({
							type: 'success',
							text: 'Sign in successful'
						})
					},

					(err) => this.setState({errors: err.data.errors})
			);
				
		}
	}

	render(){

		const {errors , isLoading , password , username } = this.state;
		return (
			<div className="jumbotron" id="signin">
				<h2> Sign In </h2>

				{errors.form && <div className="alert alert-danger"> {errors.form} </div>}

		        <form onSubmit={this.onSubmit}>
		           <div className="form-group" id="login">
		            	<input 
		            	type="text" 
		            	placeholder = "Username" 
		            	name="username"  
		            	id="usr" 
		            	value={username}
		            	className="form-control"
		            	onChange={this.onChange} />
		            	{errors.username ? <span className="help-block">{errors.username}</span> : <br/>}

		            	<input 
		            	type="password" 
		            	placeholder = "Password" 
		            	name="password" 
		            	className="form-control" 
		            	id="pwd"
		            	value={password}
		            	onChange={this.onChange}/>
		                {errors.password ? <span className="help-block">{errors.password}</span> : <br/>}
		            	<input 
		            	type="submit" 
		            	name="Sign In" 
		            	className="btn btn-primary active" 
		            	value="Sign In"
		            	disabled={isLoading}/>

		           </div>  
		        </form>
		    </div>
		)
	}
}

SigninForm.propTypes = {
	signin: PropTypes.func.isRequired,
	addFlashMessage:  PropTypes.func.isRequired
}

SigninForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null,{signin,addFlashMessage})(SigninForm);


