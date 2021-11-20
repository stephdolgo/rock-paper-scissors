const gameOptions = ['rock', 'paper','scissors'];
const maxGameRounds = 5;

let playerSelection;
let computerSelection;
let gameResult;
let playerScore = 0;
let computerScore = 0;

function computerPlay() { 
    //Create array: rock paper scissors
    //use math.random to select random game option/action from array
    let randomSelection = Math.floor(Math.random() * gameOptions.length);
    //return value
    return gameOptions[randomSelection];
}

function playerPlay() {
    // recieve string from player no matter how its capitalized and remove spaces
    // record string into variable
    // what happens if player's entry is not applicable? 
    let playerEntry = window.prompt('Rock, paper, scissors, shoot!').trim();

    if (playerEntry === 'rock' || playerEntry === 'paper' || playerEntry === 'scissors') {
        return playerEntry = playerEntry.toLowerCase();
    }
    else {
        playerEntry = window.prompt('Oops! That is not a valid entry. To play, select from either rock, paper or scissors.').trim();
    }
}

function playRound(playerSelection, computerSelection) {
    // 9 combos, 3 ways to win, default to either a tie or defeat
    // write out possible win combos and add score to winner
    if (playerSelection === computerSelection) {
        return 'Its a tie!'
    } if (playerSelection === 'rock' && computerSelection === 'scissors') {
            playerScore++;
            return 'You win! ' + playerSelection + ' beats ' + computerSelection + '.'
    }
       if (playerSelection === 'paper' && computerSelection === 'rock') {
            playerScore++;
            return 'You win! ' + playerSelection + ' beats ' + computerSelection + '.'
       } if (playerSelection === 'scissors' && computerSelection === 'paper') {
            playerScore++;
            return 'You win! ' + playerSelection + ' beats ' + computerSelection + '.'
       }
       else {
            computerScore++;
            return 'You lose! ' + playerSelection + ' is defeated by ' + computerSelection + '.'
       }   
}

function gameScore() {
   //compare total score of player vs. computer, start with tie, then player win, end at a loss check
   //declare winner
   if (playerScore === computerScore) {
       return `Stalemate! ${playerScore.toString()}:${computerScore.toString()}.`
   } if (playerScore > computerScore) {
        return `You've won the game! With a score of ${playerScore.toString()} vs. ${computerScore.toString()}.`
   } else {
        return `Oh no! You lost the game! You only scored ${playerScore.toString()} while the computer won ${computerScore.toString()} points. Better luck next time!`
   }
}

function game() {
    //Get game results, get scores, track game round 
    //loop 5 times (set to variable to make it easier to change later)
    // declare win/loss/tie after all rounds have been played, ie loop ends
    let trackRound = 0; 

    for(let i = 0; i < maxGameRounds; i++) {
        trackRound++;

        playerSelection = playerPlay();
        computerSelection = computerPlay();
        gameResult = playRound(playerSelection, computerSelection);
        
        console.log(`Round ${trackRound.toString()}: ${gameResult}`);
    }

    console.log(gameScore());

}

game();




