global.arr1= [], global.arr2 = [], global.deck1 = [], global.deck2 = [];


var createFullDecks = function () {
for (let i = 1; i < 5; i++) {
    arr1.push("4");arr1.push("6");arr1.push("8");arr1.push("Grab");arr1.push("Buy");arr1.push("Double");arr1.push("Combine");arr1.push("Increase");
    arr2.push("4");arr2.push("6");arr2.push("8");arr2.push("Grab");arr2.push("Buy");arr2.push("Double");arr2.push("Combine");arr2.push("Increase");
}
arr1.pop();arr2.pop(); //we want one less Increase card as one is in players special deck already
console.log("create Full Decks ran")
}


var createPlayerDecks = function() {
    for (let i = 1; i < 7; i++) {
        deck1.push("2");
        deck2.push("2");
    }
    for (let i = 1; i < 3; i++) {
        deck1.push("4");
        deck2.push("4");
    }
  }

  module.exports = {
    createFullDecks: createFullDecks,
    createPlayerDecks: createPlayerDecks
}