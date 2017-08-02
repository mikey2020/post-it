 import React from 'react';

 import { connect } from 'react-redux';

 import PropTypes from 'prop-types';

 import { validateUser } from '../../actions/signinActions';

 import Validations from '../../../../server/middlewares/validations';

 import { addFlashMessage } from '../../actions/flashMessageActions';

 const validate = new Validations();

 /**
 *  SigninForm class component
 * @class
 */
 class SigninForm extends React.Component {
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
       this.props.validateUser(this.state);
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
       <div id="modal1" className="modal">
         <div className="jumbotron container-fluid signin-form">
           <div className="signin-form1">
             <h3> Sign In </h3>
             {this.state.errors.form && <div className="alert alert-danger"> {this.state.errors.form} </div>}
             <form onSubmit={this.onSubmit}>
               {this.state.errors.username ? <span className="help-block">{this.state.errors.username}</span> : <br />}
               <input
                 type="text"
                 value={this.state.username}
                 onChange={this.onChange}
                 placeholder="username"
                 name="username"
                 className=""
               />

               {this.state.errors.password ? <span className="help-block">{this.state.errors.password}</span> : <br />}
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
                 className="btn waves-effect waves-light red darken-4"
               />
             </form>
           </div>
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
