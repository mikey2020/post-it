import expect from 'expect';
import reducer from '../../src/reducers/messages';
import * as types from '../../src/actions/types';


describe('Messages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should return  a new state for case `ADD_GROUP_MESSAGES` ', () => {
    expect(reducer([], {
      type: types.ADD_GROUP_MESSAGES,
      messages: [{ id: 1,
        content: 'tarly house',
        groupId: 3,
        priority: 'normal',
        messageCreator: 'mike' }]

    })).toEqual(
      [{ id: 1,
        content: 'tarly house',
        priority: 'normal',
        groupId: 3,
        creator: 'mike',
        timeCreated: undefined }]
    );
  });

  it('should return a new state for case `ADD_MESSAGE`', () => {
    expect(reducer([], {
      type: types.ADD_MESSAGE,
      message: { id: 1,
        content: 'tarly house',
        priority: 'normal',
        groupId: 3,
        messageCreator: 'mike',
        timeCreated: undefined }
    })).toEqual(
      [{ id: 1,
        content: 'tarly house',
        priority: 'normal',
        groupId: 3,
        creator: 'mike',
        timeCreated: undefined }]
    );
  });
});
