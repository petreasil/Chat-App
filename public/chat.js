//make conection
var socket = io.connect("http://localhost:4000");

//query dom

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

//event emitter

btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});
//event for keypressed

message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value); //send data to the server
});

//listern for events
socket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + "is typing a message...</em></p>";
});
