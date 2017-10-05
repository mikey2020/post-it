 import React from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router';
 import PropTypes from 'prop-types';

 import { validateUser } from '../../actions/signinActions';
 import Validations from '../../../Validations';
 import { addFlashMessage } from '../../actions/flashMessageActions';
 import { checkUserExists } from '../../actions/userActions';


 const validate = new Validations();
 /**
 *  SigninForm class component
 * @class
 */
 export class SigninForm extends React.Component {
   /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
   constructor(props) {
     super(props);
     this.state = {
       username: '',
       password: '',
       errors: {},
       invalid: true
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
     this.onBlur = this.onBlur.bind(this);
   }

   /**
   * @param {object} event - argument
   *
   * @returns {void}
   */
   onChange(event) {
     this.setState({ [event.target.name]: event.target.value,
       invalid: false,
       errors: {} });
   }
   /**
   * @param {object} event - argument
   *
   * @returns {void}
   */
   onSubmit(event) {
     event.preventDefault();
     if (this.isValid()) {
       this.setState({ errors: {}, isLoading: true });
       this.props.validateUser(this.state).then((res) => {
         if (res.data.message && res.data.userToken) {
           this.context.router.push('/home');
           this.setState({ errors: {}, username: '', password: '' });
           $('#modal1').modal('close');
         }
       });
     }
   }
   /**
    * @description - It calls a function,
    *  that checks if user exists in the database
    * @param {Object} event
    *
    * @returns {void}
    */
   onBlur(event) {
     const field = event.target.name;
     const value = event.target.value;
     if (value !== '') {
       checkUserExists({ username: value }).then((res) => {
         const errors = this.state.errors;
         let invalid;
         if (res.data.user) {
           invalid = false;
         } else {
           errors[field] = 'Invalid user, Please sign up';
           invalid = true;
         }
         this.setState({ errors, invalid });
       });
     }
   }
  /**
   * @returns {void}
   */
   isValid() {
     const { errors, isValid } = validate.signIn(this.state);
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
     const { errors, username } = this.state;
     return (
       <div id="modal1" className="modal signin-container">
         <div className="signin-form">
           <div className="center">
             <h3> Sign In </h3>
           </div>
           {errors.form &&
           <div className="alert alert-danger"> {errors.form} </div>}
           <div className="col s12">
             <form onSubmit={this.onSubmit}>
               {errors.username ?
                 <span className="help-block red darken-4">
                   {errors.username}</span> : <br />}
               <div className="row">
                 <div className="col s12">
                   <input
                     type="text"
                     value={username}
                     onChange={this.onChange}
                     onBlur={this.onBlur}
                     placeholder="username"
                     name="username"
                     className="username"
                   />
                 </div>
               </div>
               <div className="row">
                 <div className="col s12">
                   {errors.password ?
                     <span className="help-block">
                       {errors.password}</span> : <br />}
                   <input
                     type="password"
                     value={this.state.password}
                     onChange={this.onChange}
                     placeholder="password"
                     name="password"
                     className="password"
                   />
                 </div>
               </div>
               <div className="row">
                 <div className="center">
                   <input
                     type="submit"
                     name="signin"
                     value="Sign In"
                     id="sign-in"
                     disabled={this.state.invalid}
                     className="modal-action btn waves-effect waves-light light-blue"
                   />
                 </div>
               </div>
             </form>
           </div>
           <br />
           <span className="left">
             <Link
               to="/reset"
               className="forgot"
             > Forgot password? </Link></span>
           <br />
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


 export default connect(null, {
   validateUser, addFlashMessage })(SigninForm);
