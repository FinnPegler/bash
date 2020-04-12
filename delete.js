



 function playBuy (){
  if (stage1 === 5 && specialDeck1.indexOf("Buy") > -1) {
  buys1 +=1;
  document.getElementById("directions1").innerText = "Spend up to " + value1 + " in your shop in " + buys1+"buy(s)"; 
  specialDeck1.splice(specialDeck1.indexOf("Buy"), 1)
  discard1.push("Buy");
  displaySpecialCards();  
  console.log("playBuy ran")
}
}


function twoplayBuy (){
if (stage2 === 5 && specialDeck2.indexOf("Buy") > -1) {
  buys2 += 1;
  document.getElementById("directions2").innerText = "Spend up to " + value1 + " in your shop in " + buys1+"buy(s)"; 
  specialDeck2.splice(specialDeck2.indexOf("Buy"), 1)
  discard2.push("Buy");
  displaySpecialCards();  
  console.log("twoplayBuy ran")
}
}
