import axios from 'axios';
import {
  SET_NOTIFICATIONS,
  REMOVE_NOTIFICATIONS, ADD_NOTIFICATION
} from './types';
import { handleErrors, handleSuccess } from './errorAction';

const setNotifications = notifications => ({
  type: SET_NOTIFICATIONS,
  notifications
});

const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  notification
});

const removeNotifications = () => ({
  type: REMOVE_NOTIFICATIONS
});

const getNotifications = () =>
dispatch => axios.get('/api/v1/user/notifications')
    .then((res) => {
      if (res.data.userNotices) {
        dispatch(setNotifications(res.data.userNotices));
      } else {
        dispatch(handleErrors(null, 'SET_NOTIFICATIONS'));
      }
      return res;
    })
    .catch((error) => {
      dispatch(handleErrors(null, 'SET_NOTIFICATIONS'));
      return error;
    });

const deleteNotification = () => (dispatch) => {
  axios.delete('/api/v1/user/delete/notifications')
    .then(() => {
      dispatch(handleSuccess(null, 'REMOVE_NOTIFICATIONS'));
    })
    .catch(() => {
      dispatch(handleErrors(null, 'REMOVE_NOTIFICATIONS'));
    });
};


export {
  getNotifications,
  removeNotifications, addNotification, deleteNotification
};
