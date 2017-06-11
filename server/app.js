//require('dotenv').config();
import * as babel from 'babel-core';
babel.transform("code", options);
import * as dotenv from 'dotenv';

import * as express from 'express';
dotenv.config();



const app = express();

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});