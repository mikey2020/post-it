'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _userController = require('./controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _groupController = require('./controllers/groupController');

var _groupController2 = _interopRequireDefault(_groupController);

var _unique = require('./middlewares/unique');

var _unique2 = _interopRequireDefault(_unique);

var _validations = require('./middlewares/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

var port = process.env.PORT;

var group = new _groupController2.default();

var user = new _userController2.default();

var checkUnique = new _unique2.default();

var validate = new _validations2.default();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_bodyParser2.default.json());

app.use((0, _expressSession2.default)({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true

}));

// user routes
app.get('/api/users', user.allUsers);

app.get('/api/user/:name', user.isUnique);

app.post('/api/user/signup', _userController2.default.signup);

app.post('/api/user/signin', _userController2.default.signin);

// app.use('/api/user', userRoutes)(app);

// group routes

app.post('/api/group', _validations2.default.authenticate, _groupController2.default.createGroup);

app.get('/api/group/:name', _validations2.default.authenticate, group.checkGroups);

app.get('/api/groups/user', _validations2.default.authenticate, group.getUserGroups);

app.post('/api/group/:groupId/user', _validations2.default.authenticate, _validations2.default.checkGroupExists, _validations2.default.checkUserIsValid, checkUnique.userGroups, _groupController2.default.addUserToGroup);

app.post('/api/group/:groupId/message', _validations2.default.authenticate, _validations2.default.checkGroupExists, _validations2.default.isGroupMember, _groupController2.default.postMessageToGroup);

app.get('/api/group/:groupId/messages', _validations2.default.authenticate, _validations2.default.checkGroupExists, _validations2.default.isGroupMember, _groupController2.default.getPosts);

app.get('/api/group/:groupId/users', _validations2.default.checkGroupExists, _groupController2.default.getGroupMembers);

app.get('/api/group/:username/usergroups', group.getNumberOfGroups);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port, function () {
  // console.log('Listening on port 3000...');
});

exports.default = app;