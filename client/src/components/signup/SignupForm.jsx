import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import addUser from '../../actions/signupActions';
import Validations from '../../../validations';
import { addFlashMessage } from '../../actions/flashMessageActions';

const validate = new Validations();

/**
 *  SignupForm class component
 * @class
 */
export class SignupForm extends React.Component {
  /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      googleUsername: '',
      googleEmail: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      showGoogleButton: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
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
      this.props.addUser(this.state).then(() => {
        this.context.router.push('/home');
      });
    }
  }
  /**
   * @param {object} e - argument
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
    * @param {Object} response
    */
  responseGoogle(response) {
    const profile = response.getBasicProfile();
    const userData = {
      username: profile.ig,
      email: profile.U3 };
    this.setState({ googleEmail: userData.email,
      googleUsername: userData.username,
      showGoogleButton: true });
  }
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const { errors, username, googleUsername, email, googleEmail, showGoogleButton } = this.state;
    return (
      <div className="" id="signup-body">
        <center>
          <form onSubmit={this.onSubmit}>
            <div className="jumbotron signup-form">
              <p id="signup-header" className="flow-text"><h3> Sign Up </h3></p>
              {errors.username ? <span className="help-block">{errors.username}</span> : <br />}
              <input
                value={username || googleUsername}
                onChange={this.onChange}
                type="text"
                placeholder="username"
                name="username"
                className="username"
              />

              {errors.email ? <span className="help-block">{errors.email}</span> : <br />}

              <input
                value={email || googleEmail}
                onChange={this.onChange}
                type="email"
                placeholder="email"
                name="email"
                className=""
                id="usr"
              />

              {errors.phoneNumber ?
                <span className="help-block">{errors.phoneNumber}</span> : <br />}

              <input
                value={this.state.phoneNumber}
                onChange={this.onChange}
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                className=""
                id="usr"
              />

              { errors.password ? <span className="help-block">{errors.password}</span> : <br />}

              <input
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                placeholder="password"
                name="password"
                className=""
                id="pwd"
              />

              {errors.passwordConfirmation ?
                <span className="help-block">{errors.passwordConfirmation}</span> : <br />}

              <input
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                type="password"
                placeholder=" Confirm password"
                name="passwordConfirmation"
                className=""
                id="pwd"
              />


              <input
                disabled={this.state.isLoading}
                type="submit"
                id="signup-button"
                name="sign up"
                value="Sign Up"
                className="btn waves-effect waves-light light-blue accent-4"
              />

              <GoogleLogin
                clientId="790869526222-at6a80ovm0nkjgpgr0d6mih6jdt4af3n.apps.googleusercontent.com"
                buttonText="Sign Up with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                className="btn  google-btn waves-effect waves-red "
                disabled={showGoogleButton}
              />
            </div>
          </form>
        </center>
      </div>

    );
  }
}

SignupForm.propTypes = {
  addUser: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { addUser, addFlashMessage })(SignupForm);
