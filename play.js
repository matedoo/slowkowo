
// class WordsGame {

//     constructor(p1, p2) {
//       this.players = [p1, p2];
//       this.turns = [null, null];
    
//       this.sendToPlayers('Rozpoczynamy grę');
//       this.players.forEach((player, idx) => {
//         player.on('turn', (turn) => {
//           this.onTurn(idx, turn);
//         });
//       });
//     }
  
//     sendToPlayer(playerIndex, msg) {
//       this.players[playerIndex].emit('message', msg);
      
//     }
  
//     sendToPlayers(msg) {
//       this.players.forEach((player) => {
//         player.emit('message', msg);
//       });
//     }
  
//     onTurn(playerIndex, turn) {
//       this.turns[playerIndex] = turn;
//     //   this.sendToPlayer(playerIndex, `Wykonałeś ruch ${turn}`);  to nie dziala
//     }
//     checkGameOver() {
//         const turns = this._turns;
    
//         if (turns[0] && turns[1]) {
//           this._sendToPlayers('Game over ' + turns.join(' : '));
//           this._getGameResult();
//           this._turns = [null, null];
//           this._sendToPlayers('Next Round!!!!');
//         }
//       }
   
  
//   }
  
//   module.exports = WordsGame;

// // function checkInputDraw() {
// //     let input = document.querySelector('.draw_word').value;
// //     let inputFirstChar = input.charAt(0);
    
    

// //     if(inputFirstChar == lastChar){
// //         console.log('wygrales');
        
// //     }
// //     else{
// //         console.log('przegrales');
        
// //     }
// //   }
// //   window.onload = checkInputDraw;