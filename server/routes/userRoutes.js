import UserController from '../controllers/userController';

const userRoutes = (app) => {
  app.post('/api/v1/users', UserController.getUsers);

  app.post('/api/v1/user/checkUser', UserController.checkUserExists);

  app.post('/api/v1/user/resetPassword', UserController.resetPassword);

  app.post('/api/v1/user/verifyCode', UserController.checkVerificationCode);

  app.post('/api/v1/user/signup', UserController.signup);

  app.post('/api/v1/user/signin', UserController.signin);
};

export default userRoutes;
