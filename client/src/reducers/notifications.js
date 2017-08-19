import { SET_NOTIFICATIONS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications.map(notification => Object.assign({}, state, {
        notification: notification.event
      }));

    default: return state;

  }
};
