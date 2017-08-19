import axios from 'axios';
import { SET_NOTIFICATIONS } from './types';
import handleErrors from './errorAction';

const setNotifications = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    notifications
  };
};

const getNotifications = () => {
  return (dispatch) => {
    axios.get('/api/v1/user/notifications')
     .then((res) => {
       if (res.data.userNotifications) {
         console.log('seeing soime thingd here', res.data.userNotifications);
         dispatch(setNotifications(res.data.userNotifications));
       }
     })
     .catch(() => {
       dispatch(handleErrors('No notifications', 'SET_NOTIFICATIONS'));
     });
  };
};

export { getNotifications };
