import { addFlashMessage, createMessage } from './flashMessageActions';
import { ACTION_FAILED, ACTION_SUCCESS } from './types';

const setErrors = (status) => {
  if (status === true) {
    return {
      type: ACTION_FAILED,
      status
    };
  }
  return {
    type: ACTION_SUCCESS,
    status
  };
};


const handleSuccess = (successMessage) => {
  return (dispatch) => {
    dispatch(setErrors(false));
    dispatch(addFlashMessage(createMessage('success', successMessage)));
  };
};

const handleErrors = (errorMessage) => {
  return (dispatch) => {
    dispatch(setErrors(true));
    dispatch(addFlashMessage(createMessage('error', errorMessage)));
  };
};


export { handleErrors, handleSuccess };
