const postMessage = (io) => {
  io.on('connection', (socket) => {
    socket.emit('post message', 'hello');
  });
};

export default postMessage;
