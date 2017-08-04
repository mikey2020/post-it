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

app.post('/api/user/signup', UserActions.signup);

app.post('/api/user/signin', UserActions.signin);

// app.use('/api/user', userRoutes)(app);

// group routes

app.post('/api/group', Validations.authenticate, GroupActions.createGroup);

app.get('/api/group/:name', Validations.authenticate, group.checkGroups);

app.get('/api/groups/user', Validations.authenticate, group.getUserGroups);

app.post('/api/group/:groupId/user', Validations.authenticate, Validations.checkGroupExists, Validations.checkUserIsValid, Unique.userGroups, GroupActions.addUserToGroup);

app.post('/api/group/:groupId/message', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupActions.postMessageToGroup);

app.get('/api/group/:groupId/messages', Validations.authenticate, Validations.checkGroupExists, Validations.isGroupMember, GroupActions.getPosts);

app.get('/api/group/:groupId/users', Validations.checkGroupExists, GroupActions.getGroupMembers);

app.get('/api/group/:username/usergroups', group.getNumberOfGroups);


app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  // console.log('Listening on port 3000...');
});


export default app;

