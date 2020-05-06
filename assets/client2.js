var socket = io.connect("http://ec2-18-191-142-129.us-east-2.compute.amazonaws.com:3000");
//var socket = io.connect("http://localhost:8080");

let stage1 = 1;
let stage2 = 1;
let arr2 = [];
let deck2 = []; 
let deck1 = [];
let hand2 = [];
let hand1 = [];
let handlength2 = 0;
let discard2 = [];
let value1 = 0;
let value2 = 0;
let bid1 = 0;
let bid2 = 0;
let multiplier1 = 1;
let multiplier2 = 1;
let buys2 = 1;
let remove2 = [];
let finish2 = 0;
let newRoundCounter = 0;
let grab2 = 0;
let specialDeck2 = [];
let specialDeck1 = [];
let flopsLeft = 0;

socket.on("startResponse", function(data){
    startGame();
})

function startGame (){
    stage2 = 1;
    stage1 = 1;
    arr2 = [];
    deck1 = []; 
    deck2 = []//"Increase", "Grab", "Double", "Double", "Grab"];
    hand1 = []; 
    hand2 = [];
    discard2 = [];
    value2 = 0;
    bid1 = 0;
    bid2 = 0;
    multiplier1 = 1;
    multiplier2 = 1;
    buys2 = 1;
    remove1 = [];
    remove2 = [];
    finish2 = 0;
    grab2 = 0;
    newRoundCounter = 0;
    specialDeck2 = ["Increase"]//, "Double", "Buy", "Grab", "Increase", "Increase", "Combine"];
    specialDeck1 = [];
    createFullDecks();
    createPlayerDecks();
    shuffle(arr2);
    shuffle(deck2);
    dealHand(deck2, hand2);
    displayHand();
    displaySpecialCards();
    displayShop();
    }



socket.on("stage1", function(data){
    stage1 = data.stage1;
    if (stage2 === 2){
        setTimeout(secondStage,900);
        //secondStage();
    }
})


