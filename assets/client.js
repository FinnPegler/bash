//Listen for New Game button being pressed and run startGame function when it is
//Stages: 
//0 = Website load, before New Game button is pressed 
//1 = New Game button pressed, all decks and hands created, shuffled and delt. New round has started, awaiting first discard move.
//2 = Card discarded
//3 = Flop dealt, awaiting player bids
//4 = Comparing bids
//5 = Buy phase
//6 = Waiting for decks to be passed


var socket = io.connect("http://ec2-18-191-142-129.us-east-2.compute.amazonaws.com:3000");
//var socket = io.connect("http://localhost:8080");

var newgame = document.getElementById("newgame")
let stage1 = 1;
let stage2 = 1;
let arr1 = [];
let deck1 = []; 
let deck2 = [];
let hand1 = []; 
let hand2 = [];
let handlength1 = 0;
let discard1 = [];
let value1 = 0;
let bid1 = 0;
let bid2 = 0;
let multiplier1 = 1;
let multiplier2 = 1;
let buys1 = 1;
let remove1 = [];
let remove2 = [];
let finish1 = 0;
let grab1 = 0;
let newRoundCounter = 0;
let specialDeck1 = [];
let specialDeck2 = [];
let flopsLeft = 0;

newgame.addEventListener("click", function (){
  document.getElementById("newgame").className = "hidden"
    startGame();
    socket.emit("start", {})
})


function startGame (){
    stage1 = 1;
    stage2 = 1;
    arr1 = [];
    deck1 = []//"Increase", "Grab", "Double", "Double", "Grab"]; 
    deck2 = [];
    hand1 = []; 
    hand2 = [];
    discard1 = [];
    value1 = 0;
    bid1 = 0;
    bid2 = 0;
    multiplier1 = 1;
    multiplier2 = 1;
    buys1 = 1;
    remove1 = [];
    remove2 = [];
    finish1 = 0;
    grab1 = 0;
    newRoundCounter = 0;
    specialDeck1 = ["Increase"]//, "Double", "Buy", "Grab"];
    specialDeck2 = [];
    createFullDecks();
    createPlayerDecks();
    shuffle(arr1);
    shuffle(deck1);
    dealHand(deck1, hand1);
    displayHand();
    displaySpecialCards();
    displayShop();
    }

function addSendStage1 (){
    stage1 += 1;
    socket.emit("stage1", {stage1});
}


socket.on("stage2", function(data){
    stage2 = data.stage2;
    if (stage1 === 2){
        setTimeout(secondStage, 900);
    }
})


//bid received through server
socket.on("bid2", function(data){
    bid2 = data.bid2;
    multiplier2 = data.multiplier2
})


  //Shuffle function
  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

    //function to count number of specific cards in decks
function countInDeck(deck, card) {
    var count = 0;
    for (var i = 0; i < deck.length; i++) {
        if (deck[i] === card) {
            count++;
        }
    }
    return count;
  }


//create full deck and store in arr1
function createFullDecks() {
    for (let i = 1; i < 5; i++) {
        arr1.push("4");arr1.push("6");arr1.push("8");arr1.push("Grab");arr1.push("Buy");arr1.push("Double");arr1.push("Combine");arr1.push("Increase");
    }
    arr1.pop(); //we want one less Increase card as one is in players special deck already
    }


    var createPlayerDecks = function() {
        for (let i = 1; i < 7; i++) {
            deck1.push("2");
        }
        for (let i = 1; i < 3; i++) {
            deck1.push("4");
        }
      }


  //Creates player hand from deck
  function dealHand (deck, hand) {
    for (let i = 0; i <4;i++){
        hand[i]= deck.shift();
    }
}

function displayHand () {
    //hide hands first
      let cards1 = document.getElementsByClassName("cards1")
      let cards1length = cards1.length
      for (let i = 0; i < cards1length; i++) {
          cards1[0].className = "hidden";
  }

if (hand1[0]) {document.getElementById("card1").innerText = hand1[0];document.getElementById("card1").className = "cards1"}
if (hand1[1]) {document.getElementById("card2").innerText = hand1[1];document.getElementById("card2").className = "cards1"}
if (hand1[2]) {document.getElementById("card3").innerText = hand1[2];document.getElementById("card3").className = "cards1"}
if (hand1[3]) {document.getElementById("card4").innerText = hand1[3];document.getElementById("card4").className = "cards1"}
}

