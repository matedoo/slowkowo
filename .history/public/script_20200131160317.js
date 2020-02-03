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

if (messageForm != null) {
  const name = prompt('Podaj swoje imię')
  appendInfo('Dołączyłeś')
  socket.emit('new-user',roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const word = wordInput.value
    // appendWord(word)
    socket.emit('send-word', roomName, word)
    wordInput.value = ''
    checkInput()
  })
}


socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('word-message', word => {
  // appendWord(word)
  wordContainer.innerText = word
  console.log(word);
  // 
})

socket.on('user-connected', name => {
  appendInfo(`${name} dołączył do gry`)
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


let lastChar = '';
let inputFirstChar = '';
let OpWord = '';
// const writeWord = () =>{

    let input = document.querySelector('.draw_word').value;
    inputFirstChar = input[0];
    OpWord = document.querySelector('.word_opponent_text');
    OpWord.innerHTML = input;

    let firstLetterContainer = document.querySelector('.first-letter p');
    lastChar =  input.substr(input.length -1);
    firstLetterContainer.innerHTML = lastChar.toUpperCase();

    console.log(inputFirstChar);
    console.log(lastChar);
 
    
  
   
// }
 
const checkInput = () =>{
      if(inputFirstChar == lastChar){
        console.log('wygrales');
       
     
        // p1.emit('message', 'poprawne słowo');
    }
    else{
        
        console.log('przegrales');
            
    }
      
}