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

//odczytanie slow i wrzucenie do obiektu
var fs = require('fs');

var data = fs.readFileSync('client/slowa.txt');
        var testData = {};
        var splitList = data.toString().split('\r\n');
        for (var i = 0; i < splitList.length; i++) {
            testData['fileNumber' + i.toString()] = splitList[i];
        }
var modal = 'tutaj jestem';        
//koniec
io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-word', (room, word) => {
      //proba
        // if (Object.values(testData).indexOf(word) > -1) {
        //   console.log('poprawne slowo');
          
          socket.to(room).broadcast.emit('word-message', word,{
          name: rooms[room].users[socket.id] })
          // wyslanie na front obiektu
          // socket.emit("testtest", testData); 
      //  }
      //  else{
      //    console.log('nie poprawne slowo');
      //    socket.to(room).broadcast.emit('wrong-word-message', word,{
      //    name: rooms[room].users[socket.id] })   
      //  }
      //koniec
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



