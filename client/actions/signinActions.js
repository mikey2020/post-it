import axios from 'axios';
import {SET_USER} from './types'

const signin = (userData) => {
	return dispatch => {

		return axios.post('/api/user/signin',userData);
	}
}

const setUser = (user) => {
	return {
		type: SET_USER,
		user
	}
}

export {signin,setUser};


