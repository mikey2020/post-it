import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import open from 'open';
import compression from 'compression';
/* eslint-disable no-console */

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(compression());
app.use(express.static('client/build'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
