 import React from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router';
 import PropTypes from 'prop-types';
 import { validateUser, validateGoogleUser } from '../../actions/signinActions';
 import Validations from '../../../validations';
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
   * @returns {void}
   */
   onChange(event) {
     this.setState({ [event.target.name]: event.target.value, invalid: false, errors: {} });
   }
   /**
   * @param {object} event - argument
   * @returns {void}
   */
   onSubmit(event) {
     event.preventDefault();
     if (this.isValid()) {
       this.setState({ errors: {}, isLoading: true });
       this.props.validateUser(this.state).then(() => {
         this.context.router.push('/home');
         this.setState({ errors: {}, username: '', password: '' });
       });
     }
   }
   /**
    * @param {Object} event
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
     const { errors, username } = this.state;
     return (
       <div id="modal1" className="modal signin-container col push-l4 push-s1 push-m2 s10 m7 l4">
         <div className="signin-form">
           <h3> Sign In </h3>
           {errors.form &&
           <div className="alert alert-danger"> {errors.form} </div>}
           <form onSubmit={this.onSubmit}>
             {errors.username ?
               <span className="help-block red darken-4">{errors.username}</span> : <br />}
             <input
               type="text"
               value={username}
               onChange={this.onChange}
               onBlur={this.onBlur}
               placeholder="username"
               name="username"
               className="username"
             />

             {errors.password ?
               <span className="help-block">{errors.password}</span> : <br />}
             <input
               type="password"
               value={this.state.password}
               onChange={this.onChange}
               placeholder="password"
               name="password"
               className="password"
             />
             <input
               type="submit"
               name="signin"
               value="Sign In"
               id="sign-in"
               disabled={this.state.invalid}
               className="modal-action modal-close btn waves-effect waves-light light-blue"
             />
           </form>
           <br />
           <span><Link to="/reset" > Forgot password? </Link></span>
           <br />
         </div>
       </div>
     );
   }
 }

 SigninForm.propTypes = {
   validateUser: PropTypes.func.isRequired,
   validateGoogleUser: PropTypes.func.isRequired
 };

 SigninForm.contextTypes = {
   router: PropTypes.object.isRequired
 };


 export default connect(null, {
   validateUser, validateGoogleUser, addFlashMessage })(SigninForm);