function displaySpecialCards () {
    {document.getElementById("sc1").innerText = "Grab";document.getElementById("sc1t").innerText = "#: " + (countInDeck(specialDeck1, "Grab"))}
    {document.getElementById("sc2").innerText = "Double";document.getElementById("sc2t").innerText = "#: " + (countInDeck(specialDeck1, "Double"))}
    {document.getElementById("sc3").innerText = "Combine";document.getElementById("sc3t").innerText = "#: " + (countInDeck(specialDeck1, "Combine"))}
    {document.getElementById("sc4").innerText = "Buy";document.getElementById("sc4t").innerText = "#: " + (countInDeck(specialDeck1, "Buy"))}
    {document.getElementById("sc5").innerText = "Increase";document.getElementById("sc5t").innerText = "#: " + (countInDeck(specialDeck1, "Increase"))}
    specialTransfer ();
  }  

function displaySpecialCards2 () {
  {document.getElementById("redsc1").innerText = "Grab";document.getElementById("redsc1t").innerText = "#: " + (countInDeck(specialDeck2, "Grab"))}
  {document.getElementById("redsc2").innerText = "Double";document.getElementById("redsc2t").innerText = "#: " + (countInDeck(specialDeck2, "Double"))}
  {document.getElementById("redsc3").innerText = "Combine";document.getElementById("redsc3t").innerText = "#: " + (countInDeck(specialDeck2, "Combine"))}
  {document.getElementById("redsc4").innerText = "Buy";document.getElementById("redsc4t").innerText = "#: " + (countInDeck(specialDeck2, "Buy"))}
  {document.getElementById("redsc5").innerText = "Increase";document.getElementById("redsc5t").innerText = "#: " + (countInDeck(specialDeck2, "Increase"))}
}

function displayShop () {
    document.getElementById("sh1").innerText = "4";document.getElementById("sh1b").innerText = "💰: 6";document.getElementById("sh1t").innerText = "#: " + (countInDeck(arr1, "4"))
    document.getElementById("sh2").innerText = "6";document.getElementById("sh2b").innerText = "💰: 10";document.getElementById("sh2t").innerText = "#: " + (countInDeck(arr1, "6"))
    document.getElementById("sh3").innerText = "8";document.getElementById("sh3b").innerText = "💰: 20";document.getElementById("sh3t").innerText = "#: " + (countInDeck(arr1, "8"))
    document.getElementById("sh4").innerText = "Grab";document.getElementById("sh4b").innerText = "💰: 8";document.getElementById("sh4t").innerText = "#: " + (countInDeck(arr1, "Grab"))
    document.getElementById("sh5").innerText = "Double";document.getElementById("sh5b").innerText = "💰: 8";document.getElementById("sh5t").innerText = "#: " + (countInDeck(arr1, "Double"))
    document.getElementById("sh6").innerText = "Combine";document.getElementById("sh6b").innerText = "💰: 10";document.getElementById("sh6t").innerText = "#: " + (countInDeck(arr1, "Combine"))
    document.getElementById("sh7").innerText = "Buy";document.getElementById("sh7b").innerText = "💰: 12";document.getElementById("sh7t").innerText = "#: " + (countInDeck(arr1, "Buy"))
    document.getElementById("sh8").innerText = "Increase";document.getElementById("sh8b").innerText = "💰: 12";document.getElementById("sh8t").innerText = "#: " + (countInDeck(arr1, "Increase"))
    specialTransfer ();
  }  

