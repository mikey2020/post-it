import React from 'react';
import PropTypes from 'prop-types';

const NewPassword = props => (
  <form className="reset-form" onSubmit={props.verifyCode}>
    <div className="jumbotron signin-container">
      <h3>Enter Verification code </h3>
      {props.errors.code ? <span className="help-block">
        {props.errors.code}</span> : <br />}
      <input
        type="text"
        value={props.code}
        placeholder="Enter verification code"
        onChange={props.onChange}
        name="code"
      />

      {props.errors.newPassword ? <span className="help-block">
        {props.errors.newPassword}</span> : <br />}
      <input
        type="password"
        value={props.newPassword}
        placeholder="Enter New Password"
        onChange={props.onChange}
        name="newPassword"
      />
      {props.errors.newPasswordConfirmation ?
        <span className="help-block">
          {props.errors.newPasswordConfirmation}</span> : <br />}
      <input
        type="password"
        value={props.newPasswordConfirmation}
        placeholder="Confirm New Password"
        onChange={props.onChange}
        name="newPasswordConfirmation"
      />

      <input
        type="submit"
        className="btn waves-effect waves-light grey darken-4 reset-password"
      />
    </div>
  </form>
  );


NewPassword.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  verifyCode: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  newPasswordConfirmation: PropTypes.func.isRequired,
  newPassword: PropTypes.func.isRequired
};

export default NewPassword;
