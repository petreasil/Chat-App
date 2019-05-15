var express = require("express");
var socket = require("socket.io");
//App setup
var app = express();

//create server

var server = app.listen(4000, function() {
  console.log("listen to port 4000");
});

// static files (HTML)

app.use(express.static("public"));

//setup socket.io

var io = socket(server);
io.on("connection", function(socket) {
  console.log("made  socket connection", socket.id);
  //Handle Chat Event
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });
  //handle typing Event
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
