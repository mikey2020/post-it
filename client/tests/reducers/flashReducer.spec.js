import expect from 'expect';
import reducer from '../../src/reducers/flashMessage';
import * as types from '../../src/actions/types';


describe('Flash message reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  // it('should handle ADD_FLASH_MESSAGE', () => {
  //   expect(
  //     reducer([], {
  //       type: types.ADD_FLASH_MESSAGE,
  //       message: { type: 'success', text: 'you are signed in' }
  //     })
  //   ).toEqual([
  //     {
  //       type: 'success',
  //       text: 'you are signed in',
  //       id: 1
  //     }
  //   ]);

  //   expect(
  //     reducer(
  //       [
  //         {
  //           text: 'Use Redux',
  //           completed: false,
  //           id: 0
  //         }
  //       ],
  //       {
  //         type: types.ADD_FLASH_MESSAGE,
  //         message: { type: 'success', text: 'Run the tests' }
  //       }
  //     )
  //   ).toEqual([
  //     { text: 'Use Redux', completed: false, id: 0 }, { id: 1, type: 'success', text: 'Run the tests' }
  //   ]);
  // });

  it('should handle DELETE_FLASH_MESSAGE', () => {
    expect(
      reducer([], {
        type: types.DELETE_FLASH_MESSAGE,
        id: 2
      })
    ).toEqual([]);
  });
});
