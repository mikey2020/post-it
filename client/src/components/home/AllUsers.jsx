import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addUserToGroup } from '../../actions/groupActions';
import User from './User.jsx';

/**
 * @description - It renders a list of users
 *
 * @param {Object} props
 *
 * @returns {component} - It returns a react component
 */
export const AllUsers = (props) => {
  const allResults = props.users.map(user =>
    (<User
      key={user.id}
      userId={user.id}
      username={user.username}
      addUserToGroup={props.addUserToGroup}
      groupId={props.groupId}
    />)
  );

  return (
    <div>

      { props.users.length > 0 && <ul className="collection">{allResults}</ul> }

    </div>
  );
};

AllUsers.propTypes = {
  addUserToGroup: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  groupId: PropTypes.number.isRequired
};


export default connect(null, { addUserToGroup })(AllUsers);
