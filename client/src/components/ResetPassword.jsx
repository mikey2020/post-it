import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NewPassword from './NewPassword.jsx';
import Validations from '../../validations';
import { checkUserExists,
  sendVerificationCode, verifyCode } from '../actions/userActions';

const validate = new Validations();
/**
 *  SignupForm class component
 * @class
 */
export class ResetPassword extends React.Component {
  /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code: '',
      errors: {},
      isLoading: false,
      invalid: true,
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
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, errors: {} });
  }
  /**
   * @param {Object} event
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.sendVerificationCode(this.state).then(() => {
      this.setState({ status: 'waiting for verification code' });
    });
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
   *
   * @returns {void}
   */
  verifyCode(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.props.verifyCode(this.state).then((res) => {
        if (res.data.message === 'password updated successfully') {
          $('#modal1').modal('open');
          this.setState({ code: '',
            newPassword: '',
            newPasswordConfirmation: '' });
        }
      });
    }
  }
  /**
   * @returns {void}
   */
  render() {
    const { errors, status, code,
      username, newPassword, newPasswordConfirmation } = this.state;

    return (
      <div className="" id="signup-body">
        <center>
          { status === 'enter username' &&
          <form onSubmit={this.onSubmit} className="reset-form">
            <div className="jumbotron signin-container">
              <h3 id="signup-header" className="flow-text" >Enter Username</h3>
              {errors.username ? <span className="help-block">
                {errors.username}</span> : <br />}
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

          { status === 'waiting for verification code'
          && <NewPassword
            onChange={this.onChange}
            code={code}
            verifyCode={this.verifyCode}
            errors={errors}
            newPassword={newPassword}
            newPasswordConfirmation={newPasswordConfirmation}
          /> }
        </center>
      </div>

    );
  }
}

ResetPassword.propTypes = {
  verifyCode: PropTypes.func.isRequired,
  sendVerificationCode: PropTypes.func.isRequired
};

ResetPassword.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null,
{ verifyCode, sendVerificationCode })(ResetPassword);
