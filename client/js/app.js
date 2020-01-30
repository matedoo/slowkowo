

// // let allWords = ['arbuz','banan','cyrkiel','drabina','ekran'];
// // let randomWordIndex = Math.floor(Math.random() * allWords.length);
// // let randomWord = allWords[randomWordIndex];



// // function OpponentTurn(){
// //     let OpWord = document.querySelector('.word_opponent_text');
// //     OpWord.innerHTML = randomWord;

// //     let firstLetterContainer = document.querySelector('.first-letter p');
// //     let lastChar =  randomWord.substr(randomWord.length -1);
// //     firstLetterContainer.innerHTML = lastChar.toUpperCase();

// //     let input = document.querySelector('.draw_word').value;
// //     let inputFirstChar = input.charAt(0);
    
    

// //     if(inputFirstChar == lastChar){
// //         console.log('wygrales');
        
// //     }
// //     else{
// //         console.log('przegrales');
        
// //     }

// // }

// // poczatek



// // let lastChar = '';
// // let inputFirstChar = '';
// // let OpWord = '';
// // const writeWord = () =>{

// //     let input = document.querySelector('.draw_word').value;
// //     inputFirstChar = input[0];
// //     OpWord = document.querySelector('.word_opponent_text');
// //     OpWord.innerHTML = input;

// //     let firstLetterContainer = document.querySelector('.first-letter p');
// //     lastChar =  input.substr(input.length -1);
// //     firstLetterContainer.innerHTML = lastChar.toUpperCase();

// //     console.log(inputFirstChar);
// //     console.log(lastChar);
 
    
  
   
// // }
 
// // const checkInput = () =>{
// //       if(inputFirstChar == lastChar){
// //         console.log('wygrales');
// //         return writeWord();
     
// //         // p1.emit('message', 'poprawne słowo');
// //     }
// //     else{
        
// //         console.log('przegrales');
            
// //     }
      
// // }



// // const writeEvent = (text) =>{
// //     const turn = document.querySelector('.move_player p');
// //     turn.innerHTML = text;
// // }

// // const addButtonListeners = () =>{
// //     let btn = document.querySelector('.check');
// //     btn.addEventListener('click', () => {
// //         sock.emit('turn', writeWord())
// //         // sock.emit('message', 'eheheh')
// //         return checkInput();
        
// //     });

// // };

// // writeEvent('Witaj w słówkowo');

// // const sock = io();
// // sock.on('message', writeEvent);
// // addButtonListeners();
// // writeWord();

// // kuniec 
   

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