function displayShop2 () {
  document.getElementById("redsh1").innerText = "4";document.getElementById("redsh1b").innerText = "💰: 6";document.getElementById("redsh1t").innerText = "#: " + (countInDeck(arr2, "4"))
  document.getElementById("redsh2").innerText = "6";document.getElementById("redsh2b").innerText = "💰: 10";document.getElementById("redsh2t").innerText = "#: " + (countInDeck(arr2, "6"))
  document.getElementById("redsh3").innerText = "8";document.getElementById("redsh3b").innerText = "💰: 20";document.getElementById("redsh3t").innerText = "#: " + (countInDeck(arr2, "8"))
  document.getElementById("redsh4").innerText = "Grab";document.getElementById("redsh4b").innerText = "💰: 8";document.getElementById("redsh4t").innerText = "#: " + (countInDeck(arr2, "Grab"))
  document.getElementById("redsh5").innerText = "Double";document.getElementById("redsh5b").innerText = "💰: 8";document.getElementById("redsh5t").innerText = "#: " + (countInDeck(arr2, "Double"))
  document.getElementById("redsh6").innerText = "Combine";document.getElementById("redsh6b").innerText = "💰: 10";document.getElementById("redsh6t").innerText = "#: " + (countInDeck(arr2, "Combine"))
  document.getElementById("redsh7").innerText = "Buy";document.getElementById("redsh7b").innerText = "💰: 12";document.getElementById("redsh7t").innerText = "#: " + (countInDeck(arr2, "Buy"))
  document.getElementById("redsh8").innerText = "Increase";document.getElementById("redsh8b").innerText = "💰: 12";document.getElementById("redsh8t").innerText = "#: " + (countInDeck(arr2, "Increase"))
}



 //Function to discard clicked card from Player1 hand
document.querySelectorAll(".cards1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 1) {
          document.getElementById("directions1").innerText = "Please wait for other player";
          discard1.push(item.innerText);
          item.className = "hidden";
          let index = hand1.indexOf(item.innerText);    
          if (index > -1) {
          hand1.splice(index, 1);
          sendHand1();
          addSendStage1(); 
          sendDeck1 ();
  }
  
          if (stage1 === 2 && stage2 === 2) {  
            setTimeout(secondStage(), 900);
        }
      }
    })
  })

//send Deck1 but don't display instantly on other screen  
function sendDeck1 () {
  socket.emit("deck1", {
    deck1: deck1,
  }) 
}

//flop received through server
socket.on("deck2", function(data){
  console.log("flop received from player 2")
    deck2[0] = data.deck2[0];
    deck2[1] = data.deck2[1];
    setTimeout(decksReceived, 900);
})

//send Deck and shown instantly on other screen
function sendDeck1Instant () {
  console.log("Instant flop sent")
  socket.emit("deck1Instant", {
    deck1: deck1
  }) 
}

//flop received and displayed through server
socket.on("deck2Instant", function(data){
  console.log("flop received and shown instantly from player 2")
    deck2[0] = data.deck2[0];
    deck2[1] = data.deck2[1];
    document.getElementById("card11").className = "flop2"
    document.getElementById("card12").className = "flop2" 
    if (deck2[0]){document.getElementById("card11").innerText = deck2[0]}
    if (deck2[1]){document.getElementById("card12").innerText = deck2[1]}
    if (!deck2[0]){document.getElementById("card11").className = "hidden"}
    if (!deck2[1]){document.getElementById("card12").className = "hidden"}
})


    function specialTransfer (){
      socket.emit("specialtransfer1", {
        specialDeck1: specialDeck1,
        arr1: arr1
      })
      }
      
      socket.on("specialtransfer2", function(data) {
        arr2 = data.arr2;
        specialDeck2 = data.specialDeck2;
        displaySpecialCards2 ();
        displayShop2 ();
      })



  function secondStage(){
    takeSpecials(); 
    setTimeout(displayFlop, 600)
}

  
  //function to take special cards from hand and put in special deck
  function takeSpecials () {
    document.querySelectorAll(".cards1").forEach(item => {
      if (stage1 === 2 && stage2 === 2) {
        if (item.innerText === "Grab" || item.innerText === "Double"|| item.innerText === "Combine"|| item.innerText === "Buy" || item.innerText === "Increase"){
          specialDeck1.push(item.innerText);
          item.className = "hidden";
          let index = hand1.indexOf(item.innerText);    
          hand1.splice(index, 1);
        }
      }
    })
    displaySpecialCards();
    sendHand1();
}



