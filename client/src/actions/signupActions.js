import axios from 'axios';


const addUser = user => dispatch => axios.post('/api/user/signup', user);

export { addUser };
