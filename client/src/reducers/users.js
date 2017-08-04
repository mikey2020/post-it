
import { SET_USERS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users.map((user) => {
        return Object.assign({}, {
          id: user.id,
          username: user.username
        });
      });

    default: return state;

  }
};