function sendHand1() {
  console.log("handtransfer 1 sent")
  socket.emit("handtransfer1", {
    hand1: hand1,
  })
}

socket.on("handtransfer2", function(data) {
  hand2 = data.hand2;
  document.getElementById("card5").className = "cards2";
  document.getElementById("card6").className = "cards2";
  document.getElementById("card7").className = "cards2";
  document.getElementById("card8").className = "cards2";
  if (hand2.length <= 3){document.getElementById("card5").className = "hidden";}
  if (hand2.length <= 2){document.getElementById("card6").className = "hidden";}
  if (hand2.length <= 1){document.getElementById("card7").className = "hidden";}
  if (hand2.length <= 0){document.getElementById("card8").className = "hidden";}
})


//display flop
function displayFlop(){
if (stage1 === 2 && stage2 === 2) {
  newRoundCounter = 0;
  flopsLeft = Math.floor(((deck1.length+1)/2) -1);
  if (flopsLeft === -1) {flopsLeft = 0} 
  console.log("display flop1 ran");
  document.getElementById("card9").className = "flop1"
  document.getElementById("card10").className = "flop1"
  document.getElementById("card11").className = "flop2"
  document.getElementById("card12").className = "flop2"
  if (deck1[0]){document.getElementById("card9").innerText = deck1[0]}
  if (deck1[1]){document.getElementById("card10").innerText = deck1[1]}
  if (!deck1[0]){document.getElementById("card9").className = "hidden"}
  if (!deck1[1]){document.getElementById("card10").className = "hidden"}
  if (parseInt(deck1[0])){value1 += parseInt(deck1[0])}
  if (parseInt(deck1[1])){value1 += parseInt(deck1[1])}  
  if (deck2[0]){document.getElementById("card11").innerText = deck2[0]}
  if (deck2[1]){document.getElementById("card12").innerText = deck2[1]}
  if (!deck2[0]){document.getElementById("card11").className = "hidden"}
  if (!deck2[1]){document.getElementById("card12").className = "hidden"}
  
  if (hand1[0]) {
    document.getElementById("ready1").className = "shown"
    document.getElementById("directions1").innerText = "Choose Bid Amount";
    document.getElementById("updates").innerText= "New flop dealt, " + flopsLeft + " left"
  }

  if (!hand1[0]) {
    document.getElementById("directions1").innerText = "Your hand is empty, you cannot bid";
    stage1 = 4;
    socket.emit("finish1", {
      deck1: deck1,
      hand1: hand1,
  });
    socket.emit("handempty1");
    console.log("sending empty hand 1 command")

    socket.emit("stage4.1", {
      stage1: stage1,
      hand1: hand1
  })
}
  stage1 = 3;
  sendHand1();
} 
}

//Eventlistener for Grab card 
document.getElementsByClassName("specialcards1")[0].addEventListener("click", playGrab); 
let offgrab = 0;

//Play Grab card - remove from Special cards and put in discard1 
function playGrab () {
  if (stage1 === 3 && specialDeck1.indexOf("Grab") > -1 && grab1 === 0){
    console.log("Grab part1 ran");
    grab1 = 1;
    specialDeck1.splice(specialDeck1.indexOf("Grab"), 1)
    discard1.push("Grab")
    document.getElementsByClassName("specialcards1")[0].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();

  }
  else if (stage1 === 3 && grab1 === 1){
    console.log("Grab part2 ran");
    grab1 = 0;
    discard1.splice(discard1.indexOf("Grab"), 1);
    specialDeck1.push("Grab");
    document.getElementsByClassName("specialcards1")[0].style.backgroundColor = "white";
    displaySpecialCards();
      }  
} 

//Grab card - Function to take special card from flop and place in special cards
document.querySelectorAll(".flop1").forEach(item => {
  item.addEventListener("click", event => {
    if (stage1 === 3 && grab1 === 1) {
    if (item.innerText === "Double" ||item.innerText === "Buy" ||item.innerText === "Combine" ||item.innerText === "Increase"){
          //deck1.splice(deck1.indexOf(item.innerText), 1);
          deck1[deck1.indexOf(item.innerText)] = undefined;
          specialDeck1.push(item.innerText);
          item.className = "hidden";
          document.getElementsByClassName("specialcards1")[0].style.backgroundColor = "white";
          displaySpecialCards();
          sendDeck1Instant ();
          grab1 = 0;
    }
    }
  })
})

