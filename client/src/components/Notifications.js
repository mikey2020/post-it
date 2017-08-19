import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNotifications } from '../actions/notificationAction';

class Notifications extends React.Component {
    
    componentDidMount(){
      getNotifications();
    }

    render(){
      const allNotifications = this.props.notifications.map(notification => 
      <li>{notification}</li>
      );
      return (
        <div id="modal4" className="modal notifications">
           <h1> Notifications </h1>
           <ul>{allNotifications}</ul>
        </div>
      );
    }
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state) => {
  console.log('this notifskdw sha', state.notifications );
  return {
    notifications: state.notifications
  };
};

export default connect(mapStateToProps, { getNotifications })(Notifications);
