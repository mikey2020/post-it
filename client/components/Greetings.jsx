import React from 'react';

import {Link} from 'react-router';

class Greetings extends React.Component{
	render(){
		return(
			<div>
				<h1> Welcomes to Post It  </h1>

				<p className=""><Link to="/signup">Join Post It</Link></p>

			</div>
		);
	}
	
}


export default  Greetings ;