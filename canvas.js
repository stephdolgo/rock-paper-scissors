const width = 540;
const height = 600;
const canvases = document.querySelectorAll('canvas');

canvases.forEach(canvas => {
    canvas.width = width;
    canvas.height = height;
});

// Player
const canvasPlayer = document.getElementById('ship');
const ctxPlayer = canvasPlayer.getContext('2d');
// Computer
const canvasComp = document.getElementById('computer');
const ctxComp = canvasComp.getContext('2d');
// Spawn Temporary Elements
const canvasProjectile = document.getElementById('spawn');
const ctxProjectile = canvasProjectile.getContext('2d');
// Bg for Game
const canvasMap = document.getElementById('map');
const ctxMap = canvasMap.getContext('2d');

class Player {
    constructor(ctx, x, y, dx, dy, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 20;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - 30, this.y + 60);
        this.ctx.lineTo(this.x, this.y + 50);
        this.ctx.lineTo(this.x + 30, this.y + 60);
        this.ctx.fill();
    }
    animate() {
        this.draw();
        this.y += this.dy;
    }
}

class Computer {
    constructor(ctx, x, y, degree, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.degree = degree;
        this.color = color;
    }
    draw() {
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fillStyle = '#00F0FF';
        this.ctx.fillRect(this.x, this.y, 40, 40);
    }
    animate() {
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.translate(270, 95);
        this.ctx.rotate(degree * Math.PI / 360);
        this.ctx.translate(-270, -95);
        this.draw();
    }
}

class Projectile {
    constructor(ctx, x, y, radius, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.dy = 5;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    spawn() { 
        this.draw();
        this.y += this.dy;
    }
}

class Particle {
    constructor(ctx, x, y, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = Math.random() - 10.5;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
        this.ctx.fillStyle = 'rgba(' + this.color +', 1)';
        this.ctx.fill();
        this.ctx.closePath();
    }
    update() {
        this.draw();
        this.x += this.velocity;
        this.y += this.velocity;
    }
}

const x = width / 2 ;
const ydefault = 80;
let y = ydefault;
let dx = 5;
let dy = -7;
let degree = 0;
let animateCounter = 0;

let particleArray = [];
let colorArray = [
    '224, 8, 73',   // red
    '0, 240, 255',  // cyan
    '255, 199, 0'   // yellow
];

let radiusProjectile = 5;
let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

const player = new Player(ctxPlayer, x, height - y, dx, dy, '#FFF500');
const comp = new Computer(ctxComp, x - 20, 75, '#00F0FF');
const projectile = new Projectile(ctxProjectile, x , y, radiusProjectile, '#00F0FF');

function movePlayer() {
    ctxPlayer.clearRect(0, 0, width, height);
    player.animate();
    animateCounter++;

    if (animateCounter <= 5) {
        requestAnimationFrame(movePlayer);
    }
}  

function animatePlayer(num) {
    ctxProjectile.clearRect(0, 0, width, height); // removes projectile
    for (i = 0; i <= num; i++) {
        requestAnimationFrame(movePlayer);
        animateCounter = 0;
    }
}

function rotateComp() {
    comp.animate();
    degree += 45; 
    animateCounter++;

    if (animateCounter < 8) {
        requestAnimationFrame(rotateComp);
    }
}

function animateComp() {
    requestAnimationFrame(rotateComp);
    animateCounter = 0;
}

const particle = new Particle(ctxProjectile, player.x, player.y + 10, randomColor);

function spawnParticles() {
    for (let i = 0; i < 15; i++) {
        particleArray.push(new Particle(ctxProjectile, player.x, player.y + 10, randomColor));
    }
}

let update = particle.update();

function animateParticles() {   
    spawnParticles();
  /*  particleArray.forEach(particle => {
        particle.update;
    }); */
    for(let i = 0; i< particleArray.length; i++) {
        particleArray[i].update;
    }
}

animateParticles();

function spawnProjectile() {
    //ctxProjectile.clearRect(0, 0, width, height);
    ctxProjectile.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctxProjectile.fillRect(0, 0, width, height);
    radiusProjectile--;

    if (projectile.y < player.y + 40) {
        requestAnimationFrame(spawnProjectile);
        projectile.spawn();
    } else {
        projectile.y = ydefault;
    }
}

animateParticles();

function animateProjectile() {
    requestAnimationFrame(spawnProjectile);
    spawnParticles();
    animateComp();
}

function grid() {
    ctxMap.lineWidth = 1;
    ctxMap.strokeStyle = '#646464';
    
    for(i = 0; i < 15; i++) {
        let yCoordinate = i * 50;
        ctxMap.moveTo(0, yCoordinate);
        ctxMap.lineTo(canvasMap.clientWidth * 4, yCoordinate);
        ctxMap.stroke();
    }

    for(i = 0; i < 30; i++) {
        let xCoordinate = i * 60;
        ctxMap.moveTo(xCoordinate, 0);
        ctxMap.lineTo(xCoordinate, canvasMap.clientHeight * 2);
        ctxMap.stroke();
    }
}

function draw() {
    grid();
    player.draw();
    comp.draw();
}

draw();