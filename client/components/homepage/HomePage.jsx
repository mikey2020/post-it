import React from 'react' ;

import CreateGroup from './CreateGroup.jsx';

import UserGroups from './UserGroups.jsx';

import {connect}  from 'react-redux';

import PropTypes from 'prop-types';

class HomePage extends React.Component {
	render(){
		
		const username = this.props.username ;

		return (
			<div className="container">
				<h1>Welcome {username}</h1>
				<CreateGroup/>
				<UserGroups/>
			</div>
		)
	}
}

const mapStateToProps = state => {

	return{
		username: state.auth.user.name
	}
}

HomePage.propTypes = {
	username: PropTypes.string
}
export default connect(mapStateToProps)(HomePage);