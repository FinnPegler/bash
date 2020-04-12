    
console.log("Stage1 =" + stage1)
console.log("Stage2 =" + stage2)
console.log("Hand1 =" + hand1)
console.log("Hand2 =" + hand2)
console.log("Deck1 =" + deck1)
console.log("Deck2 =" + deck2)
console.log("Discard1 =" + discard1)
console.log("Discard2 =" + discard2)
console.log("Bid1 =" + bid1)
console.log("Bid2 =" + bid2)
console.log("Remove1 =" + remove1)
console.log("Remove2 =" + remove2)
console.log("Value1 =" + value1)
console.log("Value2 =" + value2)


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

