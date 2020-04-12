//Listen for New Game button being pressed and run startGame function when it is
//Stages: 
//0 = Website load, before New Game button is pressed 
//1 = New Game button pressed, all decks and hands created, shuffled and delt. New round has started, awaiting first discard move.
//2 = Card discarded
//3 = Flop dealt, awaiting player bids
//4 = Comparing bids
//5 = Buy phase
//6 = Next flop
let arr1 = []; let arr2 = [];
let deck1 = []; let deck2 = [];
let hand1 = []; let hand2 = [];
let discard1 = []; let discard2 = [];
let stage1 = 0; let stage2 = 0;
let bid1 = 0; let bid2 = 0;
let remove1 = []; let remove2 = [];
let value1 = 0; value2 = 0;
let buys1 = 1; let buys2 = 1;
let finishCount = 0;
let specialDeck1 = ["Increase", "Grab", "Grab", "Grab"];
let specialDeck2 = ["Increase", "Grab", "Grab", "Grab"];

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
  displaySpecialCards();
  document.getElementById("directions1").innerText = "Click a card to discard";
  document.getElementById("directions2").innerText = "Click a card to discard";
}

  //Creates the full decks for both players
function createFullDecks() {
    for (let i = 1; i < 5; i++) {
        arr1.push("4");arr1.push("6");arr1.push("8");arr1.push("Grab");arr1.push("Buy");arr1.push("Double");arr1.push("Combine");arr1.push("Increase");
        arr2.push("4");arr2.push("6");arr2.push("8");arr2.push("Grab");arr2.push("Buy");arr2.push("Double");arr2.push("Combine");arr2.push("Increase");
    }
    arr1.pop();arr2.pop(); //we want one less Increase card as one is in players special deck already
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
        deck1.push("Increase");
        deck1.push("Grab");
        deck1.push("Combine");
        deck1.push("Double");
        deck1.push("Buy"); 
        deck2.push("Increase");
        deck2.push("Grab");
        deck2.push("Combine");
        deck2.push("Double");
        deck2.push("Buy");
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

//Display hands
if (hand1[0]) {document.getElementById("card1").innerText = hand1[0];document.getElementById("card1").className = "cards1"}
if (hand1[1]) {document.getElementById("card2").innerText = hand1[1];document.getElementById("card2").className = "cards1"}
if (hand1[2]) {document.getElementById("card3").innerText = hand1[2];document.getElementById("card3").className = "cards1"}
if (hand1[3]) {document.getElementById("card4").innerText = hand1[3];document.getElementById("card4").className = "cards1"}

if (hand2[0]) {document.getElementById("card5").innerText = hand2[0];document.getElementById("card5").className = "cards2"}
if (hand2[1]) {document.getElementById("card6").innerText = hand2[1];document.getElementById("card6").className = "cards2"}
if (hand2[2]) {document.getElementById("card7").innerText = hand2[2];document.getElementById("card7").className = "cards2"}
if (hand2[3]) {document.getElementById("card8").innerText = hand2[3];document.getElementById("card8").className = "cards2"}
  }




