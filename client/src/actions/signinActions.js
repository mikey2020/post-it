import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_USER, UNSET_USER } from './types';
import { addFlashMessage, createMessage } from './flashMessageActions';
import { handleErrors, handleSuccess } from './errorAction';
import addUser from './signupActions';

const setUser = user => ({
  type: SET_USER,
  user
});

const unsetUser = () => ({
  type: UNSET_USER
});

const signout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch(unsetUser());
  dispatch(addFlashMessage(createMessage('success', 'signout successful')));
};

const validateToken = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

const validateGoogleUser = (userData) => {
  return (dispatch) => {
    dispatch(addUser(userData));
  };
};

const validateUser = userData => dispatch => axios.post('/api/v1/user/signin', userData)
           .then((res) => {
             if (res.data.user) {
               const token = res.data.user.userToken;
               localStorage.setItem('jwtToken', token);
               validateToken(token);
               dispatch(setUser(jwt.decode(token).data));
               dispatch(addFlashMessage(createMessage('success', `Welcome ${res.data.user.name}`)));
             }
           })
           .catch(() => {
             dispatch(handleErrors('Invalid Signin Parameters', 'SET_USER'));
           });

export { validateUser, signout, validateToken, setUser, validateGoogleUser };
