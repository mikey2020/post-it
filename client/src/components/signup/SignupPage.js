import React from 'react';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';



class SignupPage extends React.Component {
	render(){
		return(
			<div className="container">
				<h1>Sign Up </h1>
                <SignupForm/>
			</div>
		);
	}
}


export default SignupPage;