import {ADD_FLASH_MESSAGE} from './types'

const addFlashMessage = (message) => {
	return {
		type: ADD_FLASH_MESSAGE,
		message
	}
}

export default addFlashMessage;