import { combineReducers } from 'redux';

import flashMessage from './reducers/flashMessage';

import user from './reducers/user';

export default combineReducers({
  flashMessage,
  user
});
