// kod komunikacja
// const socket = io('http://localhost:3000')
// const infoContainer = document.getElementById('info-container')
// const wordContainer = document.getElementById('word-container')
// const messageForm = document.getElementById('send-container')
// const wordInput = document.getElementById('word-input')
// const whoIsTurn = document.getElementById('whoIsTurn')

// const name = prompt('Podaj swoje imię')
// appendInfo('Dołączyłeś')
// socket.emit('new-user', name)

// socket.on('word-message', word => {
//   // appendWord(word)
//   wordContainer.innerText = word
//   console.log(word);
//   // 
// })

// socket.on('user-connected', name => {
//   appendInfo(`${name} dołączył do gry`)
// })

// socket.on('user-disconnected', name => {
//   appendInfo(`${name} wyszedł z gry`)
// })

// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const word = wordInput.value
//   // appendWord(word)
//   socket.emit('send-word', word)
//   wordInput.value = ''
  
// })

// // function appendWord(word) {
// //   wordContainer.innerText = word
// // }
// function appendInfo(info){
//     infoContainer.innerText = info
// }
// koniec



const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if(messageForm != null){
  const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', roomName, message)
  messageInput.value = ''
  })
}

socket.on('room-created', room =>{
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'Dołącz'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}