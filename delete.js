document.getElementsByClassName("specialcards1")[0].addEventListener("click", playGrab); 
let offgrab = 0;

//Play Grab card - remove from Special cards and put in discard1 
function playGrab () {
  if (stage1 === 3 && specialDeck1.indexOf("Grab") > -1 && offgrab === 0){
    grab1 = 1;
    specialDeck1.splice(specialDeck1.indexOf("Grab"), 1)
    discard1.push("Grab")
    displaySpecialCards();

  }
  if (stage1 === 3 && offgrab === 1){
    grab1 = 1;
    offgrab = -1;
    discard1.splice(discard1.indexOf("Grab"), 1)
    specialDeck1.push("Grab")
    displaySpecialCards();
      }  
    offgrab += 1;
} 


document.getElementsByClassName("specialcards1")[1].addEventListener("click", playDouble);
let offdouble = 0;

function playDouble (){
  if (stage1 === 3 && offdouble === 0){
    multiplier1 = 2;
    specialDeck1.splice(specialDeck1.indexOf("Double"), 1);
    discard1.push("Double");
    document.getElementsByClassName("specialcards1")[1].style.backgroundColor = "#d3d3d3";
    socket.emit("bid1", {
      bid1: bid1,
      multiplier1: multiplier1
    });
  }

  if (stage1 === 3 && offdouble === 1){
    multiplier1 = 1;
    offdouble = -1;
    discard1.splice(discard1.indexOf("Double"), 1)
    specialDeck1.push("Double");
    document.getElementsByClassName("specialcards1")[1].style.backgroundColor = "white";
    socket.emit("bid1", {
      bid1: bid1,
      multiplier1: multiplier1
    });
  }
  offdouble += 1;
}