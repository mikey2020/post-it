import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { addUserToGroup } from '../../actions/groupActions';

import User from './User';


/**
 *  AllUsers component
 * @class
 */
export class AllUsers extends React.Component {
    /**
   *
   * @returns {void} - react render method
   */
  render() {
    const allResults = this.props.users.map(user =>
      <User key={user.id} username={user.username} addUserToGroup={this.props.addUserToGroup} groupId={this.props.groupId} />
    );

    return (
      <div>

        { this.props.users.length > 0 && <ul className="collection">{allResults}</ul> }

      </div>
    );
  }
}

AllUsers.propTypes = {
  users: PropTypes.array.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired
};


export default connect(null, { addUserToGroup })(AllUsers);
