const http = require("http").createServer();
const io = require("socket.io")(http);

io.on("connect", socket => {
  socket.on("livechatping", () => {
    socket.emit("livechatpong");
  });
  socket.on("message", msg => {
    socket.broadcast.emit("message", msg);
  });
  socket.on("myjoin", name => {
    console.log(name + " joined the chat. - " + socket.id)
    socket.broadcast.emit("join", name);
    socket.emit("join", name);
  });
  socket.on("myleave", name => {
    console.log(name + " left the chat. - " + socket.id);
    socket.broadcast.emit("leave", name);
    socket.emit("leave", name);
  });
  //socket.on("disconnect", () => {
  //  console.log(socket.id + " disconnected.")
  //});
});

http.listen(3001);