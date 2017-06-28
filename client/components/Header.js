import React from 'react';

import {Link} from 'react-router';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

class Header extends React.Component {

	render () {

		return (
		<div>
			<nav className="navbar navbar-inverse" id="my-header">
		      <div className="container-fluid">
		        <div className="navbar-header">
		          <Link to="/home" className="navbar-brand">Post It</Link>
		        </div>
		        <ul className="nav navbar-nav">
		          <li><Link to="/signup">SignUp</Link></li>
		          <li><Link to="/signin">SignIn</Link></li>
		          <li><Link to="/messageboard">Message Board</Link></li>
		        </ul>
		      </div>
		    </nav>
	    </div>
		);

	}


}

Header.propTypes = {

	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth 
	}
}


export default connect(mapStateToProps)(Header);