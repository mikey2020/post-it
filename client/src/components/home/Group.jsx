import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentGroup } from '../../actions/groupActions';

/**
 * Group component
 * @class
 */
export class Group extends React.Component {
   /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  /**
   * @param {object} e - event
   * @returns {void}
   */
  onClick(e) {
    e.preventDefault();
    this.props.setCurrentGroup(this.props.group);
  }
   /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    return (
      <div>
        <a
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          className="waves-effect waves-light btn group-btn"
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