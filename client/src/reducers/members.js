import { SET_MEMBERS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members.map(member => Object.assign({}, state, {
        id: member.id,
        username: member.username
      }));

    default: return state;

  }
};

