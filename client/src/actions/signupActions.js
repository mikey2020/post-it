import axios from 'axios';
import { addFlashMessage, createMessage } from './flashMessageActions';


const addUser = user => dispatch => axios.post('/api/v1/user/signup', user).then(
   (res) => {
     if (res.data.message) {
       dispatch(addFlashMessage(createMessage('success', res.data.message)));
     } else {
       dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
     }
   }
);

export default addUser;
