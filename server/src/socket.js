function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    socket.emit("connected", { id: socket.id });
  });
}

module.exports = {
  registerSocketHandlers,
};
