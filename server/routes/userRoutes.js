import UserActions from '../controllers/userController';

const userRoutes = (app) => {
  app.post('/api/v1/user/checkUser', UserActions.checkUserExists);

  app.post('/api/v1/user/resetPassword', UserActions.resetPassword);

  app.post('/api/v1/user/signup', UserActions.signup);

  app.post('/api/v1/user/signin', UserActions.signin);

  app.post('/api/v1/user', UserActions.getUsers);
};

export default userRoutes;
