'use strict';

//require('dotenv').config();

//import * as babel from 'babel-core';

//babel.transform("code();", options);

//import * as dotenv from 'dotenv'

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var sequelize = new _sequelize2.default('postgres://root:theflash@localhost:5432/post-it');

sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.error('Unable to connect to the database:', err);
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  console.log(err);
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on port 3000...');
});