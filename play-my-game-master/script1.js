/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying, winning_score;
var prevScore;


init();

//Anonymous fxn
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1) random number
        var dice1;
        var dice2;
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        dice_score = dice1 + dice2
        console.log(dice1, dice2);

        //2) display the results
        var diceDOM1 = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2')

        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';

        diceDOM1.src = 'dice-' + dice1 + '.png'
        diceDOM2.src = 'dice-' + dice2 + '.png'

        //3) Update the round score if the rolled no.was not a 1
        // if (prevScore === 6 && dice1 === 6) {
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = 0;
        //     nextPlayer();
        // }
        // else if (dice1 !== 1 && dice2 !== 1) {
        //     //add score
        //     roundScore += dice_score;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;


        // } else {
        //     nextPlayer();
        // }

        // prevScore = dice;
        if (dice1 !== 1 && dice2 !== 1) {
            //     //add score
            roundScore += dice_score;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current scores to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        console.log(input);

        //undefined,0,null," " are coerced to false
        //anything else coersed to true
        if (input) {
            winning_score = input;
        } else {
            winning_score = 100;
        }

        //check who won the game
        if (scores[activePlayer] >= winning_score) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!'
            // document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';

            gamePlaying = false;
        }
        else {
            //next player
            nextPlayer();

        }
    }

})

function nextPlayer() {
    //next player'
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //changing active status
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}



