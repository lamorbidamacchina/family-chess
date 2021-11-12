var board;
var game;

window.onload = function () {
    initGame();
};

// setup my socket client
var socket = io();

/*
window.onclick = function(e) {
    socket.emit('message', 'hello chess players!');
};
*/

var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       // orientation: 'black',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

var handleMove = function(source, target ) {
    var move = game.move({from: source, to: target});
    
    if (move === null)  return 'snapback';
    else socket.emit("move", move);
};

// called when the server calls socket.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});