const gameOptions = ['rock', 'paper','scissors','lizard','spock'];

let playerScore = 0;
let computerScore = 0;
let resultCase = 0;
let health = 10;
let energy = 10;
let progress = 0;

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
        tied();
        return 'The aliens have not detected you nor did your ship respond. Maybe try hitting the console with a hammer instead?'
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
        return `You win! ${capitalize(playerSelection)} poisons ${computerSelection}.`;
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
        The engine makes a great loud bang and a very disturbed alien shoots a laser in your direction.`;
    }   
}

function story() {
    // theres 9 options, write at least over 10
    let randomSelection = Math.floor(Math.random() * gameOptions.length);
    let storyText = '';
    switch(randomSelection) {
        case 0: 
            storyText = 'As the engine sputters to life, the aliens seem to take no notice. Move onwards to safety!';
            break;
        case 1: 
            storyText = 'The engine roars back up! Better hustle on out of here.' ;
            break;
        case 2:
            storyText = 'A loud POP comes from the engine room. Time to move foward!'
            break;
        ;
        case 3:
            storyText = 'The ship makes a loud clanging noise and lurches forward. Better grab that steering wheel, Captain!'
            break;
        ;
        case 4:
            storyText = 'Looks like the engines running again. Move forward quickly before an unhappy denizen of space notices you and your crew!'
            break;
        ;
        default:
            storyText = '';
            console.log = "Something went wrong."
            break;
    }
    return storyText;
}

function tied() {
    const hitStat = ['energy', 'health', 'none'];
    let randomSelection = Math.floor(Math.random() * hitStat.length);
    switch (hitStat[randomSelection]) {
        case 'energy':
            break;
        case 'health':
            break;
        case 'none':
            break;
    }
}

function updateStats() {
    const healthBar = document.getElementById("health-bar");
    const energyBar = document.getElementById("energy-bar");
    const progressBar = document.getElementById("progress-bar");
    const bgGradient = document.getElementById('bg-gradient');
    const root = document.querySelector(':root');
    
    healthBar.value = health;
    energyBar.value = energy;
    progressBar.value = progress;

    if (health >= 6) {
        healthBar.style.setProperty('--health-bar','#009D48');
        bgGradient.style.setProperty('--bg-gradient-accent','#00ff2a');
        root.style.setProperty('--main-border-color', '#00F0FF')
    } else if (health < 6 && health >= 3) {
        healthBar.style.setProperty('--health-bar','#FFF500');
        bgGradient.style.setProperty('--bg-gradient-accent','#FFC700');
        root.style.setProperty('--main-border-color', '#FFF3B4')
    } else {
        healthBar.style.setProperty('--health-bar','#E00849');
        bgGradient.style.setProperty('--bg-gradient-accent','#E00849');
        root.style.setProperty('--main-border-color', '#FFB4CF')
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

function getScore(scenerio) {
    let totalPoints = document.getElementById('total-points');
    let timesWon = document.getElementById('times-survived');
    let timesLost = document.getElementById('times-lost');
    let timesPlayed = document.getElementById('times-played');

    switch(scenerio) {
        case 'lost':
            played++;
            losses++;
            timesPlayed.innerHTML = played.toString();
            timesLost.innerHTML = losses.toString();
            updateLog('You lost!');
            reset();
            break;
        case 'won':
            played++;
            wins++;
            points = health + energy;
            timesPlayed.innerHTML = played.toString();
            timesWon.innerHTML = wins.toString();
            totalPoints.innerHTML = points.toString();
            updateLog('You won!');
            reset();
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

function reset() {
    health = 10;
    energy = 10;
    progress = 0;
}

function game() {  
    let computerSelection = computerPlay();
    let roundResult = playRound(playerSelection, computerSelection);
    updateLog(roundResult);
    updateStats(); 
    gameState();
}

const choices = document.querySelectorAll('.select-choice');
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        playerSelection = choice.id;
        game();
    });
});



