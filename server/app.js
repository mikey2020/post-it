'use strict';

import * as dotenv from 'dotenv';

import express from 'express';

import {sequelize} from './db.js';

import {home,signup,allUsers,signin} from './controllers/userController';

import {createGroup} from './controllers/groupController';

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

app.post('/api/user/signin',signin);

app.post('/api/group',createGroup);


//method to get error

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
  console.log('Listening on port 3000...')
});