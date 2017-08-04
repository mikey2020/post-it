'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// userRoutes.
// const app = express();

var user = new _userController2.default(); // import express from 'express';

exports.default = function (app) {
  app.post('/signin', _userController2.default.signin);

  app.get('/:name', user.isUnique);

  app.post('/signup', _userController2.default.signup);
};

// user route

/* app.get('/api/users', user.allUsers);

app.get('/api/user/:name', user.isUnique);

app.post('/api/user/signup', user.signup);

app.post('/api/user/signin', user.signin); */