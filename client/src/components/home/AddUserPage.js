import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Validations from '../../../../server/middlewares/validations';

import { addUserToGroup } from '../../actions/groupActions';

import { getUsers } from '../../actions/userActions';

import AllUsers from './AllUsers';

const validate = new Validations();

class AddUserPage extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			username: '',
            results: [],
            isLoading: false,
            errors: {},
            invalid: false
		};

		this.onChange = this.onChange.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });

		if(this.isValid()) {
			this.setState({ errors: {}, isLoading: false});
            this.searchUsers(e);
		}
	}

    searchUsers(e){
        this.setState({ [e.target.name]: e.target.value });
        // const field = e.target.name;
        const value = e.target.value;
        if(value != ''){
            this.props.getUsers({ username: value });
        }
    }
    
    isValid() {
		const { errors, isValid } = validate.input(this.state);

		if(!isValid){
			this.setState({errors, isLoading: true});
		}

		return isValid;
	}

		
	render(){

		const {errors, username, isLoading, invalid, results } = this.state;
        
       
		return (
			  <div id="modal3" className="modal adduserpage">

				{errors.message && <div className="alert alert-danger"> {errors.message} </div>}

				{errors.input ? <span className="help-block">{errors.input}</span> : <br/>}

				<form className="input-field" onSubmit={this.onSubmit}>
					<input 
					type="text" 
					placeholder="Enter username"
					name="username"
					onChange={this.searchUsers}
					className=""
					value={username}
					/>

				</form>

                <AllUsers users={this.props.users} addUserToGroup={this.props.addUserToGroup} />

			</div>
		)
	}
}

AddUserPage.propTypes = {
    addUserToGroup: PropTypes.func.isRequired,
    groupId: PropTypes.number.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return{
        
      users: state.users
    }
}

export default connect(mapStateToProps, { addUserToGroup, getUsers })(AddUserPage);
