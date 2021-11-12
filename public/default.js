var board;
var game;

window.onload = function () {
    initGame();

    // manage board flip
    $('#flipOrientationBtn').on('click', board.flip);

    // manage board reset
    function resetBoard(board) {
        console.log("resetting board...");
        board.start;
        localStorage.setItem("fen","");  
        location.reload(); // patch... non funziona board start
      }
    $('#startPositionBtn').on('click', resetBoard);

    // fix drag n drop on mobile
    jQuery('#chess_board').on('scroll touchmove touchend touchstart contextmenu', function(e){
        e.preventDefault();
    });
};

// setup my socket client
var socket = io();

/*
window.onclick = function(e) {
    socket.emit('message', 'hello chess players!');
};
*/
var game_position = 'start';
if (localStorage.getItem("fen")) {
    game_position = localStorage.getItem("fen");
}

var initGame = function() {
   var cfg = {
       draggable: true,
       position: game_position,
       // orientation: 'black',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

var handleMove = function(source, target ) {
    var move = game.move({from: source, to: target});
    
    if (move === null)  {
        return 'snapback';
    }
    else {
        socket.emit("move", move);
        console.log("sender: " + board.fen());
        document.getElementById("fen").innerHTML = board.fen();
    }
};

// called when the server calls socket.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);  
    board.position(game.fen()); // fen is the board layout
    console.log("recvrs: " + board.fen());
    document.getElementById("fen").innerHTML = board.fen();
    // TO DO - save data somewhere in local storage, to recover in case of connection lost
    localStorage.setItem("fen", board.fen());
});