//Grab card - Function to take grab from flop without discarding original (push it twice so effectively don't discard original)
  document.querySelectorAll(".flop1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && grab1 === 1 &&  item.innerText === ("Grab")) {
        deck1[deck1.indexOf("Grab")] = undefined;
        specialDeck1.push("Grab");
        specialDeck1.push("Grab");
        item.className = "hidden";
        document.getElementsByClassName("specialcards1")[0].style.backgroundColor = "white";
        displaySpecialCards();
        sendDeck1Instant ();
        grab1 = 0;
      }
    })
  })


  //Eventlistener for double card
document.getElementsByClassName("specialcards1")[1].addEventListener("click", playDouble);

function playDouble (){
  if (stage1 === 3 && multiplier1 === 1 && specialDeck1.indexOf("Double") > -1){
    multiplier1 = 2;
    specialDeck1.splice(specialDeck1.indexOf("Double"), 1);
    discard1.push("Double");
    document.getElementsByClassName("specialcards1")[1].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();
    socket.emit("bid1", {
      bid1: bid1,
      multiplier1: multiplier1
    });
  }

  else if (stage1 === 3 && multiplier1 === 2){
    multiplier1 = 1;
    discard1.splice(discard1.indexOf("Double"), 1)
    specialDeck1.push("Double");
    document.getElementsByClassName("specialcards1")[1].style.backgroundColor = "white";
    displaySpecialCards();
    socket.emit("bid1", {
      bid1: bid1,
      multiplier1: multiplier1
    });
  }
}


//Player 1 choose bid
document.querySelectorAll(".cards1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && item.className === ("cards1")) {
          bid1 += parseInt(item.innerText);
          remove1.push(item.innerText);
          socket.emit("bid1", {
            bid1: bid1,
            multiplier1: multiplier1
          });
          setTimeout(delayClassChange, 20, item)
        }
    })
  })


function delayClassChange (item) {
  item.className = "cards1dark";
}


document.addEventListener("click", unclick );

function unclick (event) {
  let item = event.target;
  if (stage1 === 3 && item.className === ("cards1dark")) {
    bid1 -= parseInt(item.innerText);
    remove1.splice(remove1.indexOf(item.innerText), 1);
    socket.emit("bid1", {
      bid1: bid1,
      multiplier1: multiplier1
    });
    item.className = "cards1";
  }
}



  //Compare bids, remove bids from hand, call display hands function, call display flop function
document.getElementById("ready1").addEventListener("click", stage1plus1);

//function to move stage1 to 4 and send stage and hand data, then run player bid
function stage1plus1 () {
  document.getElementsByClassName("specialcards1")[0].style.backgroundColor = "white";
  document.getElementsByClassName("specialcards1")[1].style.backgroundColor = "white";
  document.querySelectorAll(".cards1dark").forEach(item => {
    item.className = "cards1"})
  stage1 = 4;
  socket.emit("stage4.1", {
      stage1: stage1,
      hand1: hand1
  })
  playerbid();
}


//stage4 received through server
socket.on("stage4.2", function(data){
  hand2 = data.hand2;
  stage2 = data.stage2;
  playerbid();
})



