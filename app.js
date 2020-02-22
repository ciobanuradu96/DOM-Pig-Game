/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*1.rolling 2 6 in a row lose all points ( save previously dice roll)
  2.input filed to change the score from 100 to more or less ( read value with  .value propriety)
  3.add a second dice to the game player lose the score when one of them is 1
*/

/*
if prefiousRoll===6 && dice===6
*/
var scores, roundScore, activePlayer, dice, gamePlaying,rm=0,winingScore,dice2;

init();





//Roll Button**********************************************************************************************

document.querySelector('.btn-roll').addEventListener('click', function() {


  if (gamePlaying) {
    //1. Random number
     dice =  Math.floor(Math.random() * 6) + 1;
     dice2 =  Math.floor(Math.random() * 6) + 1;
    //*Test duble 6
    dice===6 && dice2==6? rm=rm+1 : rm=0;
    if(rm>=2){
      nextPlayer();
      rm=0;
    }
    //2.Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    //3.Update the round score IF the rolled number was NOT a 1
    if (dice !== 1 && dice2 !==1) {
      //ADD score
      roundScore=roundScore+dice+dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      //Next player
      nextPlayer();
    }
  }
})



//Hold Button*********************************************************************************************

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //Add CURENT score to GLOBAL roundScore
    scores[activePlayer] += roundScore;

    // SET-SCORE**************************************************************************************************

    winingScore===undefined? winingScore=100 : winingScore =document.getElementById("set-score").value;
    document.getElementById("set-score").value==0?winingScore=100:winingScore=document.getElementById("set-score").value;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winingScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
    //nextPlayer
    //nextPlayer();
  }

})

//New game-button*********************************************************************************************

document.querySelector('.btn-new').addEventListener('click', init);


//Functions****************************************************************************************************

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player1';
  document.getElementById('name-1').textContent = 'Player2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}


/*function btn(){
  //Do something here
}
*/

//setter
//document.querySelector('#current-' +activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';
//getter
//var x = document.querySelector('#score-0').textContent;
//console.log(x);
