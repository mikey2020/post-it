import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setUser, validateToken } from './signinActions';
import { handleErrors, handleSuccess } from './errorAction';

const addUser = user =>
dispatch => axios.post('/api/v1/user/signup', user).then(
    (res) => {
      if (res.status === 200 || res.data.message) {
        const token = res.data.userToken;
        localStorage.setItem('jwtToken', token);
        validateToken(token);
        dispatch(setUser(jwt.decode(token).data));
        dispatch(handleSuccess(res.data.message, 'ADD_USER'));
        window.location.assign('/home');
      } else if (res.data.errors.message) {
        dispatch(handleErrors(res.data.errors.message,
        'ADD_USER_FAILED'));
      }
    })
    .catch((error) => {
      if (error.data.phoneNumber) {
        dispatch(handleErrors(error.data.phoneNumber, 'ADD_USER_FAILED'));
      } else if (error.data.email) {
        dispatch(handleErrors(error.data.email, 'ADD_USER_FAILED'));
      } else {
        dispatch(handleErrors(error.data.errors.message, 'ADD_USER_FAILED'));
      }
    });

export default addUser;