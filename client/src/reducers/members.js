import { SET_MEMBERS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members.map(member => Object.assign({}, state, {
        username: member
      }));

    default: return state;

  }
};

