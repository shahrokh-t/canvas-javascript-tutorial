const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

////////////////////////////////// Basics
//// - fillRect() - strokeRect() - clearRect()

// fillRect()
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 150, 100);
ctx.fillStyle = "blue";
ctx.fillRect(200, 20, 150, 100);

// strokeRect()
ctx.lineWidth = 5;
ctx.strokeStyle = "green";
ctx.strokeRect(100, 400, 150, 100);

// clearRect()
ctx.clearRect(21, 21, 148, 98);


//// - fillText() - strokeText()

// fillText()
ctx.fillStyle = "purple";
ctx.font = "30px Arial";
ctx.fillText("Hello World!", 400, 50);

// strokeText()
ctx.lineWidth = 1;
ctx.strokeStyle = "orange";
ctx.strokeText("Hello World", 400, 100)


//// - path

// Triangle
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(150, 200);
ctx.lineTo(100, 350)
ctx.lineTo(50, 200)
// ctx.closePath();
// ctx.stroke();
ctx.fillStyle = "coral"
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(150, 350);
ctx.lineTo(250, 350);
ctx.closePath();
ctx.stroke();

// Rectangle
ctx.beginPath();
ctx.rect(300, 200, 150, 100);
ctx.fillStyle = "teal"
ctx.fill();

// Arc (Circles)
ctx.beginPath();
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Draw head
ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

// Move to mouth
ctx.moveTo(centerX + 100, centerY);

// Draw mouth
ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

// Move to left eye
ctx.moveTo(centerX - 60, centerY - 80);

// Draw left eye
ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);

// Move to right eye
ctx.moveTo(centerX + 100, centerY - 80)

// Draw right eye
ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2)

ctx.stroke();


////////////////////////////////// Animation 1 - Bouncing Ball 
const circle = {
    x: 200,
    y: 200,
    size: 30,
    dx: 5,
    dy: 4
};


function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = "purple";
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCircle();

    // Change position
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Detect side walls
    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx *= -1;
    }

    // Detect top and bottom walls
    if (circle.y + circle.size > 600 || circle.y - circle.size < 0) {
        circle.dy *= -1;
    }

    requestAnimationFrame(animate);
}

// Uncomment animate() to see that animation!
// animate();


////////////////////////////////// Animation 2 - Moving Character
const image = document.getElementById("source");

const player = {
    width: 50,
    height: 70,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0,
};

function drawPlayer() {
    ctx.drawImage(image, player.x, player.y, player.width, player.height);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPosition() {
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls() {
    // Left wall
    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y < 0) {
        player.y = 0;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function update() {
    clear();

    drawPlayer();

    newPosition();

    requestAnimationFrame(update);
}

function moveUp() {
    player.dy = -player.speed;
}
function moveRight() {
    player.dx = player.speed;
}
function moveDown() {
    player.dy = player.speed;
}
function moveLeft() {
    player.dx = -player.speed;
}

function keyDown(e) {
    if (e.key === "ArrowRight" || e.key === "Right") {
        moveRight();
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
        moveLeft();
    } else if (e.key === "ArrowUp" || e.key === "Up") {
        moveUp();
    } else if (e.key === "ArrowDown" || e.key === "Down") {
        moveDown();
    }
}

function keyUp(e) {
    if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft" ||
        e.key === "Up" ||
        e.key === "ArrowUp" ||
        e.key === "Down" ||
        e.key === "ArrowDown"

    ) {
        player.dx = 0;
        player.dy = 0;
    }
}


// Uncomment update() to see that animation!
// update();

document.addEventListener("keyup", keyUp);
document.addEventListener("keydown", keyDown);



















