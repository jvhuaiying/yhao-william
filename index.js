const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000;
app.use(express.static(__dirname + '/public'));
io.on("connection", (socket) => {
  const room = "gameRoom";
  socket.join(room);
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    socket.leave(room);
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
