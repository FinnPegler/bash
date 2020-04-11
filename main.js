//Listen for New Game button being pressed and run startGame function when it is
//Stages: 
//0 = Website load, before New Game button is pressed 
//1 = New Game button pressed, all decks and hands created, shuffled and delt. New round has started, awaiting first discard move.
//2 = Card discarded
//3 = Flop dealt, awaiting player bids
//4 = Comparing bids
//5 = Player 1 wins
//6 = Player 2 wins
//7 = Draw
//8 = Next flop
arr1 = []; arr2 = [];
deck1 = []; deck2 = [];
hand1 = []; hand2 = [];
stage1 = 0;
stage2 = 0;
value1 = 0;
value2 = 0;
buys1 = 1;
buys2 = 1;


document.getElementById("newgame").addEventListener("click",startGame);

//function to start game
function startGame () {
  document.getElementById("newgame").className= "hidden";
  stage1 = 1;
  stage2= 1;
  createFullDecks ();
  createPlayerDecks();
  shuffle(arr1);
  shuffle(arr2);
  shuffle(deck1);
  shuffle(deck2);
  dealHand(deck1, hand1)
  dealHand(deck2, hand2)
  displayHands();
  displayShop();
  document.getElementById("directions1").innerText = "Click a card to discard";
  document.getElementById("directions2").innerText = "Click a card to discard";
}

  //Creates the full decks for both players
