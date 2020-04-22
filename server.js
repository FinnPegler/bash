  var express = require('express');
  var socket = require("socket.io");
  let newRoundCounter = 0;
  let newRoundCounter2 = 0;
  let finishCounter = 0;
  let handEmptyCounter1 = 0;
  let handEmptyCounter2 = 0;
  let lastBuy1 = 0;
  let lastBuy2 = 0;
  

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
    newRoundCounter = 0;
    newRoundCounter2 = 0;
    finishCounter = 0;
    handEmptyCounter1 = 0;
    handEmptyCounter2 = 0;
    lastBuy1 = 0;
    lastBuy2 = 0;
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

    //function that listens for a signal from player 1 that his buy phase is over. 
//If player 2 has previously signalled then finish command emitted which brings a new flop
    socket.on("finish1", function(){
      finishCounter += 1;
      if (finishCounter === 2){
        io.sockets.emit("finish");
        finishCounter = 0;
        console.log("finish command 1 sent");
      }
    })

    //function that listens for a signal from player 2 that his buy phase is over. 
//If player 1 has previously signalled then finish command emitted which brings a new flop
    socket.on("finish2", function(){
      finishCounter += 1;
      if (finishCounter === 2){
        io.sockets.emit("finish");
        finishCounter = 0;
        console.log("finish command 2 sent");
      }
    })

    //Listens for empty deck for player 1. If Player 2 has already signalled the same then New Round command is sent
    socket.on("newRound1", function(){
      newRoundCounter += 1;
      if (newRoundCounter === 2){
        io.sockets.emit("newRound");
        newRoundCounter = 0;
      }
    })
   //Listens for empty deck from player 2. If Player 1 has already signalled the same then New Round command is sent
    socket.on("newRound2", function(){
      newRoundCounter += 1;
      if (newRoundCounter === 2){
        io.sockets.emit("newRound");
        newRoundCounter = 0;
      }
    })

     //Listens for empty hand for player 1. If Player 2 has already signalled the same then New Round command is sent
     socket.on("newRound3", function(){
      newRoundCounter2 += 1;
      if (newRoundCounter2 === 2){
        io.sockets.emit("newRound");
        newRoundCounter2 = 0;
      }
    })
   //Listens for empty hand from player 2. If Player 1 has already signalled the same then New Round command is sent
    socket.on("newRound4", function(){
      newRoundCounter2 += 1;
      if (newRoundCounter2 === 2){
        io.sockets.emit("newRound");
        newRoundCounter2 = 0;
      }
    })

    //This sets off a counter that allows one more buy from player2, once player 1 has run out of cards 
    socket.on("handempty1", function(){
      handEmptyCounter1 += 1;
        console.log("P1 hand empty");
    })

     //Part 2 of the function above that counts a last buy from Player2 and returns finish which starts new round
     socket.on("lastBuy2", function(){
      lastBuy2 += 1;
      if (handEmptyCounter1 > 0 && lastBuy2 === 1){
        io.sockets.emit("finish");
        handEmptyCounter1 = 0;
        lastBuy2 = 0;
        console.log("New round due to no hand1 scenario");
      }
    })

     //This sets off a counter that allows one more buy from player2, once player 2 has run out of cards 
     socket.on("handempty2", function(){
      handEmptyCounter2 += 1;
        console.log("P2 hand empty");
    })

    //Part 2 of the function above that counts a last buy from Player1 and returns finish which starts new round
    socket.on("lastBuy1", function(){
      lastBuy1 += 1;
      if (handEmptyCounter2 > 0 && lastBuy1 === 1){
        io.sockets.emit("finish");
        handEmptyCounter2 = 0;
        lastBuy1 = 0;
        console.log("New round due to no hand2 scenario");
      }
    })
})

