var socket = io.connect("http://localhost:8080");
let stage1 = 1;
let stage2 = 1;
let arr2 = [];
let deck2 = [];
let hand2 = [];
let discard2 = [];
let specialDeck2 = ["Increase", "Grab", "Double","Combine", "Buy"];

socket.on("startResponse", function(data){
    startGame();
})

function startGame (){
    createFullDecks();
    createPlayerDecks();
    shuffle(arr2);
    shuffle(deck2);
    dealHand(deck2, hand2);
    displayHand();
    displaySpecialCards();
    stage2 = 1;
    stage1 = 1;
    }



socket.on("stage1", function(data){
    stage1 = data.stage1;
    if (stage2 === 2){
        secondStage();
    }
})



function addSendStage2 (){
    stage2 += 1;
    socket.emit("stage2", {stage2});
}

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

    
var createPlayerDecks = function() {
    for (let i = 1; i < 7; i++) {
        deck2.push("Grab");
    }
    for (let i = 1; i < 3; i++) {
        deck2.push("4");
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
  
    function displaySpecialCards () {
        {document.getElementById("redsc1").innerText = "Grab";document.getElementById("redsc1t").innerText = "#: " + (countInDeck(specialDeck2, "Grab"))}
        {document.getElementById("redsc2").innerText = "Double";document.getElementById("redsc2t").innerText = "#: " + (countInDeck(specialDeck2, "Double"))}
        {document.getElementById("redsc3").innerText = "Combine";document.getElementById("redsc3t").innerText = "#: " + (countInDeck(specialDeck2, "Combine"))}
        {document.getElementById("redsc4").innerText = "Buy";document.getElementById("redsc4t").innerText = "#: " + (countInDeck(specialDeck2, "Buy"))}
        {document.getElementById("redsc5").innerText = "Increase";document.getElementById("redsc5t").innerText = "#: " + (countInDeck(specialDeck2, "Increase"))}
      }


   //Function to discard clicked card from Player2 hand
   document.querySelectorAll(".cards2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 1) {
          document.getElementById("directions2").innerText = "Please wait for other player";
          discard2.push(item.innerText);
          item.className = "hidden";
          let index = hand2.indexOf(item.innerText);    
          if (index > -1) {
          hand2.splice(index, 1);
          addSendStage2();
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


    function takeSpecials () {    
        document.querySelectorAll(".cards2").forEach(item => {
          if (stage1 === 2 && stage2 === 2) {
            if (item.innerText === "Grab" || item.innerText === "Double"|| item.innerText === "Combine"|| item.innerText === "Buy" || item.innerText === "Increase"){
              specialDeck2.push(item.innerText);
              item.className = "hidden";
              let index = hand2.indexOf(item.innerText);    
              hand2.splice(index, 1);
      
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