import GroupController from '../controllers/groupController';
import Unique from '../middlewares/unique';
import Validations from '../middlewares/validations';

const group = new GroupController();

export default (app) => {
  app.get('/api/v1/group/:groupId/messages', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupController.getPosts);

  app.post('/api/v1/group', Validations.authenticate, GroupController.createGroup);

  app.get('/api/v1/group/:name', Validations.authenticate, group.checkGroupName);

  app.post('/api/v1/group/:groupId/user', Validations.authenticate, Validations.checkGroupExists, Validations.checkUserIsValid, Unique.isAlreadyGroupMember, GroupController.addUserToGroup);

  app.post('/api/v1/group/:groupId/message', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupController.getGroupMembers, GroupController.postMessageToGroup);

  app.get('/api/v1/group/:groupId/users', Validations.checkGroupExists, GroupController.getGroupMembers, GroupController.allGroupMembers);

  app.post('/api/v1/message/:messageId/readers', GroupController.getUsersWhoReadMessage);

  app.post('/api/v1/usergroups', Validations.authenticate, GroupController.getGroupsUserIsMember);

  app.get('/api/v1/user/notifications', Validations.authenticate, GroupController.getUserNotifications);

  app.delete('/api/v1/user/delete/notifications', Validations.authenticate, GroupController.deleteNotifications);

  app.post('/api/v1/user/:messageId/read', Validations.authenticate, GroupController.readMessage);

  app.get('/api/v1/user/:groupId/unreadMessages', Validations.authenticate, GroupController.getUnreadMessagesNumber);
};
