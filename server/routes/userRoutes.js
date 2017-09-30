import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userRoutes = (app) => {
  app.get('/api/v1/users', Validations.authenticate, UserController.getUsers);

  app.post('/api/v1/user/checkUser', UserController.checkUserExists);

  app.post('/api/v1/user/setCode', UserController.setVerificationCode);

  app.post('/api/v1/user/verifyCode', UserController.checkVerificationCode);

  app.post('/api/v1/user/signup',
  UserController.isAlreadyUser, UserController.signUp);

  app.post('/api/v1/user/signin', UserController.signIn);
};

export default userRoutes;
