import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentGroup } from '../../actions/groupActions';

/**
 * Group component
 *
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
   * @description - It calls setCurrentGroup function
   *
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
      <div className="row">
        <div className="btn card col s11 m12 l12">
          <a
            role="button"
            tabIndex={0}
            onClick={this.onClick}
            className="group"
          >
            {this.props.groupname}
          </a>
          <br />
        </div>
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
