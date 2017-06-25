import React from 'react' ;
import {validateCreateGroupInput} from '../../../server/middlewares/validations.js';

import {groupExists,createGroup} from '../../actions/createGroupActions';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import {addFlashMessage} from '../../actions/flashMessage';

class CreateGroup extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			input: '',
			errors: {},
			isLoading: false,
			invalid: false
		}	;

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.checkGroupExists = this.checkGroupExists.bind(this);
	}

	isValid(){
		const {errors, isValid} = validateCreateGroupInput(this.state);

		if(!isValid){
			this.setState({errors, isLoading: true});
		}

		return isValid;
	}

	checkGroupExists(e){
		const field = e.target.name;
		const value = e.target.value;
		if(value !== ''){
			this.props.groupExists(value).then(res => {
				let errors = this.state.errors;
				let invalid;
				if(res.data.group){
					errors[field] = 'Group already exists';
					invalid = true;
				}
				else{
					errors[field] = '';
					invalid = false;
				}
				this.setState({errors,invalid});
			});
		}
	}


	onChange(e){
		this.setState({[e.target.name]: e.target.value});

		if(this.isValid()){
			this.setState({errors: {}, isLoading: false});
		}
	}

	onSubmit(e){
		e.preventDefault();

		if(this.isValid()){
			this.setState({errors: {}, isLoading: false});

			this.props.createGroup(this.state).then(

				(res) => {
					this.props.addFlashMessage({
							type: 'success',
							text: this.state.input + ' group created successfully'
				    })
				},

				(err) => {
					this.context.router.push('/signin'),
					this.props.addFlashMessage({
							type: 'error',
							text: 'Please Sign in'
				    })
					//this.setState({errors: err.data.errors});
				}

			);
		}
	}
		
	render(){
		const {errors , input ,isLoading , invalid} = this.state;
		return (
			<div>
				{errors.message && <div className="alert alert-danger"> {errors.message} </div>}
				{errors.input ? <span className="help-block">{errors.input}</span> : <br/>}
				<form className="form-group" onSubmit={this.onSubmit}>
					<input 
					type="text" 
					placeholder="Create a group"
					name="input"
					onBlur={this.checkGroupExists}
					onChange={this.onChange}
					className="form-control"
					value={input}
					id="usr"
					/>

					<input type="submit" className="btn btn-primary active" value="Create Group" disabled={isLoading || invalid}/>


				</form>
			</div>
		)
	}
}

CreateGroup.propTypes = {
	groupExists:  PropTypes.func,
	createGroup: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired

}

CreateGroup.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null,{groupExists,createGroup,addFlashMessage})(CreateGroup);