import { addFlashMessage, createMessage } from './flashMessageActions';
import { ACTION_FAILED } from './types';

const setErrors = status => ({
  type: ACTION_FAILED,
  status
});

const handleErrors = (errorMessage) => {
  return (dispatch) => {
    dispatch(setErrors(true));
    dispatch(addFlashMessage(createMessage('error', errorMessage)));
  };
};


export default handleErrors;
