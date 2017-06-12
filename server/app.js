'use strict';

import * as dotenv from 'dotenv';

import express from 'express';

import {sequelize} from './db.js';

import {home,signup,allUsers} from './controllers/userController';

import morgan from 'morgan';

import * as bodyParser from 'body-parser';

//import debug from 'debug';


dotenv.config();

const app = express();

const port = process.env.PORT  ;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//app.use('/',home);


app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.get('/api/users',allUsers);


app.post('/api/user/signup',signup);


//method to get error

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

/*app.use( (req, res, next) =>  {
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
  console.log(err.status);
  console.log(err.message);
});*/


app.listen(port, () => {
  console.log('Listening on port 3000...')
});