const gameOptions = ['rock', 'paper','scissors'];
const maxGameRounds = 5;

let playerScore = 0;
let computerScore = 0;

function computerPlay() { 
    let randomSelection = Math.floor(Math.random() * gameOptions.length);
    return gameOptions[randomSelection];
}

function playerPlay() {
    let playerEntry = window.prompt('Rock, paper, scissors, shoot!').trim();
    if (playerEntry === 'rock' || playerEntry === 'paper' || playerEntry === 'scissors') {
        return playerEntry = playerEntry.toLowerCase();
    }
    else {
        playerEntry = 
        window.prompt(
            'Oops! That is not a valid entry. To play, select from either rock, paper or scissors.'
            ).trim();
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'Its a tie!'
    } if (playerSelection === 'rock' && computerSelection === 'scissors') {
            playerScore++;
            return `You win! ${playerSelection} beats ${computerSelection}.`;
    }
       if (playerSelection === 'paper' && computerSelection === 'rock') {
            playerScore++;
            return `You win! ${playerSelection} beats ${computerSelection}.`
       } if (playerSelection === 'scissors' && computerSelection === 'paper') {
            playerScore++;
            return `You win! ${playerSelection} beats ${computerSelection}.`;
       }
       else {
            computerScore++;
            return `You lose! ${playerSelection} is defeated by ${computerSelection}.`;
       }   
}

function getScore() {
   if (playerScore === computerScore) {
       return `Stalemate! ${playerScore.toString()}:${computerScore.toString()}.`;
   } if (playerScore > computerScore) {
        return `You've won the game! With a score of ${playerScore.toString()} 
                vs. ${computerScore.toString()}.`;
   } else {
        return `Oh no! You lost the game! You only scored ${playerScore.toString()} 
                while the computer won ${computerScore.toString()} points. Better luck next time!`;
   }
}

function game() {
    let trackRound = 0; 
    for(let i = 0; i < maxGameRounds; i++) {
        trackRound++;

        let playerSelection = playerPlay();
        let computerSelection = computerPlay();
        let gameResult = playRound(playerSelection, computerSelection);
        
        console.log(`Round ${trackRound.toString()}: ${gameResult}`);
    }
    console.log(getScore());
}

// game();

//Canvas Stat Bars






