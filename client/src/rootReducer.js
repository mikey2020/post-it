import { combineReducers } from 'redux';

import flashMessage from './reducers/flashMessage';
import user from './reducers/user';
import users from './reducers/users';
import groups from './reducers/groups';
import messages from './reducers/messages';
import currentGroup from './reducers/currentGroup';
import actionStatus from './reducers/actionStatus';
import members from './reducers/members';
import notifications from './reducers/notifications';
import usersWhoReadMessage from './reducers/usersWhoReadMessage';
import unreadMessages from './reducers/unreadMessages';

export default combineReducers({
  flashMessage,
  user,
  groups,
  messages,
  currentGroup,
  members,
  users,
  actionStatus,
  notifications,
  usersWhoReadMessage,
  unreadMessages
});
