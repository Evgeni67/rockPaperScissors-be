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
      console.log("name -> ",name);

      // send the message to all the people in that room
      io.emit("login", {name:name});
    });
    socket.on("challange", async (challange) => {
      console.log("SOCKET IS WORKING");
      // send challange
      io.emit("challange", challange);
    });
    socket.on("acceptChallange", async (challange) => {
      console.log("SOCKET IS WORKING");
      // send challange
      io.emit("acceptChallange", challange);
    });
    socket.on("placeCard", async (move) => {
      console.log("CARD PLACED CARD PLACED", move);
      // send challange
      io.emit("placeCard", move);
    });
  });
};

module.exports = createSocketServer;
