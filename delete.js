 //Buy card listeners and functions
 document.getElementsByClassName("specialcards1")[3].addEventListener("click", playBuy);
let offbuy = 0;

 function playBuy (){
 if (stage1 === 5 && specialDeck1.indexOf("Buy") > -1 && offbuy === 0) {
   buys1 += 1;
   document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
   specialDeck1.splice(specialDeck1.indexOf("Buy"), 1)
   discard1.push("Buy");
   document.getElementsByClassName("specialcards1")[3].style.backgroundColor = "#d3d3d3";
   displaySpecialCards();  
 }

 if (stage1 === 5 && specialDeck1.indexOf("Buy") > -1 && offbuy === 1) {
  buys1 -= 1;
  document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)"; 
  discard1.splice(discard1.indexOf("Buy"), 1)
  specialDeck1.push("Buy");
  document.getElementsByClassName("specialcards1")[3].style.backgroundColor = "white";
  displaySpecialCards();  
  offbuy = -1;
}
offbuy += 1;
}




//Increase card listeners and functions
document.getElementsByClassName("specialcards1")[4].addEventListener("click", playIncrease);
let offincrease = 0;

function playIncrease (){
    if (stage1 === 5 && specialDeck1.indexOf("Increase") > -1 && offincrease === 0) {
    if (parseInt(deck1[0])){value1 += parseInt(deck1[0])}
    if (parseInt(deck1[1])){value1 += parseInt(deck1[1])} 
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    specialDeck1.splice(specialDeck1.indexOf("Increase"), 1)
    discard1.push("Increase");
    document.getElementsByClassName("specialcards1")[4].style.backgroundColor = "#d3d3d3";
    displaySpecialCards();  
  }

  if (stage1 === 5 && offincrease === 1) {
    if (parseInt(deck1[0])){value1 -= parseInt(deck1[0])}
    if (parseInt(deck1[1])){value1 -= parseInt(deck1[1])} 
    document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1 +" buy(s)";  
    discard1.splice(discard1.indexOf("Increase"), 1)
    specialDeck1.push("Increase");
    document.getElementsByClassName("specialcards1")[4].style.backgroundColor = "white";
    displaySpecialCards();  
    offincrease = -1;
  }
  offincrease += 1;
}






