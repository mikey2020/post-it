import { REMOVE_NOTIFICATIONS,
  ADD_NOTIFICATION, SET_NOTIFICATIONS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications.map(notification => ({ ...state,
        notification: notification.event
      }));

    case ADD_NOTIFICATION:
      return [
        ...state,
        { notification: action.notification }
      ];

    case REMOVE_NOTIFICATIONS:
      return [
        ...state,
        {}
      ];

    default: return state;

  }
};
