// import express from 'express';

import UserActions from '../controllers/userController';

// userRoutes.
// const app = express();

const user = new UserActions();

export default (app) => {
  app.post('/signin', UserActions.signin);

  app.get('/:name', user.isUnique);

  app.post('/signup', UserActions.signup);
};


// user route

/* app.get('/api/users', user.allUsers);

app.get('/api/user/:name', user.isUnique);

app.post('/api/user/signup', user.signup);

app.post('/api/user/signin', user.signin); */
