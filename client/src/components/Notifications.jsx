import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNotifications,
  addNotification } from '../actions/notificationAction';

const socket = io();

/**
 * Notifications component
 *
 * @class
 */
class Notifications extends React.Component {
    /**
     * @constructor
     *
     * @param {Object} props
     */
  constructor(props) {
    super(props);
    socket.on('new message posted', (message) => {
      if (this.props.username !== message.messageCreator) {
        this.props.addNotification(`${message.messageCreator} 
        posted a message to a group which you are a member`);
      }
    });
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.username !== undefined) {
      this.props.getNotifications();
    }
  }
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allNotifications = this.props.notifications.map(notification =>
      (<li
        key={notification.id}
        className="collection-item"
      >
        {notification.notification}</li>)
    );
    return (
      <div id="modal4" className="modal notifications">
        <h1 className="notification-header"> Notifications </h1>
        <ul className="collection notice">{allNotifications}</ul>
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

const mapStateToProps = state => ({
  notifications: state.notifications,
  username: state.user.user.username
});

export default connect(mapStateToProps,
{ getNotifications, addNotification })(Notifications);
