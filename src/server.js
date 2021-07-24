const express = require("express");
const cors = require("cors");
const http = require("http")
const createSocketServer = require("./socket")
const mongoose = require("mongoose");
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./services/utilities/errorHandling");
const profileRouter = require("./services/profiles");
const convoRouter = require("./services/messages");
const battlesRouter = require("./services/battles");
const server = express();
const httpServer = http.createServer(server)
createSocketServer(httpServer)
const port = process.env.PORT || 3002;


server.use(express.json({ limit: "50mb" }));
server.use(cors());

server.use(express.json());
server.use("/profiles",profileRouter)
server.use("/convos",convoRouter)
server.use("/battles",battlesRouter)
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    httpServer.listen(port, () => {
      console.log("Running on port", port)
    })
  );
