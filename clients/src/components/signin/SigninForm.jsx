import React from 'react' ;

import Validations from '../../validations.js';

import {signin,setUser} from '../../actions/signinActions.js';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {addFlashMessage} from '../../actions/flashMessage';


const validate = new Validations();


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
		const {errors, isValid} = validate.signin(this.state);

		if(!isValid){
			this.setState({errors});
			this.setState({ isLoading: true});
		}

		return isValid;
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
		this.setState({ isLoading: false});
	}

	onSubmit(e){
		e.preventDefault();
		if(this.isValid()){
			this.setState({errors: {} , isLoading: true});
			this.props.signin(this.state).then(

					(res) => {
						this.props.setUser(res.data.user)
						this.context.router.push('/home')
						this.props.addFlashMessage({
							type: 'success',
							text: ' Sign in successful'
						});
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

				{errors.username ? <span className="help-block">{errors.username}</span> : <br/>}
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
		            	
		            	{errors.password ? <span className="help-block">{errors.password}</span> : <br/>}
		            	<input 
		            	type="password" 
		            	placeholder = "Password" 
		            	name="password" 
		            	className="form-control" 
		            	id="pwd"
		            	value={password}
		            	onChange={this.onChange}/>
		                <br/>

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
	setUser: PropTypes.func.isRequired,
	addFlashMessage:  PropTypes.func.isRequired
}

SigninForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null,{signin,addFlashMessage,setUser})(SigninForm);


