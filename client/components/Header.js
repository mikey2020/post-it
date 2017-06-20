import React from 'react';

import {Link} from 'react-router';

export default () => {
	return (
		<nav className="navbar navbar-inverse" id="my-header">
	      <div className="container-fluid">
	        <div className="navbar-header">
	          <Link to="/" className="navbar-brand">Post It</Link>
	        </div>
	        <ul className="nav navbar-nav">
	          <li><Link to="/signup">SignUp</Link></li>
	          <li><Link to="/signin">SignIn</Link></li>
	        </ul>
	      </div>
	    </nav>
	);
}