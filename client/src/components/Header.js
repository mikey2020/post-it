import React from 'react';

import {Link} from 'react-router';

import SigninForm from './signin/SigninForm';

export default () => {
	return (
		<div className="row">
					<nav>
					<div className="nav-wrapper red darken-4">
						<Link to="/" className="flow-text">postIT</Link>
						<ul className="right">
							<a className="waves-effect waves-light btn modal-trigger" href="#modal1">Sign In</a>
							<li className="flow-text"><Link to="/signup">Sign Up</Link></li>
						</ul>
					</div>
				</nav>
				<SigninForm />
        </div>
	);
}




