import axios from 'axios';
import {SET_USER_GROUPS,GET_GROUP_DATA} from './types';

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

const addUser = (groupId,userData) => {

	return dispatch => {

		return axios.post(`/api/group/${groupId}/user`,userData);
	}
	
}

const getGroupData = (groupData) => {
	
	return{
		type: GET_GROUP_DATA,

		groupData
	}

}

const postMessage = (groupId,message) => {
	
	return dispatch => {

		return axios.post(`/api/group/${groupId}/message`,message);
	}

}

const getGroupMessages = (groupId) => {
	
	return dispatch => {

		return axios.get(`/api/group/${groupId}/messages`);
	}

}

const getGroupsUserisPartOf = (username) => {
	return dispatch => {

		return axios.get(`/api/group/${username}/usergroups`);
	}
}


export {getUserGroups,setUserGroups,addUser,getGroupData,postMessage,getGroupMessages,getGroupsUserisPartOf};