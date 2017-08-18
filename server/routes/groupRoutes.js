import GroupController from '../controllers/groupController';
import Unique from '../middlewares/unique';
import Validations from '../middlewares/validations';

const group = new GroupController();

export default (app) => {
  app.get('/api/group/:groupId/messages', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupController.getPosts);

  app.post('/api/group', Validations.authenticate, GroupController.createGroup);

  app.get('/api/group/:name', Validations.authenticate, group.checkGroups);

  app.get('/api/groups/user', Validations.authenticate, group.getUserGroups);

  app.post('/api/group/:groupId/user', Validations.authenticate, Validations.checkGroupExists, Validations.checkUserIsValid, Unique.userGroups, GroupController.addUserToGroup);

  app.post('/api/group/:groupId/message', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupController.getGroupMembers, GroupController.postMessageToGroup);

  app.get('/api/group/:groupId/users', Validations.checkGroupExists, GroupController.getGroupMembers, GroupController.AllGroupMembers);

  app.post('/api/message/:messageId/readers', GroupController.getUsersWhoReadMessage);

  app.post('/api/usergroups', Validations.authenticate, GroupController.getGroupsUserIsMember);

  app.get('/api/notifications', Validations.authenticate, GroupController.getUserNotifications);

  app.post('/api/user/:messageId/read', Validations.authenticate, Unique.checkMessageRead, GroupController.readMessage);
};
