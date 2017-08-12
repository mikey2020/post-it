import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Group from './Group';

import { getUserGroups, setCurrentGroup } from '../../actions/groupActions';


export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {}
    };

    this.setGroup = this.setGroup.bind(this);
  }

  setGroup() {
    this.props.setCurrentGroup(this.state.group);
  }

  handleClick(e) {
    e.preventDefault();
  }

  componentDidMount() {
    if (this.props.userId) {
      const { userId } = this.props;
      this.props.getUserGroups({ userId });
    }
    
  }

  componentDidUpdate(prevProps) {
    if (this.props.groups.length !== prevProps.groups.length) {
      const { groups, userId } = this.props;
      this.props.getUserGroups({ userId });
		 }
  }

  render() {
    const allGroups = this.props.groups.map(group =>
      <Group key={group.id} groupname={group.name} group={group} setCurrentGroup={setCurrentGroup} />
		);

    return (
      <div>
        <div>
          <div className="vertical-menu">
            <h4 className="sidebar-header">Groups <i className="material-icons add_icon"><a href="#modal2">add_box</a></i></h4>
            <ul>{allGroups}</ul>
          </div>
        </div>

      </div>
    );
  }
}

Sidebar.propTypes = {
  groups: PropTypes.array.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  setCurrentGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups,
  userId: state.user.user.id
});

export default connect(mapStateToProps, { getUserGroups, setCurrentGroup })(Sidebar);