//remove bids from hand
function playerbid (){
//if (!hand2[0]){stage2 = 4;}
  if (stage1 === 4 && stage2 === 4) {
    for (let item in remove1) {
      let index = hand1.indexOf(remove1[item]);                 
        if (index > -1) {
        hand1.splice(index, 1);
        discard1.push(remove1[item]);
        }
    }                                                                                                     


//function to send finish command on delay when no one bids
function finishTimeout (){
  socket.emit("finish1", {
    deck1: deck1,
    hand1: hand1,
});
}

//calculate winning bid
    if (bid1 === 0 & bid2 === 0){
      setTimeout(finishTimeout, 900)
      document.getElementById("updates").innerText= "No one bid, moving to next phase in 1 second";
      document.getElementById("finished1").className = "hidden";   
    }

    else if (bid1*multiplier1 > bid2*multiplier2) {
      stage1 = 5;
      buys1 = 1;
      document.getElementById("directions1").innerText = "Opponent bid " + bid2*multiplier2 + ". Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
      document.getElementById("finished1").className = "shown";
      document.getElementById("updates").innerText= " "; 
      document.querySelectorAll(".flop1").forEach(item => {
          if (item.innerText === "Grab" ||item.innerText === "Double" ||item.innerText === "Buy" ||item.innerText === "Combine" ||item.innerText === "Increase"){
                specialDeck1.push(item.innerText);
                item.className = "hidden";
                let index = deck1.indexOf(item.innerText);     
                deck1[index] = undefined;
                sendDeck1Instant();
          }
      })
      displaySpecialCards();
    }

    else if (bid1*multiplier1 === bid2*multiplier2) {
      stage1 = 5;
      buys1 = 1;
      document.getElementById("directions1").innerText = "Equal bids, spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
      document.getElementById("finished1").className = "shown";
      document.getElementById("updates").innerText= " "; 
      document.querySelectorAll(".flop1").forEach(item => {
        if (item.innerText === "Grab" || item.innerText === "Double" || item.innerText === "Buy" ||item.innerText === "Combine" ||item.innerText === "Increase"){
              specialDeck1.push(item.innerText);
              item.className = "hidden";
              let index = deck1.indexOf(item.innerText);     
              deck1[index] = undefined;
              sendDeck1Instant();
        }
    })
      displaySpecialCards();
    }

    if (bid1*multiplier1 < bid2*multiplier2) {
        document.getElementById("directions1").innerText = "Opponent bid " + bid2*multiplier2 + " which beat your bid of " + bid1*multiplier1; 
        document.getElementById("updates").innerText= " "; 
        socket.emit("finish1", {
          deck1: deck1,
          hand1: hand1,
      });
    }


//reset remove arrays, call displayhands function, move to next stage (player buy phase)     
      remove1 = [];
      remove2 = [];
      displayHand (); 
      sendHand1();  
      document.getElementById("ready1").className = "hidden"                                                  
  }
}


//Always on listeners that check for buy phase and what card is clicked so player takes it into discard pile
document.getElementsByClassName("shopcards1")[0].addEventListener("click", take4);
document.getElementsByClassName("shopcards1")[1].addEventListener("click", take6);
document.getElementsByClassName("shopcards1")[2].addEventListener("click", take8);
document.getElementsByClassName("shopcards1")[3].addEventListener("click", takeGrab);
document.getElementsByClassName("shopcards1")[4].addEventListener("click", takeDouble);
document.getElementsByClassName("shopcards1")[5].addEventListener("click", takeCombine);
document.getElementsByClassName("shopcards1")[6].addEventListener("click", takeBuy);
document.getElementsByClassName("shopcards1")[7].addEventListener("click", takeIncrease);


//Combine card listeners and functions
document.getElementsByClassName("specialcards1")[2].addEventListener("click", playCombine);
let offcombine = 0;
let undocombine = 0;

function playCombine (){
 if (stage1 === 5 && specialDeck1.indexOf("Combine") > -1 && offcombine === 0) {
 if (parseInt(deck2[0])){value1 += parseInt(deck2[0]);undocombine += parseInt(deck2[0])}
 if (parseInt(deck2[1])){value1 += parseInt(deck2[1]);undocombine += parseInt(deck2[1])}
 document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1+" buy(s)";  
 specialDeck1.splice(specialDeck1.indexOf("Combine"), 1)
 discard1.push("Combine");
 document.getElementsByClassName("specialcards1")[2].style.backgroundColor = "#d3d3d3";
 displaySpecialCards();  
 setTimeout(function (){offcombine += 1;}, 20)
}

if (stage1 === 5 && offcombine === 1 && undocombine <= value1) {
  if (parseInt(deck2[0])){value1 -= parseInt(deck2[0]);undocombine -= parseInt(deck2[0])}
  if (parseInt(deck2[1])){value1 -= parseInt(deck2[1]);undocombine -= parseInt(deck2[1])} 
  document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
  discard1.splice(discard1.indexOf("Combine"), 1)
  specialDeck1.push("Combine");
  document.getElementsByClassName("specialcards1")[2].style.backgroundColor = "white";
  displaySpecialCards();  
  offcombine = 0;
 }
}

