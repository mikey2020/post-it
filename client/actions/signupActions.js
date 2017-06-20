import axios from 'axios';


const userSignupRequest = (userData) => {
	return dispatch => {

		return axios.post('/api/user/signup',userData);
	}
}

const isUserExists = (value) => {
	return dispatch => {
		return axios.get(`api/user/${value}`);
	}

}

export {userSignupRequest,isUserExists};