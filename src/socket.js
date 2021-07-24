const socketio = require("socket.io");



const createSocketServer = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log(`New socket connection --> ${socket.id}`);
    socket.on("sendMsg", async (messageContent) => {
      // when a client sends a message
     console.log("SOCKET IS WORKING");

      // send the message to all the people in that room
      io.emit("sendMsg", messageContent);
    });
    socket.on("logOut", async (name) => {
      // when a client sends a message
     console.log("SOCKET IS WORKING");

      // send the message to all the people in that room
      io.emit("logOut", name);
    });
    socket.on("login", async (name) => {
      // when a client sends a message
     console.log("SOCKET IS WORKING");

      // send the message to all the people in that room
      io.emit("login", name);
    });
    socket.on("battleChallange", async (from,to) => {
      // when a client sends a message
     console.log("SOCKET IS WORKING");
      // send challange 
      var challange = {from : from, to:to}
      io.emit("challange", challange);
    });
  });
};

module.exports = createSocketServer;
