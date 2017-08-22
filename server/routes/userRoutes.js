import UserController from '../controllers/userController';

const userRoutes = (app) => {
  app.post('/api/user/checkUser', UserController.checkUserExists);

  app.post('/api/user/resetPassword', UserController.resetPassword);

  app.post('/api/user/signup', UserController.signup);

  app.post('/api/user/signin', UserController.signin);

  app.post('/api/user', UserController.getUsers);
};

export default userRoutes;