//display Special Cards
function displaySpecialCards () {
  {document.getElementById("sc1").innerText = "Grab";document.getElementById("sc1t").innerText = "#: " + (countInDeck(specialDeck1, "Grab"))}
  {document.getElementById("sc2").innerText = "Double";document.getElementById("sc2t").innerText = "#: " + (countInDeck(specialDeck1, "Double"))}
  {document.getElementById("sc3").innerText = "Combine";document.getElementById("sc3t").innerText = "#: " + (countInDeck(specialDeck1, "Combine"))}
  {document.getElementById("sc4").innerText = "Buy";document.getElementById("sc4t").innerText = "#: " + (countInDeck(specialDeck1, "Buy"))}
  {document.getElementById("sc5").innerText = "Increase";document.getElementById("sc5t").innerText = "#: " + (countInDeck(specialDeck1, "Increase"))}

 
  {document.getElementById("redsc1").innerText = "Grab";document.getElementById("redsc1t").innerText = "#: " + (countInDeck(specialDeck2, "Grab"))}
  {document.getElementById("redsc2").innerText = "Double";document.getElementById("redsc2t").innerText = "#: " + (countInDeck(specialDeck2, "Double"))}
  {document.getElementById("redsc3").innerText = "Combine";document.getElementById("redsc3t").innerText = "#: " + (countInDeck(specialDeck2, "Combine"))}
  {document.getElementById("redsc4").innerText = "Buy";document.getElementById("redsc4t").innerText = "#: " + (countInDeck(specialDeck2, "Buy"))}
  {document.getElementById("redsc5").innerText = "Increase";document.getElementById("redsc5t").innerText = "#: " + (countInDeck(specialDeck2, "Increase"))}
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


//Eventlistener for Grab card 
document.getElementsByClassName("specialcards1")[0].addEventListener("click", playGrab); 
document.getElementsByClassName("specialcards2")[0].addEventListener("click", twoplayGrab);

//Play Grab card - remove from Special cards and put in discard1 (player 1)
let grab1 = 0;
function playGrab () {
  if (stage1 === 3 && specialDeck1.indexOf("Grab") > -1){
    grab1 = 1;
    specialDeck1.splice(specialDeck1.indexOf("Grab"), 1)
    discard1.push("Grab")
    displaySpecialCards();
    console.log("first part of playgrab ran")
      }
    }  
     
  //Functions to take special card from deck and place in special cards (Player 1)  
  document.querySelectorAll(".flop1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && grab1 === 1 &&  item.innerText === ("Grab")) {
        grab1 = 0;
        deck1.splice(deck1.indexOf("Grab"), 1)
        specialDeck1.push("Grab");
        specialDeck1.push("Grab");
        item.className = "hidden";
        displaySpecialCards();
        console.log("Grabbed Grab Card");
      }
    })
  })

  document.querySelectorAll(".flop1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && grab1 === 1 &&  item.innerText === ("Double")) {
        grab1 = 0;
        deck1.splice(deck1.indexOf("Double"), 1)
        specialDeck1.push("Double");
        item.className = "hidden";
        displaySpecialCards();
        console.log("Doublebed Double Card");
      }
    })
  })

  document.querySelectorAll(".flop1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && grab1 === 1 &&  item.innerText === ("Combine")) {
        grab1 = 0;
        deck1.splice(deck1.indexOf("Combine"), 1)
        specialDeck1.push("Combine");
        item.className = "hidden";
        displaySpecialCards();
        console.log("Combinebed Combine Card");
      }
    })
  })

  document.querySelectorAll(".flop1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && grab1 === 1 &&  item.innerText === ("Buy")) {
        grab1 = 0;
        deck1.splice(deck1.indexOf("Buy"), 1)
        specialDeck1.push("Buy");
        item.className = "hidden";
        displaySpecialCards();
        console.log("Buybed Buy Card");
      }
    })
  })

  document.querySelectorAll(".flop1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 3 && grab1 === 1 &&  item.innerText === ("Increase")) {
        grab1 = 0;
        deck1.splice(deck1.indexOf("Increase"), 1)
        specialDeck1.push("Increase");
        item.className = "hidden";
        displaySpecialCards();
        console.log("Grabbed Increase Card");
      }
    })
  })


