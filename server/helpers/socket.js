/**
 * @class
 */
class Group {
  /**
   * @returns {void}
   * @param {Object} socket
   * @param {String} groupname - the name of group created user
   */
  constructor(socket) {
    this.socket = socket;
    this.socket.on('new group', (groupname) => {
      console.log(' am connected to this', groupname);
      const group = this.socket.of(`/${groupname}`);
      group.on('connection', () => {
        console.log('this group is connected');
      });
      group.emit('hi', 'everyone!');
    });
  };
  /**
   * @returns {void}
   */
  postMessage() {
    this.socket.on('new message posted', (message) => {
       console.log(message);
    });
  }
}

export default Group;
