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
    //socket.on("start", startGame);
    socket.on("start", function(data){
    io.sockets.emit("startResponse");
  })
})