import UserController from '../controllers/userController';

const userRoutes = (app) => {
  app.get('/api/v1/users', UserController.allUsers);

  app.post('/api/v1/user/checkUser', UserController.checkUserExists);

  app.post('/api/v1/user/resetPassword', UserController.resetPassword);

  app.post('/api/v1/user/verifyCode', UserController.checkVerificationCode);

  app.post('/api/v1/user/signup', UserController.signup);

  app.post('/api/v1/user/signin', UserController.signin);

  app.post('/api/v1/user', UserController.getUsers);
};

export default userRoutes;
