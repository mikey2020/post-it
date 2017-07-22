import axios from 'axios';


  const addUser =  (user) => {
     return (dispatch) => {
       return axios.post('/api/user/signup', user);
     };
  }

export {addUser};
