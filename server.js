let arr1 = []; let arr2 = [];
let deck1 = []; let deck2 = [];
let hand1 = []; let hand2 = [];  
  
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
      console.log("server recieved stage2")
      io.sockets.emit("stage2", data);
    })

    socket.on("stage1", function (data){
      console.log("server recieved stage1")
      io.sockets.emit("stage1", data);
    })

})

