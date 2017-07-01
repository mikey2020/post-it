import * as dotenv from 'dotenv';

import express from 'express';

import morgan from 'morgan';

import bodyParser from 'body-parser';

import session from 'express-session';

import path from 'path';

import { sequelize } from './db';

import UserActions from './controllers/userController';

import GroupActions  from './controllers/groupController';

dotenv.config();

const app = express();

const port = process.env.PORT;

const group = new GroupActions();

const user = new UserActions();


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });



  /*app.use(express.static(process.cwd() + '/clients/build'));

  app.get('/', (req, res) => {
    //res.sendFile(path.join('index.html'));
    res.sendFile('/index.html');
  });*/

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true

}));

if(process.env.NODE_ENV === 'production') {
  //app.use(express.static(process.cwd() + '/clients/build'));

  app.get('/', (req, res) => {
    //res.sendFile(path.join('index.html'));
    res.sendFile(process.cwd() + '/clients/build/index.html');
  });

}

// user routes

app.get('/api/users', user.allUsers);

app.get('/api/user/:name', user.isUnique);

app.post('/api/user/signup', user.signup);

app.post('/api/user/signin', user.signin);

// group routes

app.post('/api/group', group.createGroup);

app.get('/api/group/:name', group.checkGroups);

app.get('/api/groups/:username', group.getUserGroups);

app.post('/api/group/:groupId/user', group.addUserToGroup);

app.post('/api/group/:groupId/message', group.postMessageToGroup);

app.get('/api/group/:groupId/messages', group.getPosts);

app.get('/api/group/:username/usergroups',group.getNumberOfGroups);


app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  console.log('Listening on port 8080...');
});


export default app ;

