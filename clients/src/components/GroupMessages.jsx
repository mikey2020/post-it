import React from 'react';

class GroupMessages extends React.Component {

	render() {

		const groupMessages = this.props.messages.map(message =>   

			<div>

				<li className="well well-lg" key={message.id} > {message.post}</li> 

			</div>

		);

		return (

			
		    <div className="jumbotron">
		    	<h2>{this.props.name} </h2>
		    	{groupMessages}
		    	{this.props.newPost ? <li className="well well-lg">{this.props.newPost}</li> : <br/>}
		    </div>

		)
	}

}




export default GroupMessages ;