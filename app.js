var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

server.listen(3000, function(){
  console.log('listening on localhost:3000');
});

/* Socket code */
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('user enter', function(msg) {
    io.emit('user enter', msg);
  });

  socket.on('user leave', function(msg) {
    io.emit('user leave', msg);
  });

  socket.on('user typing', function(msg) {
    io.emit('user typing', msg);
  });
});
