import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import open from 'open';
import compression from 'compression';
import bodyParser from 'body-parser';

import groupRoutes from '../server/routes/groupRoutes';
import userRoutes from '../server/routes/userRoutes';
import { app, httpApp } from '../server/helpers/socket';

/* eslint-disable no-console */

dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('client/build'));

groupRoutes(app);
userRoutes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

httpApp.listen(port || 3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:', port);
  }
});
