import axios from 'axios';

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
  dispatch(unsetUser());
  dispatch(addFlashMessage(createMessage('success', 'signout successful')));
};

const validateToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorisation'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorisation'];
  }
}

const validateUser = userData => dispatch => axios.post('/api/user/signin', userData)
           .then((res) => {
             if (res.data.user) {
               const token = res.data.user.userToken;
               localStorage.setItem('jwtToken', token);
               dispatch(setUser(res.data.user));
               dispatch(addFlashMessage(createMessage('success', res.data.user.message)));
             } else {
               dispatch(setUser(res.data.errors));
               dispatch(addFlashMessage(createMessage('success', res.data.errors.form)));
             }
           })
           .catch(() => {
             dispatch(addFlashMessage(createMessage('error', 'Invalid Signin Parameters')));
           });

export { validateUser, signout };
