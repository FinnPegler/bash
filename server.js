  var express = require('express');
  var socket = require("socket.io");
  var func = require("./functions.js");

// App setup
var app = express();
var server = app.listen(8080, function(){
    console.log('listening for requests on port 8080');
});

// Static files
app.use(express.static('assets'));

//socket setup
var io = socket(server);

io.on("connection", function (socket){
    console.log("made socket connection", socket.id);
    socket.on("start", startGame)
    io.sockets.emit("start", {
      arr1: arr1,
      arr2: arr2,
      deck1: deck1,
      deck2: deck2
    })
})

function startGame (){
func.createFullDecks();
func.createPlayerDecks();
console.log("Game start event fired from client to server and decks created")
console.log(arr1);
}