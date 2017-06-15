'use strict';

import * as dotenv from 'dotenv';

import express from 'express';

import {sequelize} from './db.js';

import {signup,allUsers,signin} from './controllers/userController';

import {createGroup,addUserToGroup,postMessageToGroup,getPosts} from './controllers/groupController';

import morgan from 'morgan';

import * as bodyParser from 'body-parser';

import session from 'express-session';

import webpack from 'webpack';

import webpackMiddleware from 'webpack-dev-middleware';

import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config.dev';

import path from 'path';


dotenv.config();

const app = express();

const port = process.env.PORT  ;

const compiler = webpack(webpackConfig);

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

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true

}));

app.use(webpackMiddleware(compiler,{
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/api/users',allUsers);


app.post('/api/user/signup',signup);

app.post('/api/user/signin',signin);

app.post('/api/group',createGroup);

app.post('/api/group/:groupId/user',addUserToGroup);

app.post('/api/group/:groupId/message',postMessageToGroup);

app.get('/api/group/:groupId/messages',getPosts);

app.get('/*',(req,res) => {
  res.sendFile(path.join(process.cwd() + '/client/index.html'));
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
  console.log('Listening on port 3000...')
});


export default app ;