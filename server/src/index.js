const http = require("node:http");
const { Server } = require("socket.io");
const { createApp } = require("./app");
const { createJobQueue } = require("./queue");
const { registerSocketHandlers } = require("./socket");

const port = process.env.PORT || 4000;
const host = process.env.HOST || "127.0.0.1";
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5175";

const app = createApp({ clientOrigin });
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"],
  },
});

const jobs = createJobQueue(io);
app.locals.jobs = jobs;
registerSocketHandlers(io);

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
