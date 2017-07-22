import React from 'react';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';

class SignupPage extends React.Component {
	render(){
		return(
			<div className="container">
                <SignupForm/>
			</div>
		);
	}
}

export default SignupPage;