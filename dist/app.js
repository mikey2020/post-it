'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _userController = require('./controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _userRoutes = require('./routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _groupRoutes = require('./routes/groupRoutes');

var _groupRoutes2 = _interopRequireDefault(_groupRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

var port = process.env.PORT;

var user = new _userController2.default();

if (process.env.NODE_ENV === 'development') {
  var compiler = (0, _webpack2.default)(_webpackConfig2.default);

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    hot: true,
    publicPath: _webpackConfig2.default.output.publicPath,
    noInfo: true
  }));

  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

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

(0, _userRoutes2.default)(app);

// group routes
(0, _groupRoutes2.default)(app);

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(process.cwd(), '/client/index.html'));
});

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port, function () {
  // console.log('Listening on port 3000...');
});

exports.default = app;