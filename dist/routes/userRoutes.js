'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = function userRoutes(app) {
  app.post('/api/user/checkUser', _userController2.default.checkUserExists);

  app.post('/api/user/resetPassword', _userController2.default.resetPassword);

  app.post('/api/user/signup', _userController2.default.signup);

  app.post('/api/user/signin', _userController2.default.signin);

  app.post('/api/user', _userController2.default.getUsers);
};

exports.default = userRoutes;