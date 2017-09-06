import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';

/**
 *  HomePage class component
 * @class
 * @param {Object} props
 */
const HomePage = props =>
  /**
   *
   * @returns {component} - renders a React component
   */
   (
     <div className="row">
       <div className="col s4 m4 l3">
         <Sidebar />
       </div>
       <div className="col s8 m8 l9 message-board">
         { props.groupId ? <Messages /> :
         <h2 className="select-group">Please select a group</h2> }
       </div>
     </div>
  );

const mapStateToProps = state => ({
  groupId: state.currentGroup.id
});

HomePage.propTypes = {
  groupId: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(HomePage);
