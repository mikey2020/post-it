import expect from 'expect';
import reducer from '../../src/reducers/flashMessage';
import * as types from '../../src/actions/types';


describe('Flash message reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle DELETE_FLASH_MESSAGE', () => {
    expect(
      reducer([], {
        type: types.DELETE_FLASH_MESSAGE,
        id: 2
      })
    ).toEqual([]);
  });
});
