  var express = require('express');
  var socket = require("socket.io");

// App setup
var app = express();
var server = app.listen(8080, function(){
});

// Static files
app.use(express.static('assets'));

//socket setup
var io = socket(server);

io.on("connection", function (socket){
    console.log("made socket connection", socket.id);

    socket.on("start", function(data){
    io.sockets.emit("startResponse");
  })

    socket.on("stage2", function (data){
      io.sockets.emit("stage2", data);
    })

    socket.on("stage1", function (data){
      io.sockets.emit("stage1", data);
    })

    socket.on("deck1", function (data){
      io.sockets.emit("deck1", data);
    })

    socket.on("deck2", function (data){
      io.sockets.emit("deck2", data);
    })

    socket.on("bid1", function (data){
      io.sockets.emit("bid1", data);
    })

    socket.on("bid2", function (data){
      io.sockets.emit("bid2", data);
    })

    socket.on("stage4.1", function (data){
      io.sockets.emit("stage4.1", data);
    })

    socket.on("stage4.2", function (data){
      io.sockets.emit("stage4.2", data);
    })

    socket.on("finish1", function(){
      io.sockets.emit("finish1");
    })

    socket.on("finish2", function(){
      io.sockets.emit("finish2");
    })

    socket.on("newRound", function(){
      io.sockets.emit("newRound");
    })
})

