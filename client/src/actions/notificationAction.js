import axios from 'axios';
import { SET_NOTIFICATIONS, REMOVE_NOTIFICATIONS, ADD_NOTIFICATION } from './types';
import handleErrors from './errorAction';

const setNotifications = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    notifications
  };
};

const addNotification = (notification) => {
  return {
    type: ADD_NOTIFICATION,
    notification
  };
};

const removeNotifications = (notification) => {
  return {
    type: REMOVE_NOTIFICATIONS,
    notification
  };
};

const getNotifications = () => {
  return (dispatch) => {
    axios.get('/api/v1/user/notifications')
     .then((res) => {
       if (res.data.userNotifications) {
         dispatch(setNotifications(res.data.userNotifications));
       } else {
         dispatch(handleErrors('No notifications', 'SET_NOTIFICATIONS'));
       }
     });
  };
};


export { getNotifications, removeNotifications, addNotification };
