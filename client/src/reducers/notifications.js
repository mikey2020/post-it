import { REMOVE_NOTIFICATIONS, ADD_NOTIFICATION } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    // case SET_NOTIFICATIONS:
    //   return action.notifications.map(notification => Object.assign({}, state, {
    //     notification: notification[0].event
    //   }));

    case ADD_NOTIFICATION:
      console.log('memmmeeee self dey work');
      return [
        ...state,
        { notification: action.notification }
      ];
    case REMOVE_NOTIFICATIONS:
      return [];

    default: return state;

  }
};
