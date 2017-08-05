import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { addUserToGroup } from '../../actions/groupActions';

export class User extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.addUserToGroup({ username: this.props.username }, this.props.groupId);
  }

  render() {
    return (
      <div>
        <li className="well well-sm user-btn red darken-1"> {this.props.username}
          <a onClick={this.onClick} className="waves-effect waves-light btn add-user-btn grey darken-4">Add</a></li>
      </div>
    );
  }

}

User.propTypes = {
  username: PropTypes.string.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired
};

export default connect(null, { addUserToGroup })(User);
