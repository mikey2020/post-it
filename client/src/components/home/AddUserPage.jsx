import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Validations from '../../../Validations';
import { addUserToGroup } from '../../actions/groupActions';
import { getUsers } from '../../actions/userActions';
import AllUsers from './AllUsers.jsx';

const validate = new Validations();

/**
 *  AddUserPage class component
 *
 * @class
 */
export class AddUserPage extends React.Component {
  /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      results: [],
      isLoading: false,
      errors: {},
      invalid: false,
      offset: '',
      pageOfItems: []
    };
    this.onChange = this.onChange.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }
  /**
   * @description - It updates state based on user's input
   *
    * @param {object} event - argument
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
      this.searchUsers(event);
    }
  }
  /**
   * @description - It sets local state and calls getUsers function
   *
   * @param {object} event - argument
   *
   * @returns {void}
   */
  searchUsers(event) {
    this.setState({ [event.target.name]: event.target.value });
    const value = event.target.value;
    if (value !== '') {
      this.props.getUsers(value);
    }
  }
  /**
   * @description - checks if user's input is valid
   *
   * @returns {void}
   */
  isValid() {
    const { errors, isValid } = validate.input(this.state);
    if (!isValid) {
      this.setState({ errors, isLoading: true });
    }
    return isValid;
  }

  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const { errors, username, } = this.state;

    return (
      <div id="modal3" className="modal adduserpage">

        {errors.message &&
          <div className="alert alert-danger"> {errors.message} </div>}

        {errors.input ? <span className="help-block">
          {errors.input}</span> : <br />}
        <h5 className="addUser-header center"> Search for users </h5>
        <form className="input-field center" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
            onChange={this.searchUsers}
            className="username"
            value={username}
          />
          <i className="material-icons">search</i>
        </form>
        <AllUsers
          users={this.props.users}
          addUserToGroup={this.props.addUserToGroup}
          groupId={this.props.groupId}
        />
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect btn-flat">
          Cancel</a>
        </div>
      </div>
    );
  }
}

AddUserPage.propTypes = {
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  groupId: parseInt(state.currentGroup.id, 10)
});

export default connect(mapStateToProps,
  { addUserToGroup, getUsers })(AddUserPage);
