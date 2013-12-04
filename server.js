var express = require("express")
  , http = require("http")
  , socketio = require("socket.io");

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);


app.configure(function() {
    app.use(express.static(__dirname + '/static'));
});

server.listen(8080, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    console.log('hello jerks!');
    console.log(socket.id);
    socket.emit('fake', 'emitting');
    socket.broadcast.emit('fake', "broadcasting");
});






console.log("hello world!");
