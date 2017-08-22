import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validations from '../../validations';
import Input from './Input';
import { checkUserExists, resetPassword } from '../actions/userActions';

const validate = new validations();
/**
 *  SignupForm class component
 * @class
 */
export class ResetPassword extends React.Component {
  /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      verificationInput: '',
      errors: {},
      isLoading: false,
      status: 'enter username'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  /**
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param event - object
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    resetPassword(this.state);
    console.log('my response');
    this.setState({ status: 'waiting for verification code' });
    console.log(this.state.status);
  }
  /**
   * @returns {void}
   * @param {Object} event - object
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
          errors[field] = 'Unknown user';
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
    const { errors, isValid } = validate.signup(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  /**
   * @returns {void}
   */
  render() {
    const { errors, status } = this.state;
    const verificationCodeInput = (
      <form className="reset-form">
        <div className="jumbotron signup-form">
        <h3>Enter Verification code </h3>
      <Input type="text" value={this.state.verificationInput} placeholder="Enter verification code" />
      <Input type="submit" className="btn"/>
        </div>
      </form>
    );
    return (
      <div className="" id="signup-body">
        { status === 'enter username' &&
       <form onSubmit={this.onSubmit} className="reset-form">
          <div className="jumbotron signup-form">
            <h3 id="signup-header" className="flow-text" >Enter Username</h3>
            {errors.username ? <span className="help-block">{errors.username}</span> : <br />}
             <input
               value={this.state.username}
               onChange={this.onChange}
               onBlur={this.onBlur}
               type="text"
               placeholder="Enter username"
               name="username"
            />

            <input
              disabled={this.state.invalid}
              type="submit"
              name="sign up"
              value="Submit"
              className="btn waves-effect waves-light grey darken-4 reset-password"
            />
          </div>
        </form>
        }

        { status === 'waiting for verification code' && verificationCodeInput }
      </div>

    );
  }
}

ResetPassword.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func.isRequired
};

ResetPassword.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null)(ResetPassword);
