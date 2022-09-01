global.onlineUsers = new Map();

const socketServer = (io) => {
  io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("new-user", (uid) => {
      onlineUsers.set(uid, socket.id);
    });

    socket.on("new-msg", (data) => {
      const recieverSocketId = onlineUsers.get(data.to);
      delete data.to;

      if (recieverSocketId) {
        socket.to(recieverSocketId).emit("msg-recieved", data);
      }
    });
  });
};

export default socketServer;
