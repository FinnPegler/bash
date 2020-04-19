var socket = io.connect("http://localhost:8080");

var start = document.getElementById("start")

if (start){start.addEventListener("click", function (){
    socket.emit("start", {})
})
}

socket.on("start", function(data){
    document.getElementById("arr1").innerText = data.arr1;
})
