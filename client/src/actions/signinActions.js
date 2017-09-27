import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_USER, UNSET_USER } from './types';
import { handleErrors, handleSuccess } from './errorAction';
import addUser from './addUser';

const setUser = user => ({
  type: SET_USER,
  user
});

const unsetUser = () => ({
  type: UNSET_USER
});

const signOut = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch(unsetUser());
  dispatch(handleSuccess('signout successful', 'SIGNOUT_SUCCESSFUL'));
};

const validateToken = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

const validateGoogleUser = userData => (dispatch) => {
  dispatch(addUser(userData));
};

const validateUser = userData =>
  dispatch => axios.post('/api/v1/user/signin', userData)
    .then((res) => {
      if (res.data.user) {
        const token = res.data.user.userToken;
        localStorage.setItem('jwtToken', token);
        validateToken(token);
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

export { validateUser, signOut, validateToken, setUser, validateGoogleUser };
