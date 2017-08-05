import axios from 'axios';

import jwt from 'jsonwebtoken';

import { SET_USER, UNSET_USER } from './types';

import { addFlashMessage, createMessage } from './flashMessageActions';

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
    axios.defaults.headers.common['authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}

const validateUser = userData => dispatch => axios.post('/api/user/signin', userData)
           .then((res) => {
             if (res.data.user) {
               const token = res.data.user.userToken;
               localStorage.setItem('jwtToken', token);
               validateToken(token);
               console.log(jwt.decode(token).data);
               dispatch(setUser(jwt.decode(token).data));
               dispatch(addFlashMessage(createMessage('success', res.data.user.message)));
             } else {
               dispatch(setUser(res.data.errors));
               dispatch(addFlashMessage(createMessage('success', res.data.errors.form)));
             }
           })
           .catch(() => {
             dispatch(addFlashMessage(createMessage('error', 'Invalid Signin Parameters')));
           });

export { validateUser, signout, validateToken, setUser };
