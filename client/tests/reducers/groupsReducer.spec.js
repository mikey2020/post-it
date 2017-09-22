import expect from 'expect';
import reducer from '../../src/reducers/groups';
import * as types from '../../src/actions/types';


describe('Groups reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should return  a new state for case `ADD_USER_GROUPS` ', () => {
    expect(reducer([], {
      type: types.ADD_USER_GROUPS,
      groups: [{ id: 1, groupName: 'tarly house', groupCreator: 'mikey', }]

    })).toEqual(
       [{ creator: 'mikey', id: 1, name: 'tarly house' }]
    );
  });

  it('should return  a new state for case `ADD_GROUP` ', () => {
    expect(reducer([], {
      type: types.ADD_GROUP,
      group: { id: 1, groupName: 'tarly house', groupCreator: 'mikey' }

    })).toEqual(
       [{ creator: 'mikey', id: 1, name: 'tarly house' }]
    );
  });
});
