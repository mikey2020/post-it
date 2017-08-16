import { combineReducers } from 'redux';
import flashMessage from './reducers/flashMessage';
import user from './reducers/user';
import users from './reducers/users';
import groups from './reducers/groups';
import Messages from './reducers/Messages';
import currentGroup from './reducers/currentGroup';
import error from './reducers/error';
import members from './reducers/members';

export default combineReducers({
  flashMessage,
  user,
  groups,
  Messages,
  currentGroup,
  members,
  users,
  error
});
