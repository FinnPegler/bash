var socket = io.connect("http://localhost:8080");

var newgame = document.getElementById("newgame")
let stage1 = 1;
let stage2 = 1;
let arr1 = [];
let deck1 = []; 
let hand1 = []; 
let discard1 = [];
let value1 = 0;
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
    stage1 = 1;
    stage2 = 1;
    }

function addSendStage1 (){
    stage1 += 1;
    socket.emit("stage1", {stage1});
    console.log("add send stage1 ran")
}


socket.on("stage2", function(data){
    stage2 = data.stage2;
    if (stage1 === 2){
        secondStage();
    }
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
            deck1.push("Grab");
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
  }
          if (stage1 === 2 && stage2 === 2) {  
            secondStage();
        }
      }
    })
  })

  function secondStage(){
    takeSpecials();
    //displayFlop ();
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
if (stage1 && stage2 === 2) {
    {document.getElementById("card9").className = "flop1"}
    {document.getElementById("card10").className = "flop1"}
    {document.getElementById("card11").className = "flop2"}
    {document.getElementById("card12").className = "flop2"}
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
  if (parseInt(deck2[0])){value2 += parseInt(deck2[0])}
  if (parseInt(deck2[1])){value2 += parseInt(deck2[1])}  
  
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

  if (!hand2[0]) {document.getElementById("directions2").innerText = "Your hand is empty, you cannot bid";}

  setTimeout(function(){stage1 = 3;stage2 = 3}, 1000);
} 
