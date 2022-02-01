const gameOptions = ['rock', 'paper','scissors','lizard','spock'];
const bgGradient = document.getElementById('bg-gradient');
const root = document.querySelector(':root');

let playerScore = 0;
let computerScore = 0;
let resultCase = 0;
let health = 10;
let energy = 10;
let progress = 0;

let roundCounter = 0;
let wins = 0;
let losses = 0;
let played = 0;
let points = 0;

let playerSelection = '';

function computerPlay() { 
    let randomSelection = Math.floor(Math.random() * gameOptions.length);
    return gameOptions[randomSelection];
}

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `It's a tie! ${tied()}`
    } else if (playerSelection === 'rock' && computerSelection === 'scissors' || computerSelection === 'lizard') {
        playerScore++;
        progress++;
        energy--;
        return `Luck be with you! ${capitalize(playerSelection)} crushes ${computerSelection}. ${story()}`;
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        playerScore++;
        progress++;
        energy--;
        return `${capitalize(playerSelection)} covers ${computerSelection}. ${story()}`; 
    } else if (playerSelection === 'paper' && computerSelection === 'Spock') {
        playerScore++;
        progress++;
        energy--;
        return `${capitalize(playerSelection)} disproves ${computerSelection}. ${story()}`
    } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        playerScore++;
        progress++;
        energy--;
        return `You win! ${capitalize(playerSelection)} cuts ${computerSelection}. ${story()}`;    
    } else if (playerSelection === 'scissors' && computerSelection === 'lizard') {
        playerScore++;
        progress++;
        energy--;
        return `You win! ${capitalize(playerSelection)} decapitates ${computerSelection}. ${story()}`; 
    } else if (playerSelection === 'lizard' && computerSelection === 'paper') {
        playerScore++;
        progress++;
        energy--;
        return `You win! ${capitalize(playerSelection)} eats ${computerSelection}. ${story()}`;
    } else if (playerSelection === 'lizard' && computerSelection === 'spock') {
        playerScore++;
        progress++;
        energy--;
        return `You win! ${capitalize(playerSelection)} poisons ${computerSelection}. ${story()}`;
    } else if (playerSelection === 'Spock' && computerSelection === 'scissors') {
        playerScore++;
        progress++;
        energy--;
        return `You win! ${capitalize(playerSelection)} smashes ${computerSelection}. ${story()}`;
    } else if (playerSelection === 'Spock' && computerSelection === 'rock') {
        playerScore++;
        progress++;
        energy--;
        return `You win! ${capitalize(playerSelection)} vaporizes ${computerSelection}. ${story()}`;
    }  else {
        computerScore++;
        health--;
        return `Oops! ${capitalize(playerSelection)} is defeated by ${computerSelection}. 
        Something hits the side of the ship causing damage. I'll add it to the ever growing to-do list on required fixes, Captain.`;
    }   
}

function story() {
    // theres 9 options, write at least over 10
    let randomSelection = Math.floor(Math.random() * 8);
    let storyText = '';
    switch(randomSelection) {
        case 0: 
            storyText = 'The denizens of space float peacefully around you. Move onwards to safety!';
            break;
        case 1: 
            storyText = 'Better hustle on out of here.' ;
            break;
        case 2:
            storyText = 'A loud POP comes from the engine room. Hopefully that wasn\'t anything important.'
            break;
        ;
        case 3:
            storyText = 'The ship makes a loud clanging noise and lurches forward. Better grab that steering wheel, Captain!'
            break;
        ;
        case 4:
            storyText = 'Remember, Don\'t Panic!'
            break;
        ;
        case 5:
            storyText = 'You regain control of the ship for a brief moment, better get out of the way!'
            break;
        ;
        case 6:
            storyText = 'Did you know having a towel in this situation would have helped?'
            break;
        ;
        case 7:
            storyText = 'Maybe skipping upgrades at the last docking point was a bad idea.'
            break;
        ;
        case 8:
            storyText = 'Something creaks in the vent near you...that was probably nothing.'
            break;
        ;
        default:
            storyText = 'Don\'t Panic.';
            console.log = "Something went wrong."
            break;
    }
    return storyText;
}

function tied() {
    let randomSelection = Math.floor(Math.random() * 100);
    let tiedText = '';
    if (randomSelection <= 20) {
        health++;
        return tiedText = 'The ship won\'t respond, but the idle time seems to have recovered some health.'; 
    } else {
        return tiedText = 'What awful luck.';
    }
}

function changeUI(gradientColor,rootColor) {
    bgGradient.style.setProperty('--lime', gradientColor);
    root.style.setProperty('--blue', rootColor);
}

function updateStats() {
    const healthBar = document.getElementById("health-bar");
    const energyBar = document.getElementById("energy-bar");
    const progressBar = document.getElementById("progress-bar");
    
    healthBar.value = health;
    energyBar.value = energy;
    progressBar.value = progress;

    if (health >= 6) {
        healthBar.style.setProperty('--health-bar','#009D48');
        changeUI('#00ff2a', '#00F0FF');
    } else if (health < 6 && health >= 3) {
        healthBar.style.setProperty('--health-bar','#FFF500');
        changeUI('#FFC700', '#FFF3B4');
    } else {
        healthBar.style.setProperty('--health-bar','#E00849');
        changeUI('#E00849', '#FFB4CF');
    }
}

