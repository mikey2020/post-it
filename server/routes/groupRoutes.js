import GroupController from '../controllers/groupController';
import Unique from '../middlewares/unique';
import Validations from '../middlewares/validations';

const group = new GroupController();

export default (app) => {
  app.get('/api/v1/group/:groupId/messages', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupController.getPosts);

  app.post('/api/v1/group', Validations.authenticate, GroupController.createGroup);

  app.get('/api/v1/group/:name', Validations.authenticate, group.checkGroups);

  app.get('/api/v1/groups/user', Validations.authenticate, group.getUserGroups);

  app.post('/api/v1/group/:groupId/user', Validations.authenticate, Validations.checkGroupExists, Validations.checkUserIsValid, Unique.userGroups, GroupController.addUserToGroup);

  app.post('/api/v1/group/:groupId/message', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupController.getGroupMembers, GroupController.postMessageToGroup);

  app.get('/api/v1/group/:groupId/users', Validations.checkGroupExists, GroupController.getGroupMembers, GroupController.AllGroupMembers);

  app.post('/api/v1/message/:messageId/readers', GroupController.getUsersWhoReadMessage);

  app.post('/api/v1/usergroups', Validations.authenticate, GroupController.getGroupsUserIsMember);

  app.get('/api/v1/user/notifications', Validations.authenticate, GroupController.getUserNotifications);

  app.post('/api/v1/user/:messageId/read', Validations.authenticate, Unique.checkMessageRead, GroupController.readMessage);
};
