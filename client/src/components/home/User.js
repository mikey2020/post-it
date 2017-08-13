import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { addUserToGroup } from '../../actions/groupActions';
/**
 *  User class component
 * @class
 */
export class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add_user: 'Add'
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ add_user: 'user added' });
    this.props.addUserToGroup({ userId: this.props.userId }, this.props.groupId);
  }

  render() {
    return (
      <div>
        <li className="collection-item user-btn blue-grey darken-3 flow-text"> {this.props.username}
          <button name="add_user" onClick={this.onClick} id="add-btn" className="waves-effect waves-red btn add-user-btn teal lighten-2">{this.state.add_user}</button></li>
        <br />
      </div>
    );
  }

}

User.propTypes = {
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.number.isRequired
};

export default connect(null, { addUserToGroup })(User);