function updateLog(gameUpdate) {
    const parentDiv = document.querySelector('#log-content');
    const pFirst = document.querySelector('#log-content p');
    const p = document.createElement('p');
    let text = document.createTextNode(gameUpdate);
    
    pFirst.classList.toggle('alert-text');
    p.classList.toggle('alert-text');
    p.appendChild(text);
    parentDiv.insertBefore(p , pFirst);
}

function clearLog() {
    const parentDiv = document.querySelector('#log-content');
    const childP = parentDiv.querySelectorAll('p');
    if (parentDiv.hasChildNodes()) {
        parentDiv.removeChild(parentDiv.childNodes[0]);
    }  
}

function toggleHidden(alert) {
    document.getElementById(alert).classList.toggle('hidden');
}

function getScore(scenerio) {
    let totalPoints = document.getElementById('total-points');
    let timesWon = document.getElementById('times-survived');
    let timesLost = document.getElementById('times-lost');
    let timesPlayed = document.getElementById('times-played');
    let alertHeading = document.querySelector('#play-again-container h2');
    let alertP = document.querySelector('#play-again-container .main-text');
    let alertScore = document.querySelector('#play-again-container .score');
    let endingText = '';

    switch(scenerio) {
        case 'lost':
            played++;
            losses++;
            timesPlayed.innerHTML = played.toString();
            timesLost.innerHTML = losses.toString();
            endingText = `You lost! 
                          The AI has taken complete control of the ship and is leading your 
                          crew straight towards a very large and hungry tardigrade. 
                          ${playerScore.toString()} : ${computerScore.toString()} wins`;
            alertHeading.innerHTML = endingText.slice(0,8);
            alertP.innerHTML = endingText.slice(10, 187);
            alertScore.innerHTML = endingText.slice(189);
            updateLog(endingText);
            roundReset();
            toggleHidden('play-again-container');
            break;
        case 'won':
            played++;
            wins++;
            points = health;
            timesPlayed.innerHTML = played.toString();
            timesWon.innerHTML = wins.toString();
            totalPoints.innerHTML = points.toString();
            endingText = `You Won! We won\'t become alien food today, Captain! How very lucky!
                          Your leftover health is turned into points, you've earned ${points.toString()}.
                          ${playerScore.toString()} : ${computerScore.toString()} wins`;
            alertHeading.innerHTML = endingText.slice(0, 8);
            alertP.innerHTML = endingText.slice(9, 158);
            alertScore.innerHTML = endingText.slice(160);
            roundReset();
            toggleHidden('play-again-container');
            break;
        default:
            console.log('Something went wrong');
            break;
    }
}

function gameState() {
    if (progress === 10 && health > 0) {
        getScore('won');
    } else if (progress < 10 && energy === 0 || health === 0) {
        getScore('lost');
    } 
}

function roundReset() {
    changeUI('#00ff2a', '#00F0FF');
    health = 10;
    energy = 10;
    progress = 0;
    playerScore = 0;
    computerScore = 0;
}

function gameReset() {
    roundReset();
    roundCounter = 0;
    wins = 0;
    losses = 0;
    played = 0;
    points = 0;
}

function game() {  
    let computerSelection = computerPlay();
    let roundResult = playRound(playerSelection, computerSelection);
    roundCounter++;
    roundResult = roundCounter.toString() + ': ' + roundResult;
    updateLog(roundResult);
    updateStats(); 
    gameState();
}

const choices = document.querySelectorAll('#rock-paper-scissors .choice');
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        playerSelection = choice.id;
        game();
    });
});

const startGame = document.querySelector('#start-alert #start');
const noToGame = document.querySelector('#start-alert #no');
const noToGameText = document.querySelector('#start-alert .main-text');
const noToGameHeader = document.querySelector('#start-alert h2');
const noToGameBtn = document.getElementById('start');
const noToGameQ = document.querySelector('#start-alert .question');
const playAgain = document.querySelector('#play-again button');
const resetButton = document.getElementById('reset-link');

function btnEvents() {
    
    

}


startGame.addEventListener('click',() => {
    toggleHidden('start-container');
});

noToGame.addEventListener('click',() => {
    toggleHidden('no');
    noToGameText.innerHTML = 'with a tear in your eye you abandon the crew you\'ve known for years to their doom as your escape pod prompty hurtles itself into the giant maws of a football-sized tardigrade. Oops! Well that\'s one way to go.';
    noToGameHeader.innerHTML = 'Waving Goodbye,';
    noToGameQ.innerHTML = 'What a nice daydream. Ready to start?';
    noToGameBtn.innerHTML = 'Uhhhhhh....sure.';
});


playAgain.addEventListener('click',() => {
    updateStats();
    clearLog();
    toggleHidden('play-again-container');
});

resetButton.addEventListener('click', () => gameReset());
    