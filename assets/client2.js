var socket = io.connect("http://localhost:8080");


let arr1 = []; let arr2 = [];
let deck1 = []; let deck2 = [];
let hand1 = []; let hand2 = [];

socket.on("startResponse", function(data){
    startGame();
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

//create full deck and store in arr2
function createFullDecks() {
    for (let i = 1; i < 5; i++) {
        arr2.push("4");arr2.push("6");arr2.push("8");arr2.push("Grab");arr2.push("Buy");arr2.push("Double");arr2.push("Combine");arr2.push("Increase");
    }
    arr2.pop(); //we want one less Increase card as one is in players special deck already
    console.log("create Full Decks ran")
    }

  //Creates player hand from deck
  function dealHand (deck, hand) {
    for (let i = 0; i <4;i++){
        hand[i]= deck.shift();
    }
}

function displayHand () {
    //hide hands first
      let cards2 = document.getElementsByClassName("cards1")
      let cards2length = cards2.length
      for (let i = 0; i < cards2length; i++) {
          cards2[0].className = "hidden";
  }

  if (hand2[0]) {document.getElementById("card5").innerText = hand2[0];document.getElementById("card5").className = "cards2"}
  if (hand2[1]) {document.getElementById("card6").innerText = hand2[1];document.getElementById("card6").className = "cards2"}
  if (hand2[2]) {document.getElementById("card7").innerText = hand2[2];document.getElementById("card7").className = "cards2"}
  if (hand2[3]) {document.getElementById("card8").innerText = hand2[3];document.getElementById("card8").className = "cards2"}
    }
  


var createPlayerDecks = function() {
    for (let i = 1; i < 7; i++) {
        deck2.push("2");
    }
    for (let i = 1; i < 3; i++) {
        deck2.push("4");
    }
  }

function startGame (){
    createFullDecks();
    createPlayerDecks();
    shuffle(arr2);
    shuffle(deck2);
    dealHand(deck2, hand2);
    displayHand();
    }