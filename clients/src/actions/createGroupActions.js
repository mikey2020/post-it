import axios from 'axios';

const createGroup = (value) => {
	return dispatch => {
		return axios.post('/api/group',value);
	}

}


const groupExists = (value) => {
	return dispatch => {
		return axios.get(`api/group/${value}`);
	}

}

export {groupExists,createGroup};