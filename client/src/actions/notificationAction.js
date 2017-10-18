import axios from 'axios';
import {
  SET_NOTIFICATIONS,
  REMOVE_NOTIFICATIONS, ADD_NOTIFICATION
} from './types';
import { handleErrors, handleSuccess } from './verifyAction';

/**
 * @description - It adds all user's notifications to the store
 *
 * @param {Array} notifications
 *
 * @returns {Object} - It returns action's type and an object
 */
const setNotifications = notifications => ({
  type: SET_NOTIFICATIONS,
  notifications
});

/**
 * @description - It adds a new notification to the store
 *
 * @param {Object} notification
 *
 * @returns {Object} - It returns an action's type and object
 */
const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  notification
});

/**
 * @returns {Object} - It returns an action's type
 */
const removeNotifications = () => ({
  type: REMOVE_NOTIFICATIONS
});

/**
 * @description - It gets all user's notifications from the store
 *
 * @returns {Object} - It returns api call response
 */
const getNotifications = () =>
dispatch => axios.get('/api/v1/user/notifications')
    .then((res) => {
      if (res.data.notices) {
        dispatch(setNotifications(res.data.notices));
      } else {
        dispatch(handleErrors(null, 'SET_NOTIFICATIONS'));
      }
      return res;
    })
    .catch((error) => {
      dispatch(handleErrors(null, 'SET_NOTIFICATIONS'));
      return error;
    });
/**
 * @description - It deletes a notification from the store
 *
 * @returns {void}
 */
const deleteNotification = () => dispatch =>
axios.delete('/api/v1/user/delete/notifications')
    .then((res) => {
      if (res.data.message === 'All notifications deleted') {
        dispatch(handleSuccess(null, 'REMOVE_NOTIFICATIONS'));
      }
    })
    .catch(() => {
      dispatch(handleErrors(null, 'REMOVE_NOTIFICATIONS'));
    });


export {
  getNotifications,
  removeNotifications, addNotification, deleteNotification
};
