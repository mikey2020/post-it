import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Validations from '../../validations';
import Input from './Input';
import { checkUserExists, resetPassword, verifyCode } from '../actions/userActions';

const validate = new Validations();
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
      code: '',
      errors: {},
      isLoading: false,
      status: 'enter username',
      newPassword: '',
      newPasswordConfirmation: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }
  /**
   * @param {Object} event
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {Object} event
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.resetPassword(this.state);
    this.setState({ status: 'waiting for verification code' });
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
          errors[field] = 'Invalid user';
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
    const { errors, isValid } = validate.newPasswordInputs(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @param {Object} event
   * @returns {void}
   */
  verifyCode(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.verifyCode(this.state);
    }
  }
  /**
   * @returns {void}
   */
  render() {
    const { errors, status, code, username } = this.state;
    const verificationCodeInput = (
      <form className="reset-form" onSubmit={this.verifyCode}>
        <div className="jumbotron signup-form">
          <h3>Enter Verification code </h3>
          {errors.code ? <span className="help-block">{errors.code}</span> : <br />}
          <Input
            type="text"
            value={code}
            placeholder="Enter verification code"
            onChange={this.onChange}
            name="code"
          />

          {errors.newPassword ? <span className="help-block">{errors.newPassword}</span> : <br />}
          <Input
            type="password"
            value={this.state.newPassword}
            placeholder="Enter New Password"
            onChange={this.onChange}
            name="newPassword"
          />
          {errors.newPasswordConfirmation ?
            <span className="help-block">{errors.newPasswordConfirmation}</span> : <br />}
          <Input
            type="password"
            value={this.state.newPasswordConfirmation}
            placeholder="Confirm New Password"
            onChange={this.onChange}
            name="newPasswordConfirmation"
          />

          <Input type="submit" className="btn" />
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
              value={username}
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
  verifyCode: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

ResetPassword.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { verifyCode, resetPassword })(ResetPassword);
