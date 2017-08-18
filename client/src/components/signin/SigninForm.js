 import React from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router';
 import PropTypes from 'prop-types';
 import { validateUser, validateToken } from '../../actions/signinActions';
 import Validations from '../../../validations';
 import { addFlashMessage } from '../../actions/flashMessageActions';
 import GoogleLogin from 'react-google-login';


 const validate = new Validations();
 const responseGoogle = (response) => {
   console.log(response);
   if (response) {
     validateToken(response);
   }
 };
 /**
 *  SigninForm class component
 * @class
 */
 export class SigninForm extends React.Component {
   /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
   constructor(props) {
     super(props);
     this.state = {
       username: '',
       password: '',
       errors: {}
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   /**
   * @param {object} e - argument
   * @returns {void}
   */
   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }

   /**
   * @param {object} e - argument
   * @returns {void}
   */
   onSubmit(e) {
     e.preventDefault();
     if (this.isValid()) {
       this.setState({ errors: {}, isLoading: true });
       this.props.validateUser(this.state).then(() => {
         this.context.router.push('/home');
       });
     }
   }
   /**
   * @param {object} e - argument
   * @returns {void}
   */
   isValid() {
     const { errors, isValid } = validate.signin(this.state);

     if (!isValid) {
       this.setState({ errors });
     }

     return isValid;
   }

  /**
   *
   * @returns {component} - renders a React component
   */
   render() {
     return (
       <div id="modal1" className="modal signin-container">
         <div className="signin-form">
           <h3> Sign In </h3>
           {this.state.errors.form &&
           <div className="alert alert-danger"> {this.state.errors.form} </div>}
           <form onSubmit={this.onSubmit}>
             {this.state.errors.username ?
               <span className="help-block">{this.state.errors.username}</span> : <br />}
             <input
               type="text"
               value={this.state.username}
               onChange={this.onChange}
               placeholder="username"
               name="username"
               className=""
             />

             {this.state.errors.password ?
               <span className="help-block">{this.state.errors.password}</span> : <br />}
             <input
               type="password"
               value={this.state.password}
               onChange={this.onChange}
               placeholder="password"
               name="password"
               className=""
             />
             <input
               type="submit"
               name="signin"
               value="Sign In"
               id="sign-in"
               className="modal-action modal-close btn waves-effect waves-light grey darken-4"
             />
           </form>
           <br />
           <span><Link to="/reset" > Forgot password? </Link></span>
           <br />
           <span>
             <GoogleLogin
               clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
               buttonText="Sign Up with Google"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               uxMode={'popup'}
             />
           </span>
         </div>
       </div>
     );
   }
 }

 SigninForm.propTypes = {
   validateUser: PropTypes.func.isRequired
 };

 SigninForm.contextTypes = {
   router: PropTypes.object.isRequired
 };

 export default connect(null, { validateUser, addFlashMessage })(SigninForm);
