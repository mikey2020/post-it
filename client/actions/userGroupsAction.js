import axios from 'axios';
import {SET_USER_GROUPS,GET_GROUP} from './types';

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

const addUser = (groupId,username) => {

	return dispatch => {

		return axios.post(`/api/group/${groupId}/user`,username);
	}
	
}

export {getUserGroups,setUserGroups,addUser};