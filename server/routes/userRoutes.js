import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userRoutes = (app) => {
  app.get('/api/v1/users', Validations.authenticate, UserController.getUsers);

  app.post('/api/v1/user/check-user', UserController.checkUserExists);

  app.post('/api/v1/user/set-code', UserController.setVerificationCode);

  app.post('/api/v1/user/verify-code', UserController.checkVerificationCode);

  app.post('/api/v1/user/signup',
  Validations.isAlreadyUser, UserController.signUp);

  app.post('/api/v1/user/signin', UserController.signIn);

  app.get('/api/v1/user/notifications', Validations.authenticate,
  UserController.getUserNotifications);

  app.delete('/api/v1/user/delete/notifications', Validations.authenticate,
  UserController.deleteNotifications);

  app.post('/api/v1/user/verify-token', Validations.authenticate,
  UserController.verifyToken);
};

export default userRoutes;
