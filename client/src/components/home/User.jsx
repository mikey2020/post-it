import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserToGroup } from '../../actions/groupActions';
/**
 *  User class component
 * @class
 */
export class User extends React.Component {
  /**
   * @constructor
   * @param {object} props - react properties
   */
  constructor(props) {
    super(props);
    this.state = {
      userState: 'Add',
      userStatus: false
    };

    this.onClick = this.onClick.bind(this);
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    this.checkUserIsMember(this.props.username);
  }

  /**
   * @returns {void}
   * @param {object} event  - event object
   */
  onClick(event) {
    event.preventDefault();
    this.setState({ userState: 'user added' });
    this.props.addUserToGroup({ userId: this.props.userId }, this.props.groupId);
  }

  /**
   * @returns {void}
   * @param {string} user - registered user in the application
   */
  checkUserIsMember(user) {
    const { members } = this.props;
    Object.keys(members).forEach((member) => {
      if (members[member].username === user) {
        this.setState({ userState: 'member', userStatus: true });
      }
    });
  }
  /**
   * @returns {void}
   */
  render() {
    return (
      <div>
        <li className="collection-item user-btn light-blue flow-text"> {this.props.username}
          <button
            name="add_user"
            disabled={this.state.userStatus}
            onClick={this.onClick}
            id=""
            className="waves-effect waves-red btn  add-user-btn "
          > {this.state.userState}
          </button>
        </li>
        <br />
      </div>
    );
  }

}

User.propTypes = {
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const mapStateToProps = (state) => {
  return {
    members: state.members
  };
};

export default connect(mapStateToProps, { addUserToGroup })(User);
