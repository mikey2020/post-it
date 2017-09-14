
import { SET_USERS_WHO_READ_MESSAGE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS_WHO_READ_MESSAGE:
      return action.users.map(user => ({ ...state,
        id: user.id,
        username: user.username,
        messageId: user.ReadMessages.messageId
      }));

    default: return state;

  }
};
