import expect from 'expect';
import * as actions from '../../src/actions/flashMessageActions';
import * as types from '../../src/actions/types';

describe('Flash Message action', () => {
  it('should create an action to add a flash message', () => {
    const message = { type: 'success', text: 'you are signed in' };
    const expectedAction = {
      type: types.ADD_FLASH_MESSAGE,
      message
    };
    expect(actions.addFlashMessage(message)).toEqual(expectedAction);
  });
});
