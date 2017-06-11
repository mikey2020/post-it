'use strict';

//require('dotenv').config();

//import * as babel from 'babel-core';

//babel.transform("code();", options);

//import * as dotenv from 'dotenv'

import express from 'express';

const app = express();

app.use( (req, res, next) =>  {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

app.use((err, req, res, next) => {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  console.log(err);
});

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
  console.log('Listening on port 3000...')
});