//Increase card listeners and functions
document.getElementsByClassName("specialcards1")[4].addEventListener("click", playIncrease);
let offincrease = 0;
let undoincrease = 0;

function playIncrease (){
    if (stage1 === 5 && specialDeck1.indexOf("Increase") > -1 && offincrease === 0) {
    if (parseInt(deck1[0])){value1 += parseInt(deck1[0]);undoincrease += parseInt(deck1[0])}
    if (parseInt(deck1[1])){value1 += parseInt(deck1[1]);undoincrease += parseInt(deck1[1])}
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    specialDeck1.splice(specialDeck1.indexOf("Increase"), 1)
    discard1.push("Increase");
    document.getElementsByClassName("specialcards1")[4].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();  
    setTimeout(function (){offincrease+= 1;}, 20)
  }

  if (stage1 === 5 && offincrease === 1 && undoincrease <= value1) {
    if (parseInt(deck1[0])){value1 -= parseInt(deck1[0]);undoincrease -= parseInt(deck1[0])}
    if (parseInt(deck1[1])){value1 -= parseInt(deck1[1]);undoincrease -= parseInt(deck1[1])}
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    discard1.splice(discard1.indexOf("Increase"), 1)
    specialDeck1.push("Increase");
    document.getElementsByClassName("specialcards1")[4].style.backgroundColor = "white";
    displaySpecialCards();  
    offincrease = 0;
  }
}

 //Buy card listeners and functions
 document.getElementsByClassName("specialcards1")[3].addEventListener("click", playBuy);
let offbuy = 0;

 function playBuy (){
 if (stage1 === 5 && specialDeck1.indexOf("Buy") > -1 && offbuy === 0) {
   buys1 += 1;
   document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
   specialDeck1.splice(specialDeck1.indexOf("Buy"), 1)
   discard1.push("Buy");
   document.getElementsByClassName("specialcards1")[3].style.backgroundColor = "#d3d3d3";
   displaySpecialCards();  
   setTimeout(function (){offbuy += 1;}, 20)
 }

 if (stage1 === 5 && offbuy === 1 && buys1 > 0) { 
  buys1 -= 1;
  document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
  discard1.splice(discard1.indexOf("Buy"), 1)
  specialDeck1.push("Buy");
  document.getElementsByClassName("specialcards1")[3].style.backgroundColor = "white";
  displaySpecialCards();  
  offbuy = 0;
}
}
 
 

    //Functions to recognize when buy round is over
    document.getElementById("finished1").addEventListener("click", sendFinish)

    function sendFinish () {
      document.getElementById("finished1").className = "hidden";
      document.getElementsByClassName("specialcards1")[2].style.backgroundColor = "white";
      document.getElementsByClassName("specialcards1")[3].style.backgroundColor = "white";
      document.getElementsByClassName("specialcards1")[4].style.backgroundColor = "white";
      socket.emit("finish1", {
        deck1: deck1,
        hand1: hand1,
    });
      socket.emit("lastBuy1");
    }


    socket.on("finish", function(data){
      hand2 = data.hand2;
      newFlop();
  })


  //New flop function (resetting all parameters)
  function newFlop () {
    console.log("Newflop1 ran")
      document.getElementById("card8").className = "card2";
      document.getElementById("finished1").className = "hidden";
      discard1.push(deck1.shift());
      discard1.push(deck1.shift());
      sendDeck1 ();
      stage2 = 2;
      bid1 = 0;
      bid2 = 0;
      multiplier1 = 1;
      multiplier2 = 1;
      value1 = 0;
      value2 = 0;
      finish1 = 0;
      buys1 = 0;
      offcombine = 0;
      offbuy = 0;
      offincrease = 0;
      grab1 = 0;
      undocombine = 0;
      undoincrease = 0;
      undobuy = 0;
      stage1 = 6;
      setTimeout(decksReceived, 900)
  }

  function decksReceived (){
    if (stage1 === 6){
        stage1 = 2;
        displayFlop()
    } 
}

socket.on("newRound", newRound)


function newRound (){
  if (newRoundCounter === 0) {
      newRoundcounter = 1;
      document.getElementById("updates").innerText= "Round over, decks shuffled and new round started";
      document.getElementById("card5").className = "cards2";
      document.getElementById("card6").className = "cards2";
      document.getElementById("card7").className = "cards2";
      {document.getElementById("card9").className = "hidden"}
      {document.getElementById("card10").className = "hidden"}
      {document.getElementById("card11").className = "hidden"}
      {document.getElementById("card12").className = "hidden"}
      console.log("New round ran");
      discard1.push(...hand1);
      discard1.push(...deck1);
      var filtered = discard1.filter(function (el) {
        return (el != null ||el != undefined);
      });
      discard1 = filtered;
      hand1 = [];
      shuffle(discard1);
      deck1 = discard1;
      discard1 = [];
      dealHand(deck1, hand1)
      displayHand();
      displayShop();
      displaySpecialCards();
      document.getElementById("directions1").innerText = "Click a card to discard";
      document.getElementById("ready1").className = "hidden";
      stage1 = 1;
      stage2 = 1;
      bid1 = 0;
      bid2 = 0;
      multiplier1 = 1;
      multiplier2 = 1;
      value1 = 0;
      value2 = 0;
      finish1 = 0;
      buys1 = 0;
      deck2 = [];
      offcombine = 0;
      offbuy = 0;
      offincrease = 0;
      grab1 = 0;
      undocombine = 0;
      undoincrease = 0;
      undobuy = 0;
  }
}



    //Buy functions for player 1
function take4 () {
  if (value1 >= 6 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "4") > 0){
    arr1.splice(arr1.indexOf("4"), 1)
    discard1.push("4")
    buys1 -= 1;
    value1 -= 6;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
}
}

function take6 () {
  if (value1 >= 10 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "6")> 0){
    arr1.splice(arr1.indexOf("6"), 1)
    discard1.push("6")
    buys1 -= 1;
    value1 -= 10;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();

}
}

function take8 () {
  if (value1 >= 20 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "8") > 0){
    arr1.splice(arr1.indexOf("8"), 1)
    discard1.push("8")
    buys1 -= 1;
    value1 -= 20;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
    if (arr1.indexOf("8") === -1) {document.getElementById("updates").innerText = "You win!"}
}
}

function takeGrab () {
  if (value1 >= 8 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "Grab") > 0){
    arr1.splice(arr1.indexOf("Grab"), 1)
    specialDeck1.push("Grab")
    buys1 -= 1;
    value1 -= 8;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
    displaySpecialCards();
}
}

function takeDouble () {
  if (value1 >= 8 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "Double") > 0){
    arr1.splice(arr1.indexOf("Double"), 1)
    specialDeck1.push("Double")
    buys1 -= 1;
    value1 -= 8;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
    displaySpecialCards();
}
}

function takeCombine () {
  if (value1 >= 10 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "Combine") > 0){
    arr1.splice(arr1.indexOf("Combine"), 1)
    specialDeck1.push("Combine")
    buys1 -= 1;
    value1 -= 10;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
    displaySpecialCards();
}
}

function takeBuy () {
  if (value1 >= 12 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "Buy") > 0){
    arr1.splice(arr1.indexOf("Buy"), 1)
    specialDeck1.push("Buy")
    buys1 -= 1;
    value1 -= 12;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
    displaySpecialCards();
}
}

function takeIncrease () {
  if (value1 >= 12 && buys1 > 0 && stage1 === 5 && countInDeck(arr1, "Increase") > 0){
    arr1.splice(arr1.indexOf("Increase"), 1)
    specialDeck1.push("Increase")
    buys1 -= 1;
    value1 -= 12;
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    displayShop();
    displaySpecialCards();
}
}