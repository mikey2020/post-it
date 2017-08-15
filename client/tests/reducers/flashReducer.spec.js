import expect from 'expect';
import reducer from '../../src/reducers/flashMessage';
import * as types from '../../src/actions/types';


describe('Flash message reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_FLASH_MESSAGE', () => {
    expect(
      reducer([], {
        type: types.ADD_FLASH_MESSAGE,
        message: { type: 'success', text: 'you are signed in' }
      })
    ).toEqual([
      {
        type: 'success',
        text: 'you are signed in'
      }
    ]);

    expect(
      reducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
        {
          type: types.ADD_TODO,
          text: 'Run the tests'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ]);
  });
});
