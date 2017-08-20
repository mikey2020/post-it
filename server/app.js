import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { app, httpApp } from './helpers/socket';
import webpackConfig from '../webpack.config.dev';
import UserActions from './controllers/userController';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

dotenv.config();

const port = process.env.PORT;
const user = new UserActions();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.get('/api/users', user.allUsers);
userRoutes(app);
groupRoutes(app);


app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});


httpApp.listen(port, () => {});


export default app;

