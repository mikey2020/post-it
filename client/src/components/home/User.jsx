import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addUserToGroup } from '../../actions/groupActions';
import { getMembersOfGroup } from '../../actions/userActions';
/**
 *  User class component
 *
 * @class
 */
export class User extends React.Component {
  /**
   * @constructor
   *
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
    this.props.getMembersOfGroup(this.props.groupId);
    this.checkUserIsMember(this.props.username);
  }

  /**
   * @param {object} prevProps - previous props
   *
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (this.props.groupId !== prevProps.groupId) {
      const { groupId } = this.props;
      this.props.getMembersOfGroup(groupId);
    }
  }

  /**
   * @returns {void}
   *
   * @param {object} event  - event object
   */
  onClick(event) {
    event.preventDefault();
    this.setState({ userState: 'user added' });
    this.props.addUserToGroup({ userId: this.props.userId },
    this.props.groupId);
  }

  /**
   * @returns {void}
   *
   * @param {string} user - registered user in the application
   *
   * @description - It compares search results against members of a group,
   * to see who is member of a group and who is not.
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
      <div className="row">
        <li className="collection-item user-btn light-blue flow-text">
          {this.props.username}
          <button
            name="add_user"
            disabled={this.state.userStatus}
            onClick={this.onClick}
            className="waves-effect btn add-user-btn col s4 m2 l2 push-s9 push-m10 push-l10"
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
  getMembersOfGroup: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const mapStateToProps = state => ({
  members: state.members
});

export default connect(mapStateToProps,
{ addUserToGroup, getMembersOfGroup })(User);
