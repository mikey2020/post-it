import models from '../models';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('socket is connected');
    socket.on('new message posted', (message) => {
      console.log('====================>', message);
      console.log(`${message} was just posted in`);
    });
  });
};
