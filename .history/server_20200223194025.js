const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var router = express.Router();

app.set('port',(process.env.PORT || 5000))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const rooms = { }

app.get('/', (req, res) => {
  res.render('index', { rooms: rooms })
})

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', { roomName: req.params.room })
})

// server.listen(3000)
server.listen(app.get('port'), () =>{
  console.log('Node app is running', app.get('port'));
  
})

    // proba
    var fs = require('fs');


io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-word', (room, word) => {
    fs.readFile('client/slowa.txt', function(err, data, res) {
      if(err) throw err;
      var array = data.toString().split("\n");
      
      // console.log(array);
      // console.log(word);
            
      // var dupa = array.include(word);
      // console.log(dupa);
      
      // console.log(array);
   
      // for(i in array) {
          if(array.includes(word)){
            console.log('dupa');
            
          }
      // }

      // console.log(myJsonString);
      // console.log(array);
      
  });
  //koniec
    socket.to(room).broadcast.emit('word-message', word,{
    name: rooms[room].users[socket.id] })   
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}


// const fs = require('fs');

// fs.readFile('client/slowa.txt', 'utf8', (err, data) => {
//     if (err === null){
//         console.log('Poprawnie odczytano plik.', data);
//     } else {
//         console.log('Błąd podczas odczytu pliku!', err);
//     }
// });

//dziala






// var fs = require('fs');
// fs.readfile('client/slowa.txt', 'utf8', function(err,data) {
//   if(err) throw err;
//   obj = JSON.parse(data);
//   console.log(obj);
// });