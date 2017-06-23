import React from 'react';

class Group extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
			errors: {}
		}
	}

	render(){
		return (
			<div className="jumbotron">
		         <h2>{this.props.groupName}</h2>
		         <br/>
		         <div className="form-group">
		         	<form>
		         		<input 
		         		type="text"
		         		placeholder="Enter Username"
		         		className="form-control"
		         		name="username"
		         		value={this.state.username}/>
		         		<button className="btn btn-primary"> Add user </button>
		         	</form>
		         </div>
		         <span className="btn btn-primary">Post Message to {this.props.groupName}</span>
		    </div>
		)
	}
}


export default Group;