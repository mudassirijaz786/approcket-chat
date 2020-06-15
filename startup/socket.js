module.exports = function (app) {
  const http = require("http").createServer(app);
  var io = require("socket.io")(http);

  io.on("connection", (socket) => {
    socket.on("newUser", async (user) => {
      io.emit("newUser", user);
    });
    socket.on("newMessage", async (message) => {
      io.emit("newMessage", message);
    });
    socket.on("read", async (message) => {
      io.emit("read", message);
    });

    // socket.on("notification", async (notification) => {
    //   // socket.join(room);
    //   notification["created_at"] = new Date().toString();
    //   // console.log(new Date().toString());
    //   notification.notification["time"] = new Date().toString();
    //   io.emit("notification", notification);
    // });
  });
};
