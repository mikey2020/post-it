import { SET_UNREAD_MESSAGES } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_UNREAD_MESSAGES:
      return action.members.map(member => ({ ...state,
        username: member
      }));

    default: return state;

  }
};
