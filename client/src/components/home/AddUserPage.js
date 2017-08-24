import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Validations from '../../../validations';
import { addUserToGroup } from '../../actions/groupActions';
import { getUsers } from '../../actions/userActions';
import AllUsers from './AllUsers';

const validate = new Validations();

/**
 *  AddUserPage class component
 * @class
 */
export class AddUserPage extends React.Component {
  /**
   * @constructor
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
    // this.changeToArray = this.changeToArray.bind(this);
  }
 /**
   * @param {object} e - argument
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
      this.searchUsers(e);
    }
  }
  /**
   * @param {object} e - argument
   * @returns {void}
   */
  searchUsers(e) {
    this.setState({ [e.target.name]: e.target.value });
    const value = e.target.value;
    const offsetValue = 5;
    if (value !== '') {
      this.props.getUsers({ username: value, offset: offsetValue });
    }
  }
  /**
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
    // const myPages = this.changeToArray(this.props.users.length);
    const { errors, username, } = this.state;

    return (
      <div id="modal3" className="modal adduserpage">

        { errors.message && <div className="alert alert-danger"> {errors.message} </div>}

        {errors.input ? <span className="help-block">{errors.input}</span> : <br />}
        <h2 className="addUser-header"> Search for users </h2>
        <form className="input-field" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={this.searchUsers}
            className=""
            value={username}
          />

        </form>
        <AllUsers
          users={this.props.users}
          addUserToGroup={this.props.addUserToGroup}
          groupId={this.props.groupId}
        />
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
  groupId: state.currentGroup.id
});

export default connect(mapStateToProps, { addUserToGroup, getUsers })(AddUserPage);
