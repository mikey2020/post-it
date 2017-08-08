import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import open from 'open';
import compression from 'compression';
import bodyParser from 'body-parser';

import UserActions from '../server/controllers/userController';
import GroupActions from '../server/controllers/groupController';
import Unique from '../server/middlewares/unique';
import Validations from '../server/middlewares/validations';

const user = new UserActions();

/* eslint-disable no-console */

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('client/build'));

// user routes

// app.get('/api/users', user.allUsers);

app.post('/api/user/checkUser', UserActions.checkUserExists);

app.post('/api/user/resetPassword', UserActions.resetPassword);

app.post('/api/user/signup', UserActions.signup);

app.post('/api/user/signin', UserActions.signin);

// app.use('/api/user', userRoutes)(app);

app.post('/api/usergroups', Validations.authenticate, GroupActions.getGroupsUserIsMember);

app.post('/api/user', user.getUsers);

// group routes

app.get('/api/group/:groupId/messages', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupActions.getPosts);

app.post('/api/group', Validations.authenticate, GroupActions.createGroup);

// app.get('/api/group/:name', Validations.authenticate, group.checkGroups);

// app.get('/api/groups/user', Validations.authenticate, group.getUserGroups);

app.post('/api/group/:groupId/user', Validations.authenticate, Validations.checkGroupExists, Validations.checkUserIsValid, Unique.userGroups, GroupActions.addUserToGroup);

app.post('/api/group/:groupId/message', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupActions.postMessageToGroup);

app.get('/api/group/:groupId/users', Validations.checkGroupExists, GroupActions.getGroupMembers);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:', port);
  }
});
