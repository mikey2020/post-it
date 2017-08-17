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
      userState: 'Add',
      userStatus: false
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount(){
    this.checkUserIsMember(this.props.username);
  }

  checkUserIsMember(user) {
    const { members } = this.props;
    console.log('users / memebers part', members);
    Object.keys(members).forEach((member) => {
      if (members[member].username === user) {
        console.log('a member', user);
        this.setState({ userState: 'member', userStatus: true });
      } else {
        console.log(user + ' is not member');
      }
    });
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ userState: 'user added' });
    this.props.addUserToGroup({ userId: this.props.userId }, this.props.groupId);
  }

  render() {
    return (
      <div>
        <li className="collection-item user-btn blue-grey darken-3 flow-text"> {this.props.username}
          <button
            name="add_user"
            disabled={this.state.userStatus}
            onClick={this.onClick}
            id="add-btn"
            className="waves-effect waves-red btn add-user-btn teal lighten-2"
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