function createFullDecks() {
    for (let i = 1; i < 5; i++) {
        arr1.push("4");arr1.push("6");arr1.push("8");arr1.push("Grab");arr1.push("Buy");arr1.push("Double");arr1.push("Combine");arr1.push("Increase");
        arr2.push("4");arr2.push("6");arr2.push("8");arr2.push("Grab");arr2.push("Buy");arr2.push("Double");arr2.push("Combine");arr2.push("Increase");
    }
  }

  //creates the Player Decks for both players
  function createPlayerDecks() {
    for (let i = 1; i < 7; i++) {
        deck1.push("2");
        deck2.push("2");
    }
    for (let i = 1; i < 3; i++) {
        deck1.push("4");
        deck2.push("4");
    }
  }

  //Shuffle function
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  //Creates player hand from deck
function dealHand (deck, hand) {
      for (let i = 0; i <4;i++){
          hand[i]= deck.shift();
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


//display player shops 
function displayShop () {
  if (countInDeck(arr1, "4") > 0) {document.getElementById("sh1").innerText = "4";document.getElementById("sh1b").innerText = "💰: 6";document.getElementById("sh1t").innerText = "#: " + (countInDeck(arr1, "4"))}
  if (countInDeck(arr1, "6") > 0) {document.getElementById("sh2").innerText = "6";document.getElementById("sh2b").innerText = "💰: 10";document.getElementById("sh2t").innerText = "#: " + (countInDeck(arr1, "6"))}
  if (countInDeck(arr1, "8") > 0) {document.getElementById("sh3").innerText = "8";document.getElementById("sh3b").innerText = "💰: 20";document.getElementById("sh3t").innerText = "#: " + (countInDeck(arr1, "8"))}
  if (countInDeck(arr1, "Grab") > 0) {document.getElementById("sh4").innerText = "Grab";document.getElementById("sh4b").innerText = "💰: 8";document.getElementById("sh4t").innerText = "#: " + (countInDeck(arr1, "Grab"))}
  if (countInDeck(arr1, "Double") > 0) {document.getElementById("sh5").innerText = "Double";document.getElementById("sh5b").innerText = "💰: 8";document.getElementById("sh5t").innerText = "#: " + (countInDeck(arr1, "Double"))}
  if (countInDeck(arr1, "Combine") > 0) {document.getElementById("sh6").innerText = "Combine";document.getElementById("sh6b").innerText = "💰: 10";document.getElementById("sh6t").innerText = "#: " + (countInDeck(arr1, "Combine"))}
  if (countInDeck(arr1, "Buy") > 0) {document.getElementById("sh7").innerText = "Buy";document.getElementById("sh7b").innerText = "💰: 12";document.getElementById("sh7t").innerText = "#: " + (countInDeck(arr1, "Buy"))}
  if (countInDeck(arr1, "Increase") > 0) {document.getElementById("sh8").innerText = "Increase";document.getElementById("sh8b").innerText = "💰: 12";document.getElementById("sh8t").innerText = "#: " + (countInDeck(arr1, "Increase"))}

  if (countInDeck(arr2, "4") > 0) {document.getElementById("redsh1").innerText = "4";document.getElementById("redsh1b").innerText = "💰: 6";document.getElementById("redsh1t").innerText = "#: " + (countInDeck(arr2, "4"))}
  if (countInDeck(arr2, "6") > 0) {document.getElementById("redsh2").innerText = "6";document.getElementById("redsh2b").innerText = "💰: 10";document.getElementById("redsh2t").innerText = "#: " + (countInDeck(arr2, "6"))}
  if (countInDeck(arr2, "8") > 0) {document.getElementById("redsh3").innerText = "8";document.getElementById("redsh3b").innerText = "💰: 20";document.getElementById("redsh3t").innerText = "#: " + (countInDeck(arr2, "8"))}
  if (countInDeck(arr2, "Grab") > 0) {document.getElementById("redsh4").innerText = "Grab";document.getElementById("redsh4b").innerText = "💰: 8";document.getElementById("redsh4t").innerText = "#: " + (countInDeck(arr2, "Grab"))}
  if (countInDeck(arr2, "Double") > 0) {document.getElementById("redsh5").innerText = "Double";document.getElementById("redsh5b").innerText = "💰: 8";document.getElementById("redsh5t").innerText = "#: " + (countInDeck(arr2, "Double"))}
  if (countInDeck(arr2, "Combine") > 0) {document.getElementById("redsh6").innerText = "Combine";document.getElementById("redsh6b").innerText = "💰: 10";document.getElementById("redsh6t").innerText = "#: " + (countInDeck(arr2, "Combine"))}
  if (countInDeck(arr2, "Buy") > 0) {document.getElementById("redsh7").innerText = "Buy";document.getElementById("redsh7b").innerText = "💰: 12";document.getElementById("redsh7t").innerText = "#: " + (countInDeck(arr2, "Buy"))}
  if (countInDeck(arr2, "Increase") > 0) {document.getElementById("redsh8").innerText = "Increase";document.getElementById("redsh8b").innerText = "💰: 12";document.getElementById("redsh8t").innerText = "#: " + (countInDeck(arr2, "Increase"))}
}


//display player hands on screen
function displayHands () {
  //hide hands first
    let cards1 = document.getElementsByClassName("cards1")
    let cards1length = cards1.length
    for (let i = 0; i < cards1length; i++) {
        cards1[0].className = "hidden";
}

let cards2 = document.getElementsByClassName("cards2")
    let cards2length = cards2.length
    for (let i = 0; i < cards2length; i++) {
        cards2[0].className = "hidden";
}

//display all hands next
if (hand1[0]) {document.getElementById("card1").innerText = hand1[0];document.getElementById("card1").className = "cards1"}
if (hand1[1]) {document.getElementById("card2").innerText = hand1[1];document.getElementById("card2").className = "cards1"}
if (hand1[2]) {document.getElementById("card3").innerText = hand1[2];document.getElementById("card3").className = "cards1"}
if (hand1[3]) {document.getElementById("card4").innerText = hand1[3];document.getElementById("card4").className = "cards1"}

if (hand2[0]) {document.getElementById("card5").innerText = hand2[0];document.getElementById("card5").className = "cards2"}
if (hand2[1]) {document.getElementById("card6").innerText = hand2[1];document.getElementById("card6").className = "cards2"}
if (hand2[2]) {document.getElementById("card7").innerText = hand2[2];document.getElementById("card7").className = "cards2"}
if (hand2[3]) {document.getElementById("card8").innerText = hand2[3];document.getElementById("card8").className = "cards2"}
  }

      

//Function to discard clicked card from Player1 hand
document.querySelectorAll(".cards1").forEach(item => {
  item.addEventListener("click", event => {
    if (stage1 === 1) {
        document.getElementById("directions1").innerText = "Please wait for other player";
        item.className = "hidden";
        let index = hand1.indexOf(item.innerText);    
        if (index > -1) {
        hand1.splice(index, 1);
}
        stage1 = 2;
        if (stage1 === 2 && stage2 === 2) {
        displayFlop ();
      }
    }
  })
})

   //Function to discard clicked card from Player2 hand
   document.querySelectorAll(".cards2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 1) {
          document.getElementById("directions2").innerText = "Please wait for other player";
          item.className = "hidden";
        let index = hand2.indexOf(item.innerText);    
        if (index > -1) {
        hand2.splice(index, 1);
}
          stage2 = 2;
          if (stage1 === 2 && stage2 === 2) {
            displayFlop ();
          }
        
      }
    })
    
  })

  //Display flop
  function displayFlop () {
  if (stage1 && stage2 === 2) {
    document.getElementById("card9").innerText = deck1[0];
    document.getElementById("card10").innerText = deck1[1];
    value1 = parseInt(deck1[0]) + parseInt(deck1[1]);
    deck1.shift();
    deck1.shift();
    document.getElementById("card11").innerText = deck2[0];
    document.getElementById("card12").innerText = deck2[1];
    value2 = parseInt(deck2[0]) + parseInt(deck2[1]);
    deck2.shift();
    deck2.shift();
    document.getElementById("ready1").className = "shown"
    document.getElementById("ready2").className = "shown"
    document.getElementById("directions1").innerText = "Choose Bid Amount";
    document.getElementById("directions2").innerText = "Choose Bid Amount";
    setTimeout(function(){stage1 = 3;stage2 = 3}, 100);
  } 
  }

  //Player 1 choose bid
      let bid1 = 0;
      let remove1 = [];

      document.querySelectorAll(".cards1").forEach(item1 => {
        item1.addEventListener("click", event => {
          if (stage1 === 3) {
              bid1 += parseInt(item1.innerText)
              remove1.push(item1.innerText);
            }
        })
      })

//Player 2 choose bid
      let bid2 = 0;
      let remove2 = [];
      document.querySelectorAll(".cards2").forEach(item2 => {
        item2.addEventListener("click", event => {
          if (stage2 === 3) {
            console.log("check")
              bid2 += parseInt(item2.innerText)
              remove2.push(item2.innerText);
            }
        })
      })

  
//Compare bids, remove bids from hand, call display hands function, call display flop function
document.getElementById("ready1").addEventListener("click", stage1plus1);
document.getElementById("ready2").addEventListener("click", stage2plus1);
document.getElementById("ready1").addEventListener("click", playerbid);
document.getElementById("ready2").addEventListener("click", playerbid);

function stage1plus1 () {stage1 = 4}
function stage2plus1 () {stage2 = 4}

//remove bids from hand
function playerbid (){
  if (stage1 ===4 && stage2 === 4) {
    for (let item in remove1) {
      let index = hand1.indexOf(remove1[item]);                 
        if (index > -1) {
        hand1.splice(index, 1);
      }
    }                                                                                                     
  
      for (let item in remove2) {
        let index = hand2.indexOf(remove2[item]);    
          if (index > -1) {
          hand2.splice(index, 1);
          }
      }

//calculate winning bid
    if (bid1 > bid2) {
      stage1 = 5;stage2 = 8;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop"; 
    }
    if (bid2 > bid1) {
      stage2 = 6;stage1 = 8;
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop"}        
      
    if (bid1 === bid2) {
      stage1 = 7; stage2 = 7;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop";
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop"
    }
//reset remove arrays, call displayhands function    
      remove1 = [];remove2 = [];displayHands (); playerBuy();                                                       
  }
}


//Player buy round

function playerBuy () {
  if (stage1 === 5 || stage1 ===7) {
    document.getElementsByClassName("shopcards1")[0].addEventListener("click", take4);
  }
}

function take4 () {
  if (value1 >= 6 && buys1 > 0){arr1.splice(arr1.indexOf("4"), 1)
  buys -= 1;
}
}