import express from 'express';
import http from 'http';

const app = express();
const httpApp = http.Server(app);

export { app, httpApp };
