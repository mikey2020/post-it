import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setUser, validateToken } from './signinActions';
import { handleErrors, handleSuccess } from './errorAction';

const addUser = user => dispatch => axios.post('/api/v1/user/signup', user).then(
    (res) => {
      if (res.data.userToken) {
        const token = res.data.userToken;
        localStorage.setItem('jwtToken', token);
        validateToken(token);
        dispatch(setUser(jwt.decode(token).data));
        dispatch(handleSuccess(res.data.message, 'ADD_USER'));
        window.location.assign('/home');
      } else if (res.data.errors.message) {
        dispatch(handleErrors('You already a user , Please sign in', 'ADD_USER_FAILED'));
      }
    })
    .catch((err) => {
      if (err.data.phoneNumber) {
        dispatch(handleErrors(err.data.phoneNumber, 'ADD_USER_FAILED'));
      } else if (err.data.email) {
        dispatch(handleErrors(err.data.email, 'ADD_USER_FAILED'));
      } else {
        dispatch(handleErrors(err.data.errors.message, 'ADD_USER_FAILED'));
      }
    });
export default addUser;
