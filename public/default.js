var board;
var game;

const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('room');


function resetBoard() {
    console.log("resetting board...");
    board.start;
    localStorage.clear();
    location.reload(); // patch... non funziona board start
    }

function flipBoard() {
    console.log("flipping board...");
    //board.flip;
    if (localStorage.getItem("flip") == "1") {
        localStorage.setItem("flip","0");
    } else {
        localStorage.setItem("flip","1");
    }
}
    
    
window.onload = function () {
    initGame();

    // manage board flip
    $('#flipOrientationBtn').on('click', board.flip);
    $('#flipOrientationBtn').on('click', flipBoard);

    // manage board reset
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
var pgn = '';
if (localStorage.getItem("pgn")){
    pgn = localStorage.getItem("pgn");
}

var flip = '';
if (localStorage.getItem("flip")) {
    flip = localStorage.getItem("flip");
}
var or = "white";
if (flip == "1") or = "black";

var initGame = function() {
   var cfg = {
       draggable: true,
       position: game_position,
       orientation: or,
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
   if (pgn != '') {
       game.load_pgn(pgn);
   }
   //localStorage.setItem("fen", "");
   //localStorage.setItem("pgn", "");
};

var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});
    if (move === null)  {
        return 'snapback';
    }
    else {
        //socket.emit("move", move);
        socket.emit("move", {"room" : room, "move": move});
        console.log("------------------");
        console.log("room: " + room);
        console.log("sender: " + board.fen());
        console.log(game.pgn());
        // save data in local storage / it needs a sleeping time to update fen
        setTimeout(() => {  
            localStorage.setItem("fen", board.fen());
            localStorage.setItem("pgn", game.pgn()); }
        , 1000);
        
    }
};

// called when the server calls socket.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);  
    board.position(game.fen()); // fen is the board layout
    console.log("------------------");
    console.log("room: " + room);
    console.log("recvrs: " + board.fen());
    console.log(game.pgn());
    // save data in local storage
    localStorage.setItem("fen", board.fen());
    localStorage.setItem("pgn", game.pgn());
});

// not working
/*
socket.on('connected_clients', function (count) {
    console.log("Connected clients: " +count);
});
*/
