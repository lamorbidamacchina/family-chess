var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

// setup my socket server
var io = require('socket.io')(http);
 
io.on('connection', function(socket) { 
    const ts = Math.floor(Date.now() / 1000);
    console.log('new connection: '+ ts);

    const count = io.engine.clientsCount;
    console.log("Connected clients: " + count);
    
    // not working
    /* socket.on('connected_clients', function(count){
        socket.broadcast.emit('connected_clients',count);
    }); */
    
    /* socket.on('message', function(msg) {
        console.log('Got message from client: ' + msg);     
    }); */
    
    // Called when the client calls socket.emit('move')
    socket.on('move', function(msg) {
        console.log('client moving on room: '+msg.room);
        socket.broadcast.emit('move', msg.move); 
     });
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});