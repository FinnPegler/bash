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

arr1 = []; arr2 = [];
deck1 = []; deck2 = [];
hand1 = []; hand2 = [];
stage1 = 0;
stage2 = 0;
value1 = 0;
value2 = 0;
document.getElementById("newgame").addEventListener("click",startGame);

  //Creates the full decks for both players
function createFullDecks() {
    for (let i = 1; i < 5; i++) {
        arr1.push("4");arr1.push("6");arr1.push("8");arr1.push("Grab Special Card");arr1.push("Plus One Buy");arr1.push("Double Bid");arr1.push("Combine Values");arr1.push("Double Your Value");
        arr2.push("4");arr2.push("6");arr2.push("8");arr2.push("Grab Special Card");arr2.push("Plus One Buy");arr2.push("Double Bid");arr2.push("Combine Values");arr2.push("Double Your Value");
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

  //Displays player hands on screen
  function displayHands () {
    document.getElementById("card1").innerText = hand1[0];
    document.getElementById("card2").innerText = hand1[1];
    document.getElementById("card3").innerText = hand1[2];
    document.getElementById("card4").innerText = hand1[3];
    document.getElementById("card5").innerText = hand2[0];
    document.getElementById("card6").innerText = hand2[1];
    document.getElementById("card7").innerText = hand2[2];
    document.getElementById("card8").innerText = hand2[3];
    document.getElementById("directions1").innerText = "Click Card to Discard";
    document.getElementById("directions2").innerText = "Click Card to Discard"; 
    }



//Function to discard clicked card from Player1 hand
document.querySelectorAll(".cards1").forEach(item => {
  item.addEventListener("click", event => {
    if (stage1 === 1) {
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
    document.getElementById("directions1").innerText = "Choose Bid Amount";
    document.getElementById("directions2").innerText = "Choose Bid Amount";
    document.getElementById("ready1").className = "shown"
    document.getElementById("ready2").className = "shown"
    setTimeout(function(){stage1 = 3;stage2 = 3}, 100);
  } 
  }

  //Player 1 choose bid
      let bid1 = 0;
      let remove1 = [];

      document.querySelectorAll(".cards1").forEach(item => {
        item.addEventListener("click", event => {
          if (stage1 === 3) {
              bid1 += parseInt(item.innerText)
              remove1.push(item.innerText);
            }
        })
      })

//Player 2 choose bid
      let bid2 = 0;
      let remove2 = [];
      document.querySelectorAll(".cards2").forEach(item => {
        item.addEventListener("click", event => {
          if (stage2 === 3) {
              bid2 += parseInt(item.innerText)
              remove2.push(item.id);
            }
        })
      })

  
//Compare bids
document.getElementById("ready1").addEventListener("click", player1bid);
document.getElementById("ready2").addEventListener("click", player2bid);

function player1bid (){
  stage1 = 4;
  if (stage2 === 4) {
    if (bid1 > bid2) {
      stage1 = 5;stage2 = 8;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop";
      for (let item in remove1) {
      let index = hand1.indexOf(remove1[item]);    
        if (index > -1) {
        hand1.splice(index, 1);
      }}
    }
  }
    if (bid2 > bid1) {
      stage2 = 6;stage1 = 8;
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop"}
      for (let item in remove2) {
        let index = hand2.indexOf(remove2[item]);    
          if (index > -1) {
          hand2.splice(index, 1);
    if (bid1 === bid2) {
      stage1 = 7; stage2 = 7;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop";
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop"}
  }
}
  remove1 = [];remove2 = [];displayHands();
}


function player2bid (){
  stage2 = 4;
  if (stage1 === 4) {
    if (bid1 > bid2) {
      stage1 = 5;
      stage2 = 8;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop";}
      console.log(hand1)
    if (bid2 > bid1) {
      stage2 = 6;
      stage1 = 8;
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop";}
    if (bid1 === bid2) {
      stage1 = 7; 
      stage2 = 7;
      document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop";
      document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop";}
  }
}
  


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
    

    //console.log(arr1);
    //console.log(arr2);
    //console.log(deck1);
    //console.log(deck2);
    //console.log(hand1);
    //console.log(hand2);
       
}







