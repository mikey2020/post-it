import React from 'react';

class GroupMessages extends React.Component {

	render() {

		const groupMessages = this.props.messages.map(message => <li className="well well-lg" >{message.post}</li> );

		return (

			
		    <div className="jumbotron">
		    	<h2>{this.props.name} </h2>
		    	{groupMessages}
		    	<li className="well well-lg">{this.props.newPost}</li>
		    </div>

		)
	}

}




export default GroupMessages ;