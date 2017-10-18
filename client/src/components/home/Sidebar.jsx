import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Group from './Group.jsx';
import { getUserGroups, setCurrentGroup } from '../../actions/groupActions';

/**
 * SigninForm class component
 *
 * @class
 */
export class Sidebar extends React.Component {
  /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.state = {
      group: {}
    };

    this.setGroup = this.setGroup.bind(this);
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.userId) {
      const { userId } = this.props;
      this.props.getUserGroups({ userId });
    }
  }
  /**
   * @param {object} prevProps - previous props
   *
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (this.props.groups.length !== prevProps.groups.length) {
      const { userId } = this.props;
      this.props.getUserGroups({ userId });
    }
  }

  /**
   * @returns {void}
   * @description - It calls setCurrentGroup function
   */
  setGroup() {
    this.props.setCurrentGroup(this.state.group);
  }
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allGroups = this.props.groups.map(group =>
      (<Group
        key={group.id}
        groupname={group.name}
        group={group}
        setCurrentGroup={setCurrentGroup}
      />)
    );

    return (
      <div className="">
        <ul>
          <h5 className="center">Groups
            <i className="material-icons add_icon">
              <a href="#modal2" className="add_box">add_box</a>
            </i>
          </h5>
          <div>
            {allGroups}
          </div>
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.Object).isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  setCurrentGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups,
  userId: state.user.user.id
});

export default connect(mapStateToProps,
{ getUserGroups, setCurrentGroup })(Sidebar);

