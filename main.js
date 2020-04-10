document.getElementById("newgame").addEventListener("click",startGame);
document.querySelectorAll(".cards1").forEach(item => {
    item.addEventListener("click", event => {
      if (stage1 === 1) {
          item.className = "hidden";
          stage1 = 2;
        }
    })
  })

  document.querySelectorAll(".cards2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 1) {
          item.className = "hidden"
          stage2 = 2;}
    })
  })

function createFullDecks() {
    for (let i = 1; i < 5; i++) {
        arr1.push("4");arr1.push("6");arr1.push("8");arr1.push("Grab Special Card");arr1.push("Plus One Buy");arr1.push("Double Bid");arr1.push("Combine Values");arr1.push("Double Your Value");
        arr2.push("4");arr2.push("6");arr2.push("8");arr2.push("Grab Special Card");arr2.push("Plus One Buy");arr2.push("Double Bid");arr2.push("Combine Values");arr2.push("Double Your Value");
    }
  }

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

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function dealHand (deck, hand) {
      for (let i = 0; i <4;i++){
          hand[i]= deck.shift();
      }
  }

  function discardCard1 (){
      if (stage1 = 1) {console.log("yes")}
  }

  

arr1 = []; arr2 = [];
deck1 = []; deck2 = [];
hand1 = []; hand2 = [];
stage1 = 0;
stage2 = 0;

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
    console.log(arr1);
    console.log(arr2);
    console.log(deck1);
    console.log(deck2);
    console.log(hand1);
    console.log(hand2);
       
}







