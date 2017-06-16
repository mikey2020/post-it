import React from 'react';


class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: ''
		}

		this.onChange = this.onChange.bind(this);
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	render(){

		return(
	    	<div className= "jumbotron" id="signup-body">
	          <form>
	              <div className="form-group" id="">
	              <p  id="signup-header">Sign Up here</p>
	            	<br/>
	            	<input 
	            	    value={this.state.username}
	            	    onChange={this.onChange}
	            		type="text" 
	            		placeholder = "username" 
	            		name="username" 
	            		className="form-control" 
	            		id="usr" />
	            		<br/>
	            	<input 
	            		type="email" 
	            		placeholder = "email" 
	            		name="email" 
	            		className="form-control" 
	            		id="usr" />
	            		<br/>
	            		
	            	<input 
	            		type="password" 
	            		placeholder = "password" 
	            		name="password" 
	            		className="form-control" 
	            		id="pwd"/>
	            		<br/>
	            	<input 
	            		type="submit" 
	            		name="sign up" 
	            		value="Sign Up" 
	            		className="btn btn-primary active"/>

	               </div>  
	          </form>
	      </div>
   
		);
	}
}

export default SignupForm ;


/*<div className= "jumbotron" id="signup-body">
	          <form>
	              <div className="form-group" id="">
	              <p  id="signup-header">Sign Up here</p>
	            	<br/>
	            	<input 
	            		type="text" 
	            		placeholder = "username" 
	            		name="username" 
	            		className="form-control" 
	            		id="usr" />
	            		<br/>
	            	<input 
	            		type="email" 
	            		placeholder = "email" 
	            		name="email" 
	            		className="form-control" 
	            		id="usr" />
	            		
	            	<input 
	            		type="password" 
	            		placeholder = "password" 
	            		name="password" 
	            		className="form-control" 
	            		id="pwd"/>
	            		
	            	<input 
	            		type="submit" 
	            		name="sign up" 
	            		value="Sign Up" 
	            		className="btn btn-primary active"/>

	               </div>  
	          </form>
	      </div>*/