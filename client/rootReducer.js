import {combineReducers} from 'redux';

import flashMessages from './reducers/flashMessages';

import auth from './reducers/auth';

import groupActions from './reducers/groupActions';

import postMessage from './reducers/postMessage';

export default combineReducers({
	flashMessages,
	auth,
	groupActions,
	postMessage
});