export default (io) => {
  io.on('connection', (socket) => {
    socket.on('post message', (data) => {
       console.log('poted message', data);
    });
  });
};
