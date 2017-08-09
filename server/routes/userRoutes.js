import UserActions from '../controllers/userController';

const userRoutes = (app) => {
  app.post('/api/user/checkUser', UserActions.checkUserExists);

  app.post('/api/user/resetPassword', UserActions.resetPassword);

  app.post('/api/user/signup', UserActions.signup);

  app.post('/api/user/signin', UserActions.signin);

  app.post('/api/user', UserActions.getUsers);
};

export default userRoutes;
