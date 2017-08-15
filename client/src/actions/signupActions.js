import axios from 'axios';
import { addFlashMessage, createMessage } from './flashMessageActions';


const addUser = user => dispatch => axios.post('/api/user/signup', user).then(
   (res) => {
     if (res.data.message) {
       dispatch(addFlashMessage(createMessage('success', res.data.message)));
     } else {
       dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
     }
   }
 // ({ data }) => this.setState({ errors: data })
);

export default addUser;
