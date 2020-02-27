// const socket = io('https://slowkowo.herokuapp.com')
const socket = io()
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

    if(word[0] == wordContainer.innerText.substr(wordContainer.innerText.length -1)){
      socket.emit('send-word', roomName, word)
      console.log('poprawne slowo');
      appendInfo(`Ruch przeciwnika`)
      wordContainer.innerText = '---'
      firstLetterContainer.innerHTML = '?'
    }
    else{
      appendInfo(`Nie poprawne slowo`)    
    }
    wordInput.value = ''
  })
}
socket.on('word-message', word => {
  wordContainer.innerText = word
  const lastChar =  word.substr(word.length -1);
  firstLetterContainer.innerHTML = lastChar.toUpperCase();
  appendInfo(`Twój ruch`)
  
  var tenSeconds = 10,
  display = document.querySelector('#time');
  startTimer(tenSeconds, display);
  if (--timer < 0) {
    // timer = duration;
    appendInfo('Koniec czasu')
    display.innerHTML = 'Przegrałeś'
}
})
socket.on('testest', testData =>{
    if (Object.values(testData).indexOf(word) > -1) {
          console.log('dziala');
    }
  // console.log(testData);
  
})

// socket.on('wrong-word-message', word => {
//   // wordContainer.innerText = word
//   // const lastChar =  word.substr(word.length -1);
//   // firstLetterContainer.innerHTML = lastChar.toUpperCase();
//   appendInfo(`Słowo niezgodne z słownikiem, przegrales`)
  
//   // var tenSeconds = 10,
//   // display = document.querySelector('#time');
//   // startTimer(tenSeconds, display);
// })

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

  // var tenSeconds = 10,
  // display = document.querySelector('#time');
  // startTimer(tenSeconds, display);
})

socket.on('user-disconnected', name => {
  appendInfo(`${name} wyszedł z gry`)
})


	// var wordss = JSON.parse(myJSON)


// function appendWord(word) {
//   wordContainer.innerText = word
// }
function appendInfo(info){
    infoContainer.innerText = info
}



function startTimer(duration, display) {
  var timer = duration,  seconds;
  setInterval(function () {
      seconds = parseInt(timer % 60, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent =  seconds;

  
  }, 1000);
}

