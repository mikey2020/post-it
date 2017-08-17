import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import socketio from 'socket.io';
import http from 'http';

import GroupConnection from './helpers/socket';
import webpackConfig from '../webpack.config.dev';
import UserActions from './controllers/userController';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

dotenv.config();

const app = express();
const httpApp = http.Server(app);
const io = socketio(httpApp);
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

// const group = new GroupConnection(io);

// user routes
app.get('/api/users', user.allUsers);
userRoutes(app);

// group routes
groupRoutes(app);


app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

io.on('connection', (socket) => {
  console.log('socket is connected');
  socket.on('new message posted', (message) => {
    console.log(`${message} was just posted`);
  });
  socket.on('new group', (groupname) => {
    console.log(' am connected to this', groupname);
    const group = io.of(`/${groupname}`);
    group.on('connection', () => {
      console.log('this group is connected');
    });
    group.emit('hi', 'everyone!');
  });
});

httpApp.listen(port, () => {
  // console.log('Listening on port 3000...');
});


export { app, io };

