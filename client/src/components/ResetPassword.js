import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validations from '../../validations';
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
      phoneNumber: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   * @param e - object
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    resetPassword(this.state);
  }
  /**
   * @param e - object
   */
  onBlur(e) {
    const field = e.target.name;
	  const value = e.target.value;
    if (value !== '') {
      checkUserExists({ username: value }).then((res) => {
        const errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          console.log('you are a valid user');
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
  render() {
    const { errors } = this.state;
    return (
      <div className="" id="signup-body">
        <form onSubmit={this.onSubmit} className="reset-form">
          <div className="jumbotron signup-form">
            <p id="signup-header" className="flow-text"><h3> Reset Password</h3></p>
            {errors.phoneNumber ? <span className="help-block">{errors.phoneNumber}</span> : <br />}
            <input
              value={this.state.username}
              onChange={this.onChange}
              onBlur={this.onBlur}
              type="text"
              placeholder="PhoneNumber"
              name="phoneNumber"
              className=""
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
