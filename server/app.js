import dotenv from 'dotenv';

import express from 'express';

import morgan from 'morgan';

import bodyParser from 'body-parser';

import session from 'express-session';

import UserActions from './controllers/userController';

import GroupActions from './controllers/groupController';

import Unique from './middlewares/unique';

import Validations from './middlewares/validations';

dotenv.config();

const app = express();

const port = process.env.PORT;

const group = new GroupActions();

const user = new UserActions();

const checkUnique = new Unique();

const validate = new Validations();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true

}));

// user routes

app.get('/api/users', user.allUsers);

app.get('/api/user/:name', user.isUnique);

app.post('/api/user/signup', user.signup);

app.post('/api/user/signin', user.signin);

// group routes

app.post('/api/group', validate.authenticate, group.createGroup);

app.get('/api/group/:name', validate.authenticate, group.checkGroups);

app.get('/api/groups/user', validate.authenticate, group.getUserGroups);

app.post('/api/group/:groupId/user', validate.checkGroupExists, validate.isGroupMember, validate.authenticate, validate.checkUserIsValid, checkUnique.userGroups, group.addUserToGroup);

app.post('/api/group/:groupId/message', validate.checkGroupExists, validate.isGroupMember, validate.authenticate, group.postMessageToGroup);

app.get('/api/group/:groupId/messages', validate.checkGroupExists, validate.isGroupMember, validate.authenticate, group.getPosts);

app.get('/api/group/:groupId/users', validate.checkGroupExists, group.getGroupMembers);

app.get('/api/group/:username/usergroups', group.getNumberOfGroups);


app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  // console.log('Listening on port 3000...');
});


export default app;

