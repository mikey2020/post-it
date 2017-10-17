import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';

/**
 * HomePage component
 *
 * @description - It renders the homepage
 *
 * @returns {component} - It returns a react component
 *
 * @param {Object} props
 */
const HomePage = props =>
  /**
   *
   * @returns {component} - renders a React component
   */
   (
     <div className="row">
       <div className="col s4 m4 l3 my-group">
         <Sidebar />
       </div>
       <div className="col s8 m8 l8 my-messages">
         { props.groupId ? <Messages /> :
         <h5 className="select-group">Create/Select a group</h5> }
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
