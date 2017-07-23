 import React from 'react';

 import {connect} from 'react-redux';

 import PropTypes from 'prop-types';

 import {validateUser,setUser} from '../../actions/signinActions';

import Validations from '../../../../server/middlewares/validations.js';

import {addFlashMessage} from '../../actions/flashMessageActions';

const validate = new Validations();
 

 class SigninForm extends React.Component{
     constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
            errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

    isValid(){

		const {errors,isValid} = validate.signin(this.state);

		if(!isValid){
			this.setState({errors});
            
		}

		return isValid;

	}

    onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e){
		e.preventDefault();
		if(this.isValid()){
			this.setState({errors: {} , isLoading: true});
			this.props.validateUser(this.state).then(

					(res) => {
						console.log(res.data.user)
                        this.props.setUser(res.data.user),
						this.context.router.push('/'),
						this.props.addFlashMessage({
							type: 'success',
							text: res.data.user.message
						});
					},

					(err) => this.setState({errors: err.data.errors})
			);	
		}
        
	}

     render(){
         return(
             <div id="modal1" className="modal">
                 <div className="jumbotron container-fluid signin-form">
                  <div className="signin-form1">
                  <h3> Sign In </h3>
                  
                  {this.state.errors.form && <div className="alert alert-danger"> {this.state.errors.form} </div>}

				  

                  <form onSubmit={this.onSubmit}>

                  {this.state.errors.username ? <span className="help-block">{this.state.errors.username}</span> : <br/>}
                  <input 
	            		type="text"
                        value={this.state.username}
                        onChange={this.onChange}
	            		placeholder = "username" 
	            		name="username" 
	            		className="" 
	            		/>

                  {this.state.errors.password ? <span className="help-block">{this.state.errors.password}</span> : <br/>}
                  <input 
	            		type="text" 
                        value={this.state.password}
                        onChange={this.onChange}
	            		placeholder = "password" 
	            		name="password" 
	            		className="" 
	            		/>
                  <input 
	            		type="submit" 
	            		name="signin" 
	            		value="Sign In" 
	            		className="btn waves-effect waves-light red darken-4"
                        />
                  </form>
                  </div>
                  </div>
            </div>
            
         )
     }
 }

 SigninForm.propTypes = {
     validateUser: PropTypes.func.isRequired,
	 setUser: PropTypes.func.isRequired,
	 addFlashMessage: PropTypes.func.isRequired
 }

 SigninForm.contextTypes = {
	router: PropTypes.object.isRequired
}


 export default connect(null,{validateUser,setUser,addFlashMessage})(SigninForm);
 