//Play Grab card - remove from Special cards and put in discard2 (player 2)
let grab2 = 0;
function twoplayGrab () {
  if (stage2 === 3 && specialDeck2.indexOf("Grab") > -1){
    grab2 = 1;
    specialDeck2.splice(specialDeck2.indexOf("Grab"), 1)
    discard2.push("Grab")
    displaySpecialCards();
      }
    }  
     
  //Functions to take special card from deck and place in special cards (Player 2)  
  document.querySelectorAll(".flop2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 3 && grab2 === 1 &&  item.innerText === ("Grab")) {
        grab2 = 0;
        deck2.splice(deck2.indexOf("Grab"), 1)
        specialDeck2.push("Grab");
        specialDeck2.push("Grab");
        item.className = "hidden";
        displaySpecialCards();
      }
    })
  })

  document.querySelectorAll(".flop2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 3 && grab2 === 1 &&  item.innerText === ("Double")) {
        grab2 = 0;
        deck2.splice(deck2.indexOf("Double"), 1)
        specialDeck2.push("Double");
        item.className = "hidden";
        displaySpecialCards();
      }
    })
  })

  document.querySelectorAll(".flop2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 3 && grab2 === 1 &&  item.innerText === ("Combine")) {
        grab2 = 0;
        deck2.splice(deck2.indexOf("Combine"), 1)
        specialDeck2.push("Combine");
        item.className = "hidden";
        displaySpecialCards();
      }
    })
  })

  document.querySelectorAll(".flop2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 3 && grab2 === 1 &&  item.innerText === ("Buy")) {
        grab2 = 0;
        deck2.splice(deck2.indexOf("Buy"), 1)
        specialDeck2.push("Buy");
        item.className = "hidden";
        displaySpecialCards();
      }
    })
  })

  document.querySelectorAll(".flop2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 3 && grab2 === 1 &&  item.innerText === ("Increase")) {
        grab2 = 0;
        deck2.splice(deck2.indexOf("Increase"), 1)
        specialDeck2.push("Increase");
        item.className = "hidden";
        displaySpecialCards();
      }
    })
  })








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
          discard2.push(item.innerText);
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
    //New round - if both Decks are empty, put hand into discard pile, then shuffle discard pile and turn it into new deck.
    if (!deck1[0] && !deck2[0]){
      document.getElementById("updates").innerText= "Round over, decks shuffled and new round started"
      {document.getElementById("card9").className = "hidden"}
      {document.getElementById("card10").className = "hidden"}
      {document.getElementById("card11").className = "hidden"}
      {document.getElementById("card12").className = "hidden"}
      console.log("New round ran");
      discard1.push(...hand1);
      discard2.push(...hand2);
      hand1 = [];
      hand2 = [];
      shuffle(discard1);
      shuffle(discard2);
      deck1 = discard1;
      deck2 = discard2;
      discard1 = [];
      discard2 = [];
      dealHand(deck1, hand1)
      dealHand(deck2, hand2)
      displayHands();
      displayShop();
      displaySpecialCards();
      document.getElementById("directions1").innerText = "Click a card to discard";
      document.getElementById("directions2").innerText = "Click a card to discard";
      document.getElementById("ready1").className = "hidden";
      document.getElementById("ready2").className = "hidden";
      stage1 = 1; 
      stage2 = 1;
    }

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
  }

  //Eventlistener for double card
  //document.getElementsByClassName("specialcards1")[1].addEventListener("click", playDouble);
  //document.getElementsByClassName("specialcards2")[1].addEventListener("click", twoplayDouble);

  //Player 1 choose bid
      document.querySelectorAll(".cards1").forEach(item1 => {
        item1.addEventListener("click", event => {
          if (stage1 === 3 && item1.className === ("cards1")) {
              bid1 += parseInt(item1.innerText);
              remove1.push(item1.innerText);
              console.log(item1);
            }
        })
      })

//Player 2 choose bid
      document.querySelectorAll(".cards2").forEach(item2 => {
        item2.addEventListener("click", event => {
          if (stage2 === 3 && item2.className === ("cards2")) {
              bid2 += parseInt(item2.innerText);
              remove2.push(item2.innerText);
              console.log(item2);
            }
        })
      })

  
//Compare bids, remove bids from hand, call display hands function, call display flop function
document.getElementById("ready1").addEventListener("click", stage1plus1);
document.getElementById("ready2").addEventListener("click", stage2plus1);

function stage1plus1 () {
  stage1 = 4;
  if (!hand2[0]){stage2 = 4;}
  playerbid()}


function stage2plus1 () {
  stage2 = 4;
  if (!hand1[0]){stage1 = 4;}
  playerbid()}

//remove bids from hand
function playerbid (){
  if (stage1 === 4 && stage2 === 4) {
    for (let item in remove1) {
      let index = hand1.indexOf(remove1[item]);                 
        if (index > -1) {
        hand1.splice(index, 1);
        discard1.push(remove1[item]);
      }
    }                                                                                                     
  
      for (let item in remove2) {
        let index = hand2.indexOf(remove2[item]);    
          if (index > -1) {
          hand2.splice(index, 1);
          discard2.push(remove2[item]);
          }
      }

//calculate winning bid
    if (bid1 === 0 & bid2 === 0){finishCount = 2;document.getElementById("updates").innerText= "No one bid, next flop dealt"; return newFlop();}

    if (bid1 > bid2) {
      stage1 = 5;stage2 = 6;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop"; 
      document.getElementById("finished1").className = "shown"
      buys1 = 1;
      buys2 = 0;
      finishCount = 1;
    }
    if (bid2 > bid1) {
      stage2 = 5;stage1 = 6;
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop"
      document.getElementById("finished2").className = "shown"
      buys1 = 0;
      buys2 = 1;
      finishCount = 1;
    }        
      
    if (bid1 === bid2) {
      stage1 = 5; stage2 = 5;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop";
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop";
      document.getElementById("finished1").className = "shown";
      document.getElementById("finished2").className = "shown";
      buys1 = 1;
      buys2 = 1;
    }
//reset remove arrays, call displayhands function, move to next stage (player buy phase)     
      remove1 = [];
      remove2 = [];
      displayHands ();   
      document.getElementById("ready1").className = "hidden"
      document.getElementById("ready2").className = "hidden"                                                     
  }
}


//Player buy round, events listeners for shop purchases

    document.getElementsByClassName("shopcards1")[0].addEventListener("click", take4);
    document.getElementsByClassName("shopcards1")[1].addEventListener("click", take6);
    document.getElementsByClassName("shopcards1")[2].addEventListener("click", take8);
    document.getElementsByClassName("shopcards1")[3].addEventListener("click", takeGrab);
    document.getElementsByClassName("shopcards1")[4].addEventListener("click", takeDouble);
    document.getElementsByClassName("shopcards1")[5].addEventListener("click", takeCombine);
    document.getElementsByClassName("shopcards1")[6].addEventListener("click", takeBuy);
    document.getElementsByClassName("shopcards1")[7].addEventListener("click", takeIncrease);


    document.getElementsByClassName("shopcards2")[0].addEventListener("click", twotake4);
    document.getElementsByClassName("shopcards2")[1].addEventListener("click", twotake6);
    document.getElementsByClassName("shopcards2")[2].addEventListener("click", twotake8);
    document.getElementsByClassName("shopcards2")[3].addEventListener("click", twotakeGrab);
    document.getElementsByClassName("shopcards2")[4].addEventListener("click", twotakeDouble);
    document.getElementsByClassName("shopcards2")[5].addEventListener("click", twotakeCombine);
    document.getElementsByClassName("shopcards2")[6].addEventListener("click", twotakeBuy);
    document.getElementsByClassName("shopcards2")[7].addEventListener("click", twotakeIncrease);
  

  //Player buy round, events listeners for special card plays
  //document.getElementsByClassName("specialcards1")[2].addEventListener("click", playCombine);
  //document.getElementsByClassName("specialcards1")[3].addEventListener("click", playBuy);
  document.getElementsByClassName("specialcards1")[4].addEventListener("click", playIncrease);

  //document.getElementsByClassName("specialcards2")[2].addEventListener("click", twoplayCombine);
  //document.getElementsByClassName("specialcards2")[3].addEventListener("click", twoplayBuy);
  document.getElementsByClassName("specialcards2")[4].addEventListener("click", twoplayIncrease);

  //Increase card function
  function playIncrease (){
      if (stage1 === 5 && specialDeck1.indexOf("Increase") > -1) {
      if (parseInt(deck1[0])){value1 += parseInt(deck1[0])}
      if (parseInt(deck1[1])){value1 += parseInt(deck1[1])} 
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop"; 
      specialDeck1.splice(specialDeck1.indexOf("Increase"), 1)
      discard1.push("Increase");
      displaySpecialCards();  
      console.log("playIncrease ran")
    }
  }
  

  function twoplayIncrease (){
    if (stage2 === 5 && specialDeck2.indexOf("Increase") > -1) {
      if (parseInt(deck2[0])){value2 += parseInt(deck2[0])}
      if (parseInt(deck2[1])){value2 += parseInt(deck2[1])} 
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop"; 
      specialDeck2.splice(specialDeck2.indexOf("Increase"), 1)
      discard2.push("Increase");
      displaySpecialCards();  
      console.log("twoplayIncrease ran")
    }
  }


  //Function to recognize when buy round is over
  document.getElementById("finished1").addEventListener("click", addToFinishCount1)
  document.getElementById("finished2").addEventListener("click", addToFinishCount2)

  function addToFinishCount1 () {
    finishCount +=1;
    document.getElementById("finished1").className = "hidden";
    newFlop ();
  }

  function addToFinishCount2 () {
    finishCount +=1;
    document.getElementById("finished2").className = "hidden";
    newFlop ();
  }


  //New flop function (resetting all parameters)
  function newFlop () {
    if (finishCount === 2) {
      console.log("newflop ran")
      deck1.shift();
      deck1.shift();
      deck2.shift();
      deck2.shift();
      stage1 = 2;
      stage2 = 2;
      bid1 = 0;
      bid2 = 0;
      value1 = 0;
      value2 = 0;
      finishCount = 0;
      discard1.push(document.getElementById("card9").innerText);
      discard1.push(document.getElementById("card10").innerText);
      discard2.push(document.getElementById("card11").innerText);
      discard2.push(document.getElementById("card12").innerText);
      document.getElementById("card9").className = "flop1"
      document.getElementById("card10").className = "flop1"
      document.getElementById("card11").className = "flop2"
      document.getElementById("card12").className = "flop2"
      displayFlop();
    }
  }


//Buy functions for player 1
function take4 () {
  if (value1 >= 6 && buys1 > 0 && stage1 === 5){
    arr1.splice(arr1.indexOf("4"), 1)
    discard1.push("4")
    buys1 -= 1;
    value1 -= 6;
    displayShop();
}
}

function take6 () {
  if (value1 >= 10 && buys1 > 0 && stage1 === 5){
    arr1.splice(arr1.indexOf("6"), 1)
    discard1.push("6")
    buys1 -= 1;
    value1 -= 10;
    displayShop();

}
}

function take8 () {
  if (value1 >= 20 && buys1 > 0 && stage1 === 5){
    arr1.splice(arr1.indexOf("8"), 1)
    discard1.push("8")
    buys1 -= 1;
    value1 -= 20;
    displayShop();
}
}

function takeGrab () {
  if (value1 >= 8 && buys1 > 0 && stage1 === 5){
    arr1.splice(arr1.indexOf("Grab"), 1)
    specialDeck1.push("Grab")
    buys1 -= 1;
    value1 -= 8;
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
    displayShop();
    displaySpecialCards();
}
}



//Buy function for player 2
function twotake4 () {
  if (value2 >= 6 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("4"), 1)
    discard2.push("4")
    buys2 -= 1;
    value2 -= 6;
    displayShop();
}
}

function twotake6 () {
  if (value2 >= 10 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("6"), 1)
    discard2.push("6")
    buys2 -= 1;
    value2 -= 10;
    displayShop();

}
}

function twotake8 () {
  if (value2 >= 20 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("8"), 1)
    discard2.push("8")
    buys2 -= 1;
    value2 -= 20;
    displayShop();
}
}

function twotakeGrab () {
  if (value2 >= 8 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("Grab"), 1)
    specialDeck2.push("Grab")
    buys2 -= 1;
    value2 -= 8;
    displayShop();
    displaySpecialCards();
}
}

function twotakeDouble () {
  if (value2 >= 8 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("Double"), 1)
    specialDeck2.push("Double")
    buys2 -= 1;
    value2 -= 8;
    displayShop();
    displaySpecialCards();
}
}

function twotakeCombine () {
  if (value2 >= 10 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("Combine"), 1)
    specialDeck2.push("Combine")
    buys2 -= 1;
    value2 -= 10;
    displayShop();
    displaySpecialCards();
}
}

function twotakeBuy () {
  if (value2 >= 12 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("Buy"), 1)
    specialDeck2.push("Buy")
    buys2 -= 1;
    value2 -= 12;
    displayShop();
    displaySpecialCards();
}
}

function twotakeIncrease () {
  if (value2 >= 12 && buys2 > 0 && stage2 === 5){
    arr2.splice(arr2.indexOf("Increase"), 1)
    specialDeck2.push("Increase")
    buys2 -= 1;
    value2 -= 12;
    displayShop();
    displaySpecialCards();
}
}

