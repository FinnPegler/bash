//Listen for New Game button being pressed and run startGame function when it is
//Stages: 
//0 = Website load, before New Game button is pressed 
//1 = New Game button pressed, all decks and hands created, shuffled and delt. New round has started, awaiting first discard move.
//2 = Card discarded
//3 = Flop dealt, awaiting player bids
//4 = Comparing bids
//5 = Buy phase
//6 = Waiting for decks to be passed



var socket = io.connect("http://localhost:8080");

var newgame = document.getElementById("newgame")
let stage1 = 1;
let stage2 = 1;
let arr1 = [];
let deck1 = []; 
let deck2 = [];
let hand1 = []; 
let hand2 = [];
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
let newRoundCounter = 0;
let specialDeck1 = ["Increase", "Grab", "Double","Combine", "Buy"];


newgame.addEventListener("click", function (){
    startGame();
    socket.emit("start", {})
})


function startGame (){
    createFullDecks();
    createPlayerDecks();
    shuffle(arr1);
    shuffle(deck1);
    dealHand(deck1, hand1);
    displayHand();
    displaySpecialCards();
    displayShop();
    stage1 = 1;
    stage2 = 1;
    }

function addSendStage1 (){
    stage1 += 1;
    socket.emit("stage1", {stage1});
}


socket.on("stage2", function(data){
    stage2 = data.stage2;
    if (stage1 === 2){
        setTimeout(secondStage,200);
    }
})

//flop received through server
socket.on("deck2", function(data){
    deck2[0] = data.deck2[0];
    deck2[1] = data.deck2[1];
    setTimeout(decksReceived, 2000);
})

//bid received through server
socket.on("bid2", function(data){
    bid2 = data.bid2;
})


//stage4 received through server
socket.on("stage4.2", function(data){
    hand2 = data.hand2;
    stage2 = data.stage2;
    playerbid();
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
}  

function displayShop () {
    if (countInDeck(arr1, "4") > 0) {document.getElementById("sh1").innerText = "4";document.getElementById("sh1b").innerText = "💰: 6";document.getElementById("sh1t").innerText = "#: " + (countInDeck(arr1, "4"))}
    if (countInDeck(arr1, "6") > 0) {document.getElementById("sh2").innerText = "6";document.getElementById("sh2b").innerText = "💰: 10";document.getElementById("sh2t").innerText = "#: " + (countInDeck(arr1, "6"))}
    if (countInDeck(arr1, "8") > 0) {document.getElementById("sh3").innerText = "8";document.getElementById("sh3b").innerText = "💰: 20";document.getElementById("sh3t").innerText = "#: " + (countInDeck(arr1, "8"))}
    if (countInDeck(arr1, "Grab") > 0) {document.getElementById("sh4").innerText = "Grab";document.getElementById("sh4b").innerText = "💰: 8";document.getElementById("sh4t").innerText = "#: " + (countInDeck(arr1, "Grab"))}
    if (countInDeck(arr1, "Double") > 0) {document.getElementById("sh5").innerText = "Double";document.getElementById("sh5b").innerText = "💰: 8";document.getElementById("sh5t").innerText = "#: " + (countInDeck(arr1, "Double"))}
    if (countInDeck(arr1, "Combine") > 0) {document.getElementById("sh6").innerText = "Combine";document.getElementById("sh6b").innerText = "💰: 10";document.getElementById("sh6t").innerText = "#: " + (countInDeck(arr1, "Combine"))}
    if (countInDeck(arr1, "Buy") > 0) {document.getElementById("sh7").innerText = "Buy";document.getElementById("sh7b").innerText = "💰: 12";document.getElementById("sh7t").innerText = "#: " + (countInDeck(arr1, "Buy"))}
    if (countInDeck(arr1, "Increase") > 0) {document.getElementById("sh8").innerText = "Increase";document.getElementById("sh8b").innerText = "💰: 12";document.getElementById("sh8t").innerText = "#: " + (countInDeck(arr1, "Increase"))}
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
          addSendStage1(); 
          socket.emit("deck1", {
          deck1: deck1
        }) 
  }
          if (stage1 === 2 && stage2 === 2) {  
            secondStage()
        }
      }
    })
  })

  function secondStage(){
    takeSpecials(); 
    displayFlop ();
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
}


//display flop
function displayFlop(){
if (stage1 === 2 && stage2 === 2) {
    console.log("display flop1 ran")
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
  //if (!deck2[0]){document.getElementById("card11").className = "hidden"}
  //if (!deck2[1]){document.getElementById("card12").className = "hidden"}
  
  if (hand1[0]) {
    document.getElementById("ready1").className = "shown"
    document.getElementById("directions1").innerText = "Choose Bid Amount";
    document.getElementById("updates").innerText= "New flop dealt"
  }

  if (!hand1[0]) {document.getElementById("directions1").innerText = "Your hand is empty, you cannot bid";}

  if (hand2[0]) {
    document.getElementById("directions2").innerText = "Choose Bid Amount";
    document.getElementById("ready2").className = "shown"
    document.getElementById("updates").innerText= "New flop dealt"
  }
  stage1 = 3;
  //setTimeout(function(){stage1 = 3;stage2 = 3}, 1000);
} 
}

