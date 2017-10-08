import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SET_USER, UNSET_USER } from './types';
import { handleErrors, handleSuccess } from './errorAction';

/**
 * @description - It adds user data to the store
 *
 * @param {Object} user
 *
 * @returns {Object} - It returns an action's type and user's object
 */
const setUser = user => ({
  type: SET_USER,
  user
});

/**
 * @description - It removes a user's data from the store
 *
 * @returns {Object} - It returns an action's type
 */
const unsetUser = () => ({
  type: UNSET_USER
});
/**
 * @description - It signs a user out by dipatching some actions
 *
 * @returns {void}
 */
const signOut = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch(unsetUser());
};

/**
 * @description - It validates a user's authorization token
 *
 * @param {String} token
 * @param {Object} dispatch
 *
 * @returns {void}
 */
const validateToken = (token, dispatch) => {
  if (token) {
    axios.defaults.headers.common.authorization = `${token}`;
    axios.post('/api/v1/user/verify-token')
    .then((res) => {
      if (res.data.message === 'User is valid') {
        dispatch(setUser(jwt.decode(localStorage.jwtToken).data));
      }
    });
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};


/**
 * @description - It validates a user to see if they are authorized
 *
 * @param {Object} userData
 *
 * @returns {Object} - It returns an api call response
 */
const validateUser = userData =>
  dispatch => axios.post('/api/v1/user/signin', userData)
    .then((res) => {
      if (res.data.userToken && res.data.message) {
        const token = res.data.userToken;
        localStorage.setItem('jwtToken', token);
        validateToken(token, dispatch);
        dispatch(setUser(jwt.decode(token).data));
        dispatch(handleSuccess(`Welcome 
               ${jwt.decode(token).data.username}`,
          'SET_USER_SUCCESS'));
        return res;
      }
    })
    .catch((error) => {
      dispatch(handleErrors('Invalid Signin Parameters', 'SET_USER'));
      return error;
    });

export { validateUser, signOut, validateToken, setUser };
