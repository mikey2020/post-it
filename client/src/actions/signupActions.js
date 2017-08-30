import axios from 'axios';
import jwt from 'jsonwebtoken';
import { addFlashMessage, createMessage } from './flashMessageActions';
import { setUser, validateToken } from './signinActions';
import { handleErrors } from './errorAction';

const addUser = user => dispatch => axios.post('/api/v1/user/signup', user).then(
   (res) => {
     if (res.data.userToken) {
       const token = res.data.userToken;
       localStorage.setItem('jwtToken', token);
       validateToken(token);
       dispatch(setUser(jwt.decode(token).data));
       dispatch(addFlashMessage(createMessage('success', res.data.message)));
     } else if (res.data.errors.message) {
       dispatch(handleErrors('You already a user , Please sign in', 'SIGN_UP_FAILED'));
     }
   })
   .catch(() => {
     dispatch(handleErrors('Try signing up again', 'SIGN_UP_FAILED'));
   });

export default addUser;
