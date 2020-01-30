const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 3000;
const http = require('http');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
// app.use(express.static(clientPath));
// const io = require('socket.io')(3000)


const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-word', message => {
    socket.broadcast.emit('chat-message', { message: message})
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

http.listen(port, function(){
    console.log(`listening on *:${port}`);
    
})
// io.on('connection', socket =>{
//     socket.emit('chat-message', 'Hello World')
// })
// const http = require('http');
// const socketio = require('socket.io');

// // const WordsGame = require('./play');



// const clientPath = `${__dirname}/../client`;
// console.log(`Serving static from ${clientPath}`);



// const server = http.createServer(app);

// const io = socketio(server);

// let waitingPlayer = null;

// io.on('connection', (sock) => {

//   if (waitingPlayer) {
//     new WordsGame(waitingPlayer, sock);
//     waitingPlayer = null;
//     sock.emit('message', 'Ruch przeciwnika'); 
//   } else {
//     waitingPlayer = sock;
//     waitingPlayer.emit('message', 'Czekasz na przeciwnika...');
    
//   }

//   sock.on('message', (text) => {
//     io.emit('message', text);
//   });
// });

// server.on('error', (err) => {
//   console.error('Server error:', err);
// });

// server.listen(3000, () => {
//   console.log('WordsGame started on 3000');
// });