//Player 1 choose bid
document.querySelectorAll(".cards1").forEach(item1 => {
    item1.addEventListener("click", event => {
      if (stage1 === 3 && item1.className === ("cards1")) {
          bid1 += parseInt(item1.innerText);
          remove1.push(item1.innerText);
          socket.emit("bid1", {bid1:bid1})
        }
    })
  })


  //Compare bids, remove bids from hand, call display hands function, call display flop function
document.getElementById("ready1").addEventListener("click", stage1plus1);

//function to move stage1 to 4 and send stage and hand data, then run player bid
function stage1plus1 () {
  stage1 = 4;
  socket.emit("stage4.1", {
      stage1:stage1,
      hand1: hand1
  })
  playerbid();
}


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

//calculate winning bid
    if (bid1 === 0 & bid2 === 0){finish1 = 2;document.getElementById("updates").innerText= "No one bid, next flop dealt"; return newFlop();}

    if (bid1*multiplier1 >= bid2*multiplier2) {
      stage1 = 5;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
      document.getElementById("finished1").className = "shown"
      buys1 = 1;
      finish1 = 0;
      displaySpecialCards();
    }

    if (bid1*multiplier1 < bid2*multiplier2) {
        document.getElementById("directions1").innerText = "Your opponent bid " + bid2 + " which beat your bid of " + bid1; 
        finish1 = 1;
        socket.emit("finish1")
    }


//reset remove arrays, call displayhands function, move to next stage (player buy phase)     
      remove1 = [];
      remove2 = [];
      displayHand ();   
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



//Buy functions for player 1
function take4 () {
    if (value1 >= 6 && buys1 > 0 && stage1 === 5){
      arr1.splice(arr1.indexOf("4"), 1)
      discard1.push("4")
      buys1 -= 1;
      value1 -= 6;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
      displayShop();
  }
  }
  
  function take6 () {
    if (value1 >= 10 && buys1 > 0 && stage1 === 5){
      arr1.splice(arr1.indexOf("6"), 1)
      discard1.push("6")
      buys1 -= 1;
      value1 -= 10;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
      displayShop();
  
  }
  }
  
  function take8 () {
    if (value1 >= 20 && buys1 > 0 && stage1 === 5){
      arr1.splice(arr1.indexOf("8"), 1)
      discard1.push("8")
      buys1 -= 1;
      value1 -= 20;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
      displayShop();
  }
  }
  
  function takeGrab () {
    if (value1 >= 8 && buys1 > 0 && stage1 === 5){
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
    if (value1 >= 8 && buys1 > 0 && stage1 === 5){
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
    if (value1 >= 10 && buys1 > 0 && stage1 === 5){
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
    if (value1 >= 12 && buys1 > 0 && stage1 === 5){
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
    if (value1 >= 12 && buys1 > 0 && stage1 === 5){
      arr1.splice(arr1.indexOf("Increase"), 1)
      specialDeck1.push("Increase")
      buys1 -= 1;
      value1 -= 12;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
      displayShop();
      displaySpecialCards();
  }
  }


    //Functions to recognize when buy round is over
    document.getElementById("finished1").addEventListener("click", addToFinish1)

    function addToFinish1 () {
      finish1 +=1;
      document.getElementById("finished1").className = "hidden";
      newFlop ();
      socket.emit("finish1")
    }
  
    socket.on("finish2", function(){
      finish1 += 1;
      newFlop();
  })


  //New flop function (resetting all parameters)
  function newFlop () {
    if (finish1 === 2) { 
      console.log("newflop1 ran")
      discard1.push(deck1.shift());
      discard1.push(deck1.shift());
      if (!deck1[0]){socket.emit("newRound")}
      stage1 = 2;stage2 = 2;
      bid1 = 0;bid2 = 0;
      multiplier1 = 1;multiplier2 = 1;
      value1 = 0;value2 = 0;
      finish1 = 0;
      socket.emit("deck1", {
        deck1: deck1
      }) 
      console.log(deck1);
      stage1 = 6;
      if (!deck1[0] && !deck2[0]){newRound}
      setTimeout(decksReceived, 500)
    }
  }

  function decksReceived (){
    if (stage1 === 6){
        stage1 = 2;
        displayFlop()
    } 
}

function newRound (){
    console.log("new Round")
}

socket.on("newRound", function(data){
    newRoundCounter += 1;
    if (newRoundCounter ===2) {
        newRound();
        newRoundCounter = 0;
    }
})