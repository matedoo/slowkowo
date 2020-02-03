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
const infoContainer = document.getElementById('info-container')
const wordContainer = document.getElementById('word-container')
const messageForm = document.getElementById('send-container')
const wordInput = document.getElementById('word-input')
const whoIsTurn = document.getElementById('whoIsTurn')
const roomContainer = document.getElementById('room-container')
const firstLetterContainer = document.querySelector('.first-letter p');

if (messageForm != null) {
  const name = prompt('Podaj swoje imię')
  appendInfo('Dołączyłeś')
  socket.emit('new-user',roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const word = wordInput.value
    // appendWord(word)
    // console.log(word);
    // console.log(word.substr(word.length -1));
    // // console.log(firstLetterContainer.value);
    // console.log(wordContainer.innerText);

    if(word[0] == wordContainer.innerText.substr(wordContainer.innerText.length -1)){
      socket.emit('send-word', roomName, word)
      console.log('poprawne slowo');
      
    }
    else{
      socket.emit('send-word', roomName, word)
      console.log('nie poprawne slowo');
      
    }
    

    wordInput.value = ''

    
    // if(lastChar == wordInput.value[0]){
    //   console.log('poprawne slowo');
    // }
    // else{
    //   console.log('nie poprawne slowo');
      
    // }
  
  })
}
socket.on('word-message', word => {
  // appendWord(word)
  wordContainer.innerText = word
  const lastChar =  word.substr(word.length -1);
  firstLetterContainer.innerHTML = lastChar.toUpperCase();

 

})

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})
socket.on('user-connected', name => {
  appendInfo(`${name} dołączył do gry`)

  let allWords = ['arbuz','banan','cyrkiel','drabina','ekran'];
  let randomWordIndex = Math.floor(Math.random() * allWords.length);
  let randomWord = allWords[randomWordIndex];

  wordContainer.innerText = randomWord;
  const lastChar =  randomWord.substr(randomWord.length -1);
  firstLetterContainer.innerHTML = lastChar.toUpperCase();
})

socket.on('user-disconnected', name => {
  appendInfo(`${name} wyszedł z gry`)
})

// function appendWord(word) {
//   wordContainer.innerText = word
// }
function appendInfo(info){
    infoContainer.innerText = info
}