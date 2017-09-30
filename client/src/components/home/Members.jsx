import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMembersOfGroup } from '../../actions/userActions';

/**
 *  Members class component
 * @class
 */
class Members extends React.Component {
   /**
   * @returns {void}
   */
  componentDidMount() {
    this.props.getMembersOfGroup(this.props.groupId);
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
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allMembers = this.props.members.map(member =>
      <li className="member" key={member.id}> {member.username} </li>
    );
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          { this.props.members.length > 0 && <ul>{ allMembers }</ul> }
        </ul>
      </div>
    );
  }
}

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  groupId: PropTypes.number.isRequired,
  getMembersOfGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.members,
  groupId: state.currentGroup.id
});

export default connect(mapStateToProps, { getMembersOfGroup })(Members);