//bid received through server
socket.on("bid1", function(data){
    bid1 = data.bid1;
    multiplier1 = data.multiplier1
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
    }

    
var createPlayerDecks = function() {
    for (let i = 1; i < 7; i++) {
        deck2.push("2");
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
      let cards2 = document.getElementsByClassName("cards2")
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
        specialTransfer ();
      }

      function displaySpecialCards1 () {
        {document.getElementById("sc1").innerText = "Grab";document.getElementById("sc1t").innerText = "#: " + (countInDeck(specialDeck1, "Grab"))}
        {document.getElementById("sc2").innerText = "Double";document.getElementById("sc2t").innerText = "#: " + (countInDeck(specialDeck1, "Double"))}
        {document.getElementById("sc3").innerText = "Combine";document.getElementById("sc3t").innerText = "#: " + (countInDeck(specialDeck1, "Combine"))}
        {document.getElementById("sc4").innerText = "Buy";document.getElementById("sc4t").innerText = "#: " + (countInDeck(specialDeck1, "Buy"))}
        {document.getElementById("sc5").innerText = "Increase";document.getElementById("sc5t").innerText = "#: " + (countInDeck(specialDeck1, "Increase"))}
    }

      function displayShop () {
        document.getElementById("redsh1").innerText = "4";document.getElementById("redsh1b").innerText = "💰: 6";document.getElementById("redsh1t").innerText = "#: " + (countInDeck(arr2, "4"))
        document.getElementById("redsh2").innerText = "6";document.getElementById("redsh2b").innerText = "💰: 10";document.getElementById("redsh2t").innerText = "#: " + (countInDeck(arr2, "6"))
        document.getElementById("redsh3").innerText = "8";document.getElementById("redsh3b").innerText = "💰: 20";document.getElementById("redsh3t").innerText = "#: " + (countInDeck(arr2, "8"))
        document.getElementById("redsh4").innerText = "Grab";document.getElementById("redsh4b").innerText = "💰: 8";document.getElementById("redsh4t").innerText = "#: " + (countInDeck(arr2, "Grab"))
        document.getElementById("redsh5").innerText = "Double";document.getElementById("redsh5b").innerText = "💰: 8";document.getElementById("redsh5t").innerText = "#: " + (countInDeck(arr2, "Double"))
        document.getElementById("redsh6").innerText = "Combine";document.getElementById("redsh6b").innerText = "💰: 10";document.getElementById("redsh6t").innerText = "#: " + (countInDeck(arr2, "Combine"))
        document.getElementById("redsh7").innerText = "Buy";document.getElementById("redsh7b").innerText = "💰: 12";document.getElementById("redsh7t").innerText = "#: " + (countInDeck(arr2, "Buy"))
        document.getElementById("redsh8").innerText = "Increase";document.getElementById("redsh8b").innerText = "💰: 12";document.getElementById("redsh8t").innerText = "#: " + (countInDeck(arr2, "Increase"))
        specialTransfer ();
      }

      function displayShop1 () {
        document.getElementById("sh1").innerText = "4";document.getElementById("sh1b").innerText = "💰: 6";document.getElementById("sh1t").innerText = "#: " + (countInDeck(arr1, "4"))
        document.getElementById("sh2").innerText = "6";document.getElementById("sh2b").innerText = "💰: 10";document.getElementById("sh2t").innerText = "#: " + (countInDeck(arr1, "6"))
        document.getElementById("sh3").innerText = "8";document.getElementById("sh3b").innerText = "💰: 20";document.getElementById("sh3t").innerText = "#: " + (countInDeck(arr1, "8"))
        document.getElementById("sh4").innerText = "Grab";document.getElementById("sh4b").innerText = "💰: 8";document.getElementById("sh4t").innerText = "#: " + (countInDeck(arr1, "Grab"))
        document.getElementById("sh5").innerText = "Double";document.getElementById("sh5b").innerText = "💰: 8";document.getElementById("sh5t").innerText = "#: " + (countInDeck(arr1, "Double"))
        document.getElementById("sh6").innerText = "Combine";document.getElementById("sh6b").innerText = "💰: 10";document.getElementById("sh6t").innerText = "#: " + (countInDeck(arr1, "Combine"))
        document.getElementById("sh7").innerText = "Buy";document.getElementById("sh7b").innerText = "💰: 12";document.getElementById("sh7t").innerText = "#: " + (countInDeck(arr1, "Buy"))
        document.getElementById("sh8").innerText = "Increase";document.getElementById("sh8b").innerText = "💰: 12";document.getElementById("sh8t").innerText = "#: " + (countInDeck(arr1, "Increase"))
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
          sendHand2();
          addSendStage2();
          sendDeck2 ();
    }

          if (stage1 === 2 && stage2 === 2) {
            setTimeout(secondStage(), 500);
            }
    
        }
    })
    })

//send deck2 but don't display instantly on other screen  
function sendDeck2 () {
  socket.emit("deck2", {
    deck2: deck2
  }) 
}
    
//flop received through server
socket.on("deck1", function(data){
  console.log("flop received from player 1")
    deck1[0] = data.deck1[0];
    deck1[1] = data.deck1[1];
    setTimeout(decksReceived, 900);
})


//send Deck and show instantly on other screen
function sendDeck2Instant () {
  socket.emit("deck2Instant", {
    deck2: deck2
  }) 
}

//flop received and displayed through server
socket.on("deck1Instant", function(data){
  console.log("flop received and shown from player 2")
    deck1[0] = data.deck1[0];
    deck1[1] = data.deck1[1];
    document.getElementById("card9").className = "flop1"
    document.getElementById("card10").className = "flop1" 
    if (deck1[0]){document.getElementById("card9").innerText = deck1[0]}
    if (deck1[1]){document.getElementById("card10").innerText = deck1[1]}
    if (!deck1[0]){document.getElementById("card9").className = "hidden"}
    if (!deck1[1]){document.getElementById("card10").className = "hidden"} 
})
    

function specialTransfer (){
socket.emit("specialtransfer2", {
  specialDeck2: specialDeck2,
  arr2: arr2
})
}

socket.on("specialtransfer1", function(data) {
  arr1 = data.arr1;
  specialDeck1 = data.specialDeck1;
  displaySpecialCards1 ();
  displayShop1 ();
})



    function secondStage(){
        takeSpecials();
        setTimeout(displayFlop, 600)
    }

 //function to take special cards from hand and put in special deck
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
        sendHand2(); 
      }


function sendHand2() {
  console.log("handtransfer 2 sent")
  socket.emit("handtransfer2", {
    hand2: hand2,
  })
}

socket.on("handtransfer1", function(data) {
  hand1 = data.hand1;
  document.getElementById("card3").className = "cards1";
  document.getElementById("card2").className = "cards1";
  document.getElementById("card1").className = "cards1";
  document.getElementById("card4").className = "cards1";
  if (hand1.length <= 3){document.getElementById("card4").className = "hidden";}
  if (hand1.length <= 2){document.getElementById("card3").className = "hidden";}
  if (hand1.length <= 1){document.getElementById("card2").className = "hidden";}
  if (hand1.length <= 0){document.getElementById("card1").className = "hidden";}
})



//display flop
function displayFlop (){
if (stage1 === 2 && stage2 === 2) {
  newRoundCounter = 0;
  flopsLeft = Math.floor(((deck2.length+1)/2) -1);
  if (flopsLeft === -1) {flopsLeft = 0} 
  console.log("display flop2 ran");
  document.getElementById("card9").className = "flop1";
  document.getElementById("card10").className = "flop1";
  document.getElementById("card11").className = "flop2";
  document.getElementById("card12").className = "flop2";
  if (deck1[0]){document.getElementById("card9").innerText = deck1[0]}
  if (deck1[1]){document.getElementById("card10").innerText = deck1[1]}
  if (!deck1[0]){document.getElementById("card9").className = "hidden"}
  if (!deck1[1]){document.getElementById("card10").className = "hidden"} 
  if (deck2[0]){document.getElementById("card11").innerText = deck2[0]}
  if (deck2[1]){document.getElementById("card12").innerText = deck2[1]}
  if (!deck2[0]){document.getElementById("card11").className = "hidden"}
  if (!deck2[1]){document.getElementById("card12").className = "hidden"}
  if (parseInt(deck2[0])){value2 += parseInt(deck2[0])}
  if (parseInt(deck2[1])){value2 += parseInt(deck2[1])}  
  
  if (hand2[0]) {
    document.getElementById("directions2").innerText = "Choose Bid Amount";
    document.getElementById("ready2").className = "shown"
    document.getElementById("updates").innerText = "New flop dealt, " + flopsLeft + " left"
  }

  if (!hand2[0]) {
    document.getElementById("directions2").innerText = "Your hand is empty, you cannot bid";
    stage2 = 4;
    socket.emit("finish2", {
      deck2: deck2,
      hand2: hand2
  });
    socket.emit("handempty2");
    console.log("sending empty hand 2 command")

    socket.emit("stage4.2", {
      stage2:stage2,
      hand2: hand2
  })
  }

  stage2 = 3;
  sendHand2();
} 
}



//Eventlistener for Grab card 
document.getElementsByClassName("specialcards2")[0].addEventListener("click", playGrab); 

//Play Grab card - remove from Special cards and put in discard1 
function playGrab () {
  if (stage2 === 3 && specialDeck2.indexOf("Grab") > -1 && grab2 === 0){
    console.log("Grab part1 ran");
    grab2 = 1;
    specialDeck2.splice(specialDeck2.indexOf("Grab"), 1)
    discard2.push("Grab")
    document.getElementsByClassName("specialcards2")[0].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();
  }

  else if (stage2 === 3 && grab2 === 1){
    console.log("Grab part2 ran");
    grab2 = 1;
    discard2.splice(discard2.indexOf("Grab"), 1);
    specialDeck2.push("Grab");
    document.getElementsByClassName("specialcards2")[0].style.backgroundColor = "white";
    displaySpecialCards();
    grab2 = 0;
      }  
} 


//Grab card - Function to take special card from flop and place in special cards
document.querySelectorAll(".flop2").forEach(item => {
  item.addEventListener("click", event => {
    if (stage2 === 3 && grab2 === 1) {
    if (item.innerText === "Double" ||item.innerText === "Buy" ||item.innerText === "Combine" ||item.innerText === "Increase"){
          deck2[deck2.indexOf(item.innerText)] = undefined;
          specialDeck2.push(item.innerText);
          item.className = "hidden";
          document.getElementsByClassName("specialcards2")[0].style.backgroundColor = "white";
          displaySpecialCards();
          sendDeck2Instant ();
          grab2 = 0;
    }
    }
  })
})

//Grab card - Function to take grab from flop without discarding original (push it twice so effectively don't discard original)
  document.querySelectorAll(".flop2").forEach(item => {
    item.addEventListener("click", event => {
      if (stage2 === 3 && grab2 === 1 &&  item.innerText === ("Grab")) {
        grab2 = 0;
        deck2[deck2.indexOf("Grab")] = undefined;
        specialDeck2.push("Grab");
        specialDeck2.push("Grab");
        item.className = "hidden";
        document.getElementsByClassName("specialcards2")[0].style.backgroundColor = "white";
        displaySpecialCards();
        sendDeck2Instant ();
      }
    })
  })

//Eventlistener for double card
document.getElementsByClassName("specialcards2")[1].addEventListener("click", playDouble);
let offdouble = 0;
function playDouble (){
  if (stage2 === 3 && multiplier2 === 1 && specialDeck2.indexOf("Double") > -1){
    multiplier2 = 2;
    specialDeck2.splice(specialDeck2.indexOf("Double"), 1);
    discard2.push("Double");
    document.getElementsByClassName("specialcards2")[1].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();
    socket.emit("bid2", {
      bid2: bid2,
      multiplier2: multiplier2
    });
  }

  else if (stage2 === 3 && multiplier2 === 2){
    multiplier2 = 1;
    discard2.splice(discard2.indexOf("Double"), 1)
    specialDeck2.push("Double");
    document.getElementsByClassName("specialcards2")[1].style.backgroundColor = "white";
    displaySpecialCards();
    socket.emit("bid2", {
      bid2: bid2,
      multiplier2: multiplier2
    });
  }
}


//Player 2 choose bid
document.querySelectorAll(".cards2").forEach(item => {
  item.addEventListener("click", event => {
    if (stage2 === 3 && item.className === ("cards2")) {
        bid2 += parseInt(item.innerText);
        remove2.push(item.innerText);
        socket.emit("bid2", {
          bid2: bid2,
          multiplier2: multiplier2
        });
        setTimeout(delayClassChange, 20, item)
      }
  })
})

function delayClassChange (item) {
item.className = "cards2dark";
}

document.addEventListener("click", unclick );

function unclick (event) {
let item = event.target;
if (stage2 === 3 && item.className === ("cards2dark")) {
  bid2 -= parseInt(item.innerText);
  remove2.splice(remove2.indexOf(item.innerText), 1);
  socket.emit("bid2", {
    bid2: bid2,
    multiplier2: multiplier2
  });
  item.className = "cards2";
}
}



    //function to move stage2 to 4 and send stage and hand data, then run player bid
  document.getElementById("ready2").addEventListener("click", stage2plus1);

  function stage2plus1 () {
    document.getElementsByClassName("specialcards2")[0].style.backgroundColor = "white";
    document.getElementsByClassName("specialcards2")[1].style.backgroundColor = "white";
    document.querySelectorAll(".cards2dark").forEach(item => {
    item.className = "cards2"})
    stage2 = 4;
    socket.emit("stage4.2", {
        stage2: stage2,
        hand2: hand2
    })
    playerbid()
  }


  
//stage4 received through server
socket.on("stage4.1", function(data){
  hand1 = data.hand1;
  stage1 = data.stage1;
  playerbid();
})

//remove bids from hand, calculate winning bid, move to next stage
function playerbid (){
      if (stage1 === 4 && stage2 === 4) {
        for (let item in remove2) {
            let index = hand2.indexOf(remove2[item]);    
                if (index > -1) {
                    hand2.splice(index, 1);
                    discard2.push(remove2[item]);
                }
        }  



//function to send finish command on delay when no one bids
function finishTimeout (){
  socket.emit("finish2", {
    deck2: deck2,
    hand2: hand2,
  });
}


//calculate winning bid
if (bid1 === 0 & bid2 === 0){
  setTimeout(finishTimeout, 900)
  document.getElementById("updates").innerText= "No one bid, moving to next phase in 1 second";
  document.getElementById("finished2").className = "hidden"; 
}

else if (bid2*multiplier2 > bid1*multiplier1) {
  stage2 = 5;
  buys2 = 1;
  document.getElementById("directions2").innerText = "Opponent bid " + bid1*multiplier1 + ". Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
  document.getElementById("updates").innerText= " "; 
  document.getElementById("finished2").className = "shown";
  document.querySelectorAll(".flop2").forEach(item => {
    if (item.innerText === "Grab" ||item.innerText === "Double" ||item.innerText === "Buy" ||item.innerText === "Combine" ||item.innerText === "Increase"){  
      specialDeck2.push(item.innerText);
      item.className = "hidden";
      let index = deck2.indexOf(item.innerText);     
      deck2[index] = undefined;
      sendDeck2Instant();
    }
   })
  displaySpecialCards();
}

else if (bid2*multiplier2 === bid1*multiplier1) {
  stage2 = 5;
  buys2 = 1;
  document.getElementById("directions2").innerText = "Equal bids, spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
  document.getElementById("updates").innerText= " "; 
  document.getElementById("finished2").className = "shown";
  document.querySelectorAll(".flop2").forEach(item => {
    if (item.innerText === "Grab" ||item.innerText === "Double" || item.innerText === "Buy" ||item.innerText === "Combine" ||item.innerText === "Increase"){
           specialDeck2.push(item.innerText);
           item.className = "hidden";
           let index = deck2.indexOf(item.innerText);     
           deck2[index] = undefined;
           sendDeck2Instant();
    }
  })
  displaySpecialCards();
}

if (bid1*multiplier1 > bid2*multiplier2) {
document.getElementById("directions2").innerText = "Opponent bid " + bid1*multiplier1 + " which beat your bid of " + bid2*multiplier2; 
document.getElementById("updates").innerText= " "; 
socket.emit("finish2", {
  deck2: deck2,
  hand2: hand2
});
}

//reset remove arrays, call displayhands function, move to next stage (player buy phase)     
  remove2 = [];
  displayHand ();  
  sendHand2(); 
  document.getElementById("ready2").className = "hidden"                                                     
}
}

//Always on listeners that check for buy phase and what card is clicked so player takes it into discard pile
document.getElementsByClassName("shopcards2")[0].addEventListener("click", take4);
document.getElementsByClassName("shopcards2")[1].addEventListener("click", take6);
document.getElementsByClassName("shopcards2")[2].addEventListener("click", take8);
document.getElementsByClassName("shopcards2")[3].addEventListener("click", takeGrab);
document.getElementsByClassName("shopcards2")[4].addEventListener("click", takeDouble);
document.getElementsByClassName("shopcards2")[5].addEventListener("click", takeCombine);
document.getElementsByClassName("shopcards2")[6].addEventListener("click", takeBuy);
document.getElementsByClassName("shopcards2")[7].addEventListener("click", takeIncrease);


//Combine card listeners and functions
document.getElementsByClassName("specialcards2")[2].addEventListener("click", playCombine);
let offcombine = 0;
let undocombine = 0;

function playCombine (){
 if (stage2 === 5 && specialDeck2.indexOf("Combine") > -1 && offcombine === 0) {
 if (parseInt(deck1[0])){value2 += parseInt(deck1[0]);undocombine += parseInt(deck1[0])}
 if (parseInt(deck1[1])){value2 += parseInt(deck1[1]);undocombine += parseInt(deck1[1])}
 document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2+" buy(s)";  
 specialDeck2.splice(specialDeck2.indexOf("Combine"), 1)
 discard2.push("Combine");
 document.getElementsByClassName("specialcards2")[2].style.backgroundColor = "#d3d3d3";
 displaySpecialCards();  
 setTimeout(function (){offcombine += 1;}, 20)
}

if (stage2 === 5 && offcombine === 1 && undocombine <= value2) {
  if (parseInt(deck1[0])){value2 -= parseInt(deck1[0]);undocombine -= parseInt(deck1[0])}
  if (parseInt(deck1[1])){value2 -= parseInt(deck1[1]);undocombine -= parseInt(deck1[1])}
  document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)";  
  discard2.splice(discard2.indexOf("Combine"), 1)
  specialDeck2.push("Combine");
  document.getElementsByClassName("specialcards2")[2].style.backgroundColor = "white";
  displaySpecialCards();  
  offcombine = 0;
 }
}


//Increase card listeners and functions
document.getElementsByClassName("specialcards2")[4].addEventListener("click", playIncrease);
let offincrease = 0;
let undoincrease = 0;
function playIncrease (){
    if (stage2 === 5 && specialDeck2.indexOf("Increase") > -1 && offincrease === 0) {
    if (parseInt(deck2[0])){value2 += parseInt(deck2[0]);undoincrease += parseInt(deck2[0])}
    if (parseInt(deck2[1])){value2 += parseInt(deck2[1]);undoincrease += parseInt(deck2[1])}
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)";  
    specialDeck2.splice(specialDeck2.indexOf("Increase"), 1)
    discard2.push("Increase");
    document.getElementsByClassName("specialcards2")[4].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();  
    setTimeout(function (){offincrease+= 1;}, 20)
  }

  if (stage2 === 5 && offincrease === 1 && undoincrease <= value2) {
    if (parseInt(deck2[0])){value2 -= parseInt(deck2[0]);undoincrease -= parseInt(deck2[0])}
    if (parseInt(deck2[1])){value2 -= parseInt(deck2[1]);undoincrease -= parseInt(deck2[1])}
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)";  
    discard2.splice(discard2.indexOf("Increase"), 1)
    specialDeck2.push("Increase");
    document.getElementsByClassName("specialcards2")[4].style.backgroundColor = "white";
    displaySpecialCards();  
    offincrease = 0;
  }
}


  //Buy card listeners and functions
  document.getElementsByClassName("specialcards2")[3].addEventListener("click", playBuy);
  let offbuy = 0;
  
   function playBuy (){
   if (stage2 === 5 && specialDeck2.indexOf("Buy") > -1 && offbuy === 0) {
     buys2 += 1;
     document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
     specialDeck2.splice(specialDeck2.indexOf("Buy"), 1)
     discard2.push("Buy");
     document.getElementsByClassName("specialcards2")[3].style.backgroundColor = "#d3d3d3";
     displaySpecialCards();  
     setTimeout(function (){offbuy += 1;}, 20)
   }
  
   if (stage2 === 5 && offbuy === 1 && buys2 > 0) { 
    buys2 -= 1;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    discard2.splice(discard2.indexOf("Buy"), 1)
    specialDeck2.push("Buy");
    document.getElementsByClassName("specialcards2")[3].style.backgroundColor = "white";
    displaySpecialCards();  
    offbuy = 0;
  }
  }



  //Functions to recognize when buy round is over
  document.getElementById("finished2").addEventListener("click", sendFinish)

  function sendFinish () {
    document.getElementById("finished2").className = "hidden";
    document.getElementsByClassName("specialcards2")[2].style.backgroundColor = "white";
    document.getElementsByClassName("specialcards2")[3].style.backgroundColor = "white";
    document.getElementsByClassName("specialcards2")[4].style.backgroundColor = "white";
    socket.emit("finish2", {
      deck2: deck2,
      hand2: hand2
  });
    socket.emit("lastBuy2");

  }

  socket.on("finish", function(data){
    hand1 = data.hand1;
    newFlop();
})

  
  //New flop function (resetting all parameters)
  function newFlop () {
      console.log("newflop2 ran");
      document.getElementById("card4").className = "card1";
      document.getElementById("finished2").className = "hidden";
      discard2.push(deck2.shift());
      discard2.push(deck2.shift());
      sendDeck2 ();
      stage1 = 2;
      bid1 = 0;
      bid2 = 0;
      multiplier1 = 1;
      multiplier2 = 1;
      value1 = 0;
      value2 = 0;
      finish2 = 0;
      buys2 = 0;
      grab2 = 0;
      offcombine = 0;
      offbuy = 0;
      offincrease = 0;
      undocombine = 0;
      undoincrease = 0;
      undobuy = 0;
      stage2 = 6;
      setTimeout(decksReceived, 900)
    }

function decksReceived (){
    if (stage2 === 6){
        stage2 = 2;
        displayFlop()
    } 
}


socket.on("newRound", newRound)


function newRound (){
  if (newRoundCounter === 0) {
    newRoundcounter = 1;
    document.getElementById("updates").innerText= "Round over, decks shuffled and new round started";
    document.getElementById("card3").className = "cards1";
    document.getElementById("card2").className = "cards1";
    document.getElementById("card1").className = "cards1";
    document.getElementById("card9").className = "hidden";
    document.getElementById("card10").className = "hidden";
    document.getElementById("card11").className = "hidden";
    document.getElementById("card12").className = "hidden";
    console.log("New round ran");
    discard2.push(...hand2);
    discard2.push(...deck2);
    var filtered = discard2.filter(function (el) {
      return (el != null ||el != undefined);
      });
    discard2 = filtered;
    hand2 = [];
    shuffle(discard2);
    deck2 = discard2;
    discard2 = [];
    dealHand(deck2, hand2)
    displayHand();
    displayShop();
    displaySpecialCards();
    document.getElementById("directions2").innerText = "Click a card to discard";
    document.getElementById("ready2").className = "hidden";
    stage1 = 1; 
    stage2 = 1;
    bid1 = 0;
    bid2 = 0;
    multiplier1 = 1;
    multiplier2 = 1;
    value1 = 0;
    value2 = 0;
    finish2 = 0;
    buys2 = 0;
    deck1 = [];
    offcombine = 0;
    offbuy = 0;
    offincrease = 0;
    grab2 = 0;
    undocombine = 0;
    undoincrease = 0;
    undobuy = 0;
  }
}

  //Buy function for player 2
function take4 () {
  if (value2 >= 6 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "4") > 0){
    arr2.splice(arr2.indexOf("4"), 1)
    discard2.push("4")
    buys2 -= 1;
    value2 -= 6;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
}
}

function take6 () {
  if (value2 >= 10 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "6") > 0){
    arr2.splice(arr2.indexOf("6"), 1)
    discard2.push("6")
    buys2 -= 1;
    value2 -= 10;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();

}
}

function take8 () {
  if (value2 >= 20 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "8") > 0){
    arr2.splice(arr2.indexOf("8"), 1)
    discard2.push("8")
    buys2 -= 1;
    value2 -= 20;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
    if (arr2.indexOf("8") === -1) {document.getElementById("updates").innerText = "You win!"}
}
}

function takeGrab () {
  if (value2 >= 8 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "Grab") > 0){
    arr2.splice(arr2.indexOf("Grab"), 1)
    specialDeck2.push("Grab")
    buys2 -= 1;
    value2 -= 8;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
    displaySpecialCards();
}
}

function takeDouble () {
  if (value2 >= 8 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "Double") > 0){
    arr2.splice(arr2.indexOf("Double"), 1)
    specialDeck2.push("Double")
    buys2 -= 1;
    value2 -= 8;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
    displaySpecialCards();
}
}

function takeCombine () {
  if (value2 >= 10 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "Combine") > 0){
    arr2.splice(arr2.indexOf("Combine"), 1)
    specialDeck2.push("Combine")
    buys2 -= 1;
    value2 -= 10;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
    displaySpecialCards();
}

}

function takeBuy () {
  if (value2 >= 12 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "Buy") > 0){
    arr2.splice(arr2.indexOf("Buy"), 1)
    specialDeck2.push("Buy")
    buys2 -= 1;
    value2 -= 12;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
    displaySpecialCards();
}
}

function takeIncrease () {
  if (value2 >= 12 && buys2 > 0 && stage2 === 5 && countInDeck(arr2, "Increase") > 0){
    arr2.splice(arr2.indexOf("Increase"), 1)
    specialDeck2.push("Increase")
    buys2 -= 1;
    value2 -= 12;
    document.getElementById("directions2").innerText = "Spend up to " + value2 + " in your shop in " + buys2 +" buy(s)"; 
    displayShop();
    displaySpecialCards();
}
}