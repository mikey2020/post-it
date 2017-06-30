'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _db = require('./db');

var _userController = require('./controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _groupController = require('./controllers/groupController');

var _groupController2 = _interopRequireDefault(_groupController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

dotenv.config();

var app = (0, _express2.default)();

var port = process.env.PORT;

var group = new _groupController2.default();

var user = new _userController2.default();

_db.sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.error('Unable to connect to the database:', err);
});

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

app.post('/api/user/signup', user.signup);

app.post('/api/user/signin', user.signin);

// group routes

app.post('/api/group', group.createGroup);

app.get('/api/group/:name', group.checkGroups);

app.get('/api/groups/:username', group.getUserGroups);

app.post('/api/group/:groupId/user', group.addUserToGroup);

app.post('/api/group/:groupId/message', group.postMessageToGroup);

app.get('/api/group/:groupId/messages', group.getPosts);

app.get('/api/group/:username/usergroups', group.getNumberOfGroups);


app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port, function () {
  console.log('Listening on port 3000...');
});

exports.default = app;