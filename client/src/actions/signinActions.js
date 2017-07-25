import axios from 'axios';

import { SET_USER } from './types';

import { addFlashMessage, createMessage } from './flashMessageActions';

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

const validateUser = (userData) => {
  return (dispatch) => {
    return axios.post('/api/user/signin', userData)
           .then((res) => {
             if (res.data.user) {
                dispatch(setUser(res.data.user));
                dispatch(addFlashMessage(createMessage('success', res.data.user.message)));
             } else {
              console.log(res.data.errors);
              dispatch(setUser(res.data.errors));
              dispatch(addFlashMessage(createMessage('success', res.data.errors.form)));
             }
             
           })
           .catch((error) => {
             dispatch(addFlashMessage(createMessage('error', 'Invalid Signin Parameters')));
           });
  };
};

export { validateUser };
