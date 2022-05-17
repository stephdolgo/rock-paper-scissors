const gameOptions = ['rock', 'paper','scissors','lizard','spock'];
const choices = document.querySelectorAll('#rock-paper-scissors .choice');
const choicesArray = Array.from(choices);
const bgGradient = document.getElementById('bg-gradient');
const root = document.querySelector(':root');

const totalPoints = document.getElementById('total-points');
const timesWon = document.getElementById('times-survived');
const timesLost = document.getElementById('times-lost');
const timesPlayed = document.getElementById('times-played');
const alertHeading = document.querySelector('#play-again-container h2');
const alertP = document.querySelector('#play-again-container .main-text');
const alertScore = document.querySelector('#play-again-container .score');

const healthGroup = document.getElementById('health');
const energyGroup = document.getElementById('energy');
const progressGroup = document.getElementById('progress-game');

const healthBar = document.getElementById('health-bar');
const energyBar = document.getElementById('energy-bar');
const progressBar = document.getElementById('progress-bar');

let playerScore = 0;
let computerScore = 0;
let resultCase = 0;
let health = 10;
let energy = 10;
let progress = 0;
let currentGameNum = 1;
let roundCounter = 0;
let wins = 0;
let losses = 0;
let played = 0;
let points = 0;
let randomProgress = 0;
let playerSelection = '';

function addProgress() {
    randomProgress = Math.floor(Math.random() * 2 + 1);
    animatePlayer(randomProgress);
    playerScore++;
    energy--;
    progress += randomProgress;
    return progress;
}

function loseHealth() {
    animateProjectile();
    computerScore++;
    health--;
}

function computerPlay() { 
    let randomSelection = Math.floor(Math.random() * gameOptions.length);
    return gameOptions[randomSelection];
}

function computerIndicator(selection) {
    selection.classList.add('show-choice');
    selection.querySelector('hr').classList.remove('main-border');
    selection.querySelector('hr').classList.add('alert-border');
    selection.querySelector('h4').innerHTML = 'Computer';
}

function playerIndicator(selection) {
    selection.classList.remove('show-choice');
    selection.querySelector('hr').classList.remove('alert-border');
    selection.querySelector('hr').classList.add('main-border');
    selection.querySelector('h4').innerHTML = 'Player';
}

function tiedIndicator(selection) {
    selection.classList.add('show-choice');
    selection.querySelector('hr').classList.remove('main-border');
    selection.querySelector('hr').classList.add('alert-border');
    selection.querySelector('h4').innerHTML = 'Tied';
}

function resetIndicator(selection) {
    choicesArray.forEach((choice) => {
        for (i = 0; i < choicesArray.length; i++){
            choice.querySelector('.player-choice').classList.remove('show-choice');
            choice.querySelector('hr').classList.remove('main-border');
        } 
    });
}

function activeIndicator(selection, indicator) {
    const indicateRock = document.getElementById('rock-indicator');
    const indicatePaper = document.getElementById('paper-indicator');
    const indicateScissors = document.getElementById('scissors-indicator');
    const indicateLizard = document.getElementById('lizard-indicator');
    const indicateSpock = document.getElementById('spock-indicator');

    switch(selection) {
        case 'rock':
            indicator(indicateRock);
            break;
        case 'paper':
            indicator(indicatePaper);
            break;
        case 'scissors':
            indicator(indicateScissors);
            break;
        case 'lizard':
            indicator(indicateLizard);
            break;  
        case 'spock':
            indicator(indicateSpock);
            break; 
        default:
            console.log('Error when selecting indicator style.');
    }
}

function checkIndicator(playerSelection, computerSelection) {
    if (playerSelection === 'reset') {
        resetIndicator();
    } else if (playerSelection === computerSelection) {
        activeIndicator(playerSelection, tiedIndicator); 
    } else {
        activeIndicator(computerSelection, computerIndicator);
    } 
}

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `It's a tie! ${tied()}`
    } else if (playerSelection === 'rock' && computerSelection === 'scissors' || computerSelection === 'lizard') {
        addProgress();
        return `Luck be with you! ${capitalize(playerSelection)} crushes ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`;
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        addProgress();
        return `${capitalize(playerSelection)} covers ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`; 
    } else if (playerSelection === 'paper' && computerSelection === 'Spock') {
        addProgress();
        return `${capitalize(playerSelection)} disproves ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`
    } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        addProgress();
        return `You win! ${capitalize(playerSelection)} cuts ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`;    
    } else if (playerSelection === 'scissors' && computerSelection === 'lizard') {
        addProgress();
        return `You win! ${capitalize(playerSelection)} decapitates ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`; 
    } else if (playerSelection === 'lizard' && computerSelection === 'paper') {
        addProgress();
        return `You win! ${capitalize(playerSelection)} eats ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`;
    } else if (playerSelection === 'lizard' && computerSelection === 'spock') {
        addProgress();
        return `You win! ${capitalize(playerSelection)} poisons ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`;
    } else if (playerSelection === 'Spock' && computerSelection === 'scissors') {
        addProgress();
        return `You win! ${capitalize(playerSelection)} smashes ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`;
    } else if (playerSelection === 'Spock' && computerSelection === 'rock') {
        addProgress();
        return `You win! ${capitalize(playerSelection)} vaporizes ${computerSelection}, +${randomProgress.toString()} progress. ${story()}`;
    }  else {
        loseHealth();
        return `Oops! ${capitalize(playerSelection)} is defeated by ${computerSelection}, -1 health. 
        Something hits the side of the ship causing damage. I'll add it to the ever growing to-do list on required fixes, Captain.`;
    }   
}

