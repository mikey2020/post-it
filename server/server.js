import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const httpApp = http.Server(app);

app.use(express.static(path.join(__dirname, '../client')));

export { app, httpApp };
