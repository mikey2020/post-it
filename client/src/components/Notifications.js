import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNotifications, addNotification } from '../actions/notificationAction';

const socket = io();

/**
 * Create group form component
 * @class
 */
class Notifications extends React.Component {
    /**
     * @constructor
     * @param {Object} - props
     */
  constructor(props) {
    super(props);
    socket.on('new message posted', (message) => {
      this.props.addNotification(message);
    });
  }
    /**
   * @returns {void}
   */
  componentDidMount() {
    this.props.getNotifications();
  }
    /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allNotifications = this.props.notifications.map(notification =>
      <li key={notification.id} className="collection-item">{notification.notification}</li>
    );
    return (
      <div id="modal4" className="modal notifications">
        <h1> Notifications </h1>
        <ul className="collection">{allNotifications}</ul>
      </div>
    );
  }
}


Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  getNotifications: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    username: state.user.user.username
  };
};

export default connect(mapStateToProps, { getNotifications, addNotification })(Notifications);
