const canvas = document.getElementById('map');
canvas.width = 540;
canvas.height = 600;
let ctx = canvas.getContext('2d');
console.log(ctx);
ctx.lineWidth = 1;

function grid() {
    //Horizontal Lines
    for(i = 0; i < 15; i++) {
        let yCoordinate = i * 50;
        ctx.strokeStyle = '#646464';
        ctx.moveTo(0, yCoordinate);
        ctx.lineTo(canvas.clientWidth * 4, yCoordinate);
        ctx.stroke();
    }
    //Vertical Lines
    for(i = 0; i < 30; i++) {
        let xCoordinate = i * 60;
        ctx.moveTo(xCoordinate, 0);
        ctx.lineTo(xCoordinate, canvas.clientHeight * 2);
        ctx.stroke();
    }
}

function computer() {

}

function ship() {
    ctx.fillStyle = '#FFF500';
    ctx.beginPath();
    ctx.moveTo(75, 35);
    ctx.lineTo(55, 100);
    ctx.lineTo(75, 90);
    ctx.lineTo(100, 100);
    ctx.fill();
}

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 0;
let dy = -10;

function bullet() {
    ctx.fillStyle = '#FFF500';
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bullet();
    grid();
    ship();
    x += dx;
    y += dy;
}

setInterval(draw, 20);