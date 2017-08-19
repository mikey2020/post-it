import { ACTION_FAILED } from '../actions/types';

const initialState = { errorStatus: false, actionName: '' };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_FAILED:
      return Object.assign({}, state, {
        errorStatus: action.payload.status,
        actionName: action.payload.actionName
      });

    default: return state;

  }
};
