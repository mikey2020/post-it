import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

const subscribeToTimer = (interval, cb) => {
  socket.on('postMessage', data => cb(null, data));
};

export default subscribeToTimer;
