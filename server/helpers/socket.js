export default (io) => {
  io.on('connection', (socket) => {
    console.log('socket is connected');
    socket.on('new message posted', (message) => {
      console.log(`${message} was just posted`);
    });
    socket.on('new group', (groupname) => {
      console.log('groupname');
    });
    socket.on('new message posted', (message) => {
      
    })
  });
};
