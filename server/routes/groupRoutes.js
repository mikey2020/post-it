import GroupActions from '../controllers/groupController';
import Unique from '../middlewares/unique';
import Validations from '../middlewares/validations';

const group = new GroupActions();

export default (app) => {
  app.get('/api/group/:groupId/messages', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupActions.getPosts);

  app.post('/api/group', Validations.authenticate, GroupActions.createGroup);

  app.get('/api/group/:name', Validations.authenticate, group.checkGroups);

  app.get('/api/groups/user', Validations.authenticate, group.getUserGroups);

  app.post('/api/group/:groupId/user', Validations.authenticate, Validations.checkGroupExists, Validations.checkUserIsValid, Unique.userGroups, GroupActions.addUserToGroup);

  app.post('/api/group/:groupId/message', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupActions.getGroupMembers, GroupActions.postMessageToGroup);

  app.get('/api/group/:groupId/users', Validations.checkGroupExists, GroupActions.getGroupMembers, GroupActions.AllGroupMembers);

  app.post('/api/message/:messageId/readers', GroupActions.getUsersWhoReadMessage);

  app.post('/api/usergroups', Validations.authenticate, GroupActions.getGroupsUserIsMember);

  app.post('/api/user/:messageId/read', Validations.authenticate, Unique.checkMessageRead, GroupActions.readMessage);
};
