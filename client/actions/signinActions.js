import axios from 'axios';


const signin = (userData) => {
	return dispatch => {

		return axios.post('/api/user/signin',userData);
	}
}

export {signin};