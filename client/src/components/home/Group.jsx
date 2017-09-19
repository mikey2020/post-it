import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentGroup } from '../../actions/groupActions';

/**
 * Group
 * @class
 */
export class Group extends React.Component {
   /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  /**
   * @param {object} event
   *
   * @returns {void}
   */
  onClick(event) {
    event.preventDefault();
    this.props.setCurrentGroup(this.props.group);
  }
   /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    return (
      <div className="card">
        <a
          onClick={this.onClick}
          className="group"
        >
          {this.props.groupname}
        </a>
        <br />
      </div>
    );
  }

}

Group.propTypes = {
  groupname: PropTypes.string.isRequired,
  setCurrentGroup: PropTypes.func.isRequired,
  group: PropTypes.objectOf(PropTypes.string).isRequired
};

export default connect(null, { setCurrentGroup })(Group);
