import React from 'react';

import {validateUsername} from '../../../server/middlewares/validations';

import {isUserExists } from '../../actions/signupActions';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';

class Group extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
			errors: {},
			invalid: false
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.checkUserIsValid = this.checkUserIsValid.bind(this);

	}

	isValid(){
		const {errors, isValid} = validateUsername(this.state);

		if(!isValid){
			this.setState({errors});
		}

		return isValid;
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.isValid()){

		}
	}

	checkUserIsValid(e){
		const field = e.target.name;
		const value = e.target.value;
		if(value !== ''){
			this.props.isUserExists(value).then(res => {
				let errors = this.state.errors;
				let invalid;
				if(res.data.user){
					errors[field] = '';
					invalid = false;
				}
				else{
					errors[field] = 'Please enter a valid username';
					invalid = true;
				}
				this.setState({errors,invalid});
			});
		}
	}

	render(){
		return (
			<div className="jumbotron">
		         <h2>{this.props.groupName}</h2>
		         <br/>
		         <div className="form-group">
		         	{this.state.errors.username ? <span className="help-block">{this.state.errors.username}</span> : <br/>}
		         	<form onSubmit={this.onSubmit}>
		         		<input 
		         		type="text"
		         		placeholder="Enter Username"
		         		className="form-control"
		         		name="username"
		         		value={this.state.username}
		         		onChange={this.onChange}
		         		onBlur={this.checkUserIsValid}/>
		         		<button className="btn btn-primary" disabled={this.state.invalid}> Add user </button>
		         	</form>
		         </div>
		         <span className="btn btn-primary">Post Message to {this.props.groupName}</span>
		    </div>
		)
	}
}

Group.propTypes = {

	isUserExists: PropTypes.func.isRequired 
}


export default connect(null,{isUserExists})(Group);