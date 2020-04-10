document.getElementById("newgame").addEventListener("click", newGame);

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

arr1 = []; arr2 = [];
function newGame () {
for (let i = 1; i < 7; i++) {
    arr1.push("2");arr1.push("4");
    arr2.push("2");arr2.push("4");
}
for (let i = 1; i < 5; i++) {
    arr1.push("6");arr1.push("8");arr1.push("grab");arr1.push("buy");arr1.push("double");arr1.push("take");arr1.push("increase");
    arr2.push("6");arr2.push("8");arr2.push("grab");arr2.push("buy");arr2.push("double");arr2.push("take");arr2.push("increase");
}

shuffle(arr1);
shuffle(arr2);
console.log(arr1);
console.log(arr2);
}




