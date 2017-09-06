import { addFlashMessage, createMessage } from './flashMessageActions';
import { ACTION_FAILED, ACTION_SUCCESS } from './types';

const setErrors = (payload) => {
  if (payload.status === true) {
    return {
      type: ACTION_FAILED,
      payload
    };
  }
  return {
    type: ACTION_SUCCESS,
    payload
  };
};


const handleSuccess = (successMessage, actionName) => (dispatch) => {
  dispatch(setErrors({ status: false, actionName }));
  if (successMessage !== null) {
    dispatch(addFlashMessage(createMessage('success', successMessage)));
  }
};

const handleErrors = (errorMessage, actionName) => (dispatch) => {
  dispatch(setErrors({ status: true, actionName }));
  if (errorMessage !== null) {
    dispatch(addFlashMessage(createMessage('error', errorMessage)));
  }
};


export { handleErrors, handleSuccess };
