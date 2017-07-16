import React from 'react';

import {Link} from 'react-router';

export default () => {
	return (
		<div className="row">
					<nav>
					<div className="nav-wrapper red darken-4">
						<Link to="/" className="brand-logo">POST IT</Link>
						<ul className="right hide-on-med-and-down">
							<li><Link to="/signup">Signup</Link></li>
						</ul>
					</div>
				</nav>
        </div>
	);
}