function story() {
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
            console.log = 'Something went wrong.'
            break;
    }
    return storyText;
}

function tied() {
    let randomSelection = Math.floor(Math.random() * 100);
    if (randomSelection <= 20) {
        health++;
        return tiedText = 'The ship won\'t respond, but the idle time seems to have recovered some health.'; 
    } else if (randomSelection <= 40 && randomSelection > 20) {
        energy++;
        return tiedText = 'Nothing happens, but the moment of relief brings newfound energy to defeat LUCY.';
    } else {
        return tiedText = 'What awful luck.';
    }
}

function changeUI(gradientColor,rootColor) {
    bgGradient.style.setProperty('--lime', gradientColor);
    root.style.setProperty('--blue', rootColor);
}

function updateStats() { 
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

    const healthLabel = healthGroup.querySelector('span');
    const energyLabel = energyGroup.querySelector('span');
    const progressLabel = progressGroup.querySelector('span');
    let healthValue = 10 - health;
    let energyValue = 10 - energy;
    let progressValue = 10 - progress;

    healthLabel.innerHTML = 10 - healthValue.toString();
    energyLabel.innerHTML = 10 - energyValue.toString();
    progressLabel.innerHTML = 10 - progressValue.toString();
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
    const logList = document.querySelector('#log-content');
    const firstLog = logList.querySelector('#first-log');
    logList.querySelectorAll('p').forEach( item => {
        if (item !== firstLog) {
            item.remove()
        }  
    });
}

function toggleHidden(alert) {
    document.getElementById(alert).classList.toggle('hidden');
}

function getScore(scenerio) {
    let endingText = '';
    switch (scenerio) {
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

function updateGameNum() {
    const gameNum = document.getElementById('game-num');
    gameNum.innerText = currentGameNum.toString();
}

function gameState() {
    if (progress >= 10 && health > 0) {
        getScore('won');
    } else if (progress < 10 && energy === 0 || health === 0) {
        getScore('lost');
    } 
}

function roundReset() {
    clearLog();
    changeUI('#00ff2a', '#00F0FF');
    currentGameNum++;
    updateGameNum();
    health = 10;
    energy = 10;
    progress = 0;
    playerScore = 0;
    computerScore = 0;
    roundCounter = 0;
    resetCanvas();
    document.querySelector('#log-content p').classList.add('alert-text');
}

function gameReset() {
    currentGameNum = 0;
    roundCounter = 0;
    roundReset();
    wins = 0;
    losses = 0;
    played = 0;
    points = 0;
    timesPlayed.innerHTML = played.toString();
    timesWon.innerHTML = wins.toString();
    timesLost.innerHTML = losses.toString();
    totalPoints.innerHTML = points.toString();
    checkIndicator('reset', 'reset');
}

function game() {  
    let computerSelection = computerPlay();
    let roundResult = playRound(playerSelection, computerSelection);
    roundCounter++;
    roundResult = roundCounter.toString() + ': ' + roundResult;
    updateLog(roundResult);
    updateStats(); 
    gameState();
    checkIndicator(playerSelection, computerSelection);
}

function startBtn() {
    const startGame = document.querySelector('#start-alert #start');
    startGame.addEventListener('click',() => {
        toggleHidden('start-container');
        draw();
    });
}

function noStartBtn() {

    const noToGame = document.querySelector('#start-alert #no');
    const noToGameText = document.querySelector('#start-alert .main-text');
    const noToGameHeader = document.querySelector('#start-alert h2');
    const noToGameBtn = document.getElementById('start');
    const noToGameQ = document.querySelector('#start-alert .question');

    noToGame.addEventListener('click',() => {
        toggleHidden('no');
        noToGameText.innerHTML = 'You abandon the crew and hop into an escape pod only to prompty fly into the giant maws of a football-sized tardigrade.';
        noToGameHeader.innerHTML = 'Oops,';
        noToGameQ.innerHTML = 'Ready to play?';
        noToGameBtn.innerHTML = 'Uhhhhhh....sure.';
    });
}

function playAgainBtn() {
    const playAgain = document.querySelector('#play-again button');
    playAgain.addEventListener('click',() => {
        updateStats();
        clearLog();
        toggleHidden('play-again-container');
    });
}

function resetBtn() {
    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', () => gameReset());
}

function openRulesBtn() {
    const openRules = document.getElementById('navbar-btn');
    openRules.addEventListener('click', () => {toggleHidden('navbar-rules')});
}

function runGame() {
    choicesArray.forEach((choice) => {
        choice.addEventListener('click', () => {
            playerSelection = choice.id;
            activeIndicator(playerSelection, playerIndicator);
            
            for (i = 0; i < choicesArray.length; i++){
                if (choicesArray[i] != choice) {
                    choicesArray[i].querySelector('.player-choice').classList.remove('show-choice');
                    activeIndicator(choicesArray[i].id, playerIndicator);
                } else {
                    choice.querySelector('.player-choice').classList.add('show-choice');
                }
            } 
            game();
        });
    });
}

function initate() {
    startBtn();
    noStartBtn();
    playAgainBtn();
    resetBtn();
    openRulesBtn();
    runGame();
}

initate();