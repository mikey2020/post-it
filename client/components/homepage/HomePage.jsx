import React from 'react' ;

import CreateGroup from './CreateGroup.jsx';

class HomePage extends React.Component {
	render(){
		return (
			<div className="container">
				<h1>Welcome User</h1>
				<CreateGroup/>
			</div>
		)
	}
}


export default HomePage;