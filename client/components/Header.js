import React from 'react';

export default () => {
	return (
		<nav className="navbar navbar-inverse" id="my-header">
	      <div className="container-fluid">
	        <div className="navbar-header">
	          <a className="navbar-brand" href="#">Post It</a>
	        </div>
	        <ul className="nav navbar-nav">
	          <li className="active"><a href="#">Home</a></li>
	          <li><a href="#"> login</a></li>
	        </ul>
	      </div>
	    </nav>
	);
}