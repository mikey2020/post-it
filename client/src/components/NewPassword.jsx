import React from 'react';

/**
 * @class
 */
class NewPassword extends React.Component {
/**
 * @returns {void}
 * @param {Object} props
 * @constructor
 */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      newPassword: '',
      newPasswordConfirmation: ''
    };
  }
  /**
   * @returns {void}
   */
  render() {
    const { errors } = this.state;
    return (
      <form className="reset-form">
        <center>
          <div className="jumbotron signup-form">
            <h3>Enter New Password</h3>
            {errors.newPassword ?
              <span className="help-block">{errors.newPassword}</span> : <br />}
            <input
              type="password"
              value={this.state.newPassword}
              placeholder="Enter New Password"
              onChange={this.onChange}
              name="newPassword"
            />

            <input
              type="password"
              value={this.state.newPasswordConfirmation}
              placeholder="Confirm New Password"
              onChange={this.onChange}
              name="newPasswordConfirmation"
            />

            <input type="Submit" className="btn " value="Update Password" />
          </div>
        </center>
      </form>
    );
  }
}


export default NewPassword;
