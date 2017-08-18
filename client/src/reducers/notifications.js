import { GET_NOTIFICATIONS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.notifications.map(notification => Object.assign({}, {
        id: notification.id,
        notification: notification.event
      }));

    default: return state;

  }
};
