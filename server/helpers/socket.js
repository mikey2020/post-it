import socketio from 'socket.io';
import winston from 'winston';
import { httpApp, app } from '../server';

const io = socketio(httpApp);
app.io = io;

io.on('connection', (socket) => {
  winston.log('socket is connected');
  socket.emit('connection is alive', {
    message: 'connection is alive',
  });
});

export { app, httpApp };
