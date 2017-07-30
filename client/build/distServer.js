import express from 'express';

import path from 'path';

import open from 'open';

import dotenv from 'dotenv';

import compression from 'compression';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(compression());
app.use(express.static('client/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});