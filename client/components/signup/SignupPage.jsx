import React from 'react';
import SignupForm from './SignupForm.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {userSignupRequest} from '../../actions/signupActions';

import addFlashMessage from '../../actions/flashMessage';


class SignupPage extends React.Component {
	render(){
		const {userSignupRequest,addFlashMessage} = this.props;
		return(
			<div className="container">
				<h1>Sign Up Page</h1>
				<SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
			</div>
		);
	}
}


SignupPage.propTypes ={

	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
}




export default connect((state) => {return {} } ,{userSignupRequest,addFlashMessage}) (SignupPage);
//