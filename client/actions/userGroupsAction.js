import axios from 'axios';
import {SET_USER_GROUPS} from './types';

const getUserGroups = (username) => {
	return dispatch => {

		return axios.get(`/api/groups/${username}`);
	}
}

const setUserGroups = (groups) => {
	return {
		type: SET_USER_GROUPS,
		groups
	}
}

export {getUserGroups,setUserGroups};