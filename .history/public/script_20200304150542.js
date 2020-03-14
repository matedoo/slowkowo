// const socket = io('https://slowkowo.herokuapp.com')
const socket = io()
const infoContainer = document.getElementById('info-container')
const wordContainer = document.getElementById('word-container')
const messageForm = document.getElementById('send-container')
const wordInput = document.getElementById('word-input')
const whoIsTurn = document.getElementById('whoIsTurn')
const roomContainer = document.getElementById('room-container')
const firstLetterContainer = document.querySelector('.first-letter p');
var winner = false;
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
   
      clearInterval(timerInterval);
      timePassed = 0;
      timeLeft = 10;
      
    }
    else{
      appendInfo(`Nie poprawne slowo`)    
    }
    wordInput.value = ''
  })
}
socket.on('word-message', word => {
  // to wysyłamy do drugiego gracza
  wordContainer.innerText = word
  const lastChar =  word.substr(word.length -1);
  firstLetterContainer.innerHTML = lastChar.toUpperCase();
  appendInfo(`Twój ruch`)

  
  startTimer();  
})




 
  // setInterval(() => {
  //   if(timeLeft == 0){
  //     console.log('kuniec');
      
  //   }
  // }, 2000);

// console.log(winner);
  
// if(winner){
//   showWin()
// }
// console.log(winner);

// socket.on('testest', testData =>{
//     if (Object.values(testData).indexOf(word) > -1) {
//           console.log('dziala');
//     }
//   // console.log(testData);
// })

// socket.on('wrong-word-message', word => {
//   appendInfo(`Słowo niezgodne z słownikiem, przegrales`)
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
})

socket.on('user-disconnected', name => {
  appendInfo(`${name} wyszedł z gry`)
})


function appendInfo(info){
    infoContainer.innerText = info
}




// const socket = io('https://slowkowo.herokuapp.com')

//Timer   
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
socket.on('modal-message', modal => {
  // let modal = 'wygrales'
  console.log(modal);
  
})
function onTimesUp() {
  clearInterval(timerInterval);
  appendInfo('Koniec czasu')
  firstLetterContainer.innerHTML = 'Przegrałeś'
  showModal()
  socket.emit('modal-message', modal)
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }


  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

//modal
function showModal(){
  
  document.querySelector('.js-modal-shopify').classList.toggle('is-shown--off-flow');
  document.querySelector('.js-modal-shopify').classList.toggle('is-hidden--off-flow');

}
function showWin(){
  console.log('wygrales bławo');
  
}

let hideModal = document.querySelector('.js-modal-hide').addEventListener('click', ()=>{
  document.querySelector('.js-modal-shopify').classList.toggle('is-shown--off-flow');
  document.querySelector('.js-modal-shopify').classList.toggle('is-hidden--off-flow');
})

