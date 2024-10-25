let blockSize = 25;
let total_row = 15;
let total_col = 10;
let speed;
let board;
let context;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;
let score = 0;




function setGridSize() {
    if (window.innerWidth <= 600) {
        total_row = 15;
        total_col = 10;
        speed = 150;
    } else {
        total_row = 15;
        total_col = 20;
        speed = 100;
    }
}
window.onload = function() {
    setGridSize();
    board = document.getElementById('board');
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext('2d');
    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.getElementById('up').addEventListener('click', () => changeDirection({ code: 'ArrowUp' }));
    document.getElementById('down').addEventListener('click', () => changeDirection({ code: 'ArrowDown' }));
    document.getElementById('left').addEventListener('click', () => changeDirection({ code: 'ArrowLeft' }));
    document.getElementById('right').addEventListener('click', () => changeDirection({ code: 'ArrowRight' }));
    setInterval(update, speed);
}
window.onresize = function() {
    setGridSize();
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
}
function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = 'green';
    context.fillRect(0, 0, board.width, board.height);
    drawGrid();
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 10;
        updateScoreDisplay();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle = 'yellow';
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
        gameOver = true;
        updateScoreDisplay();
        updateAlertDisplay("Game Over!");
        startResetTimer();
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            updateScoreDisplay();
            updateAlertDisplay("Game Over!");
            startResetTimer();
        }
    }
}







function changeDirection(e) {
    if (e.code === 'ArrowUp' && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code === 'ArrowDown' && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code === 'ArrowLeft' && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code === 'ArrowRight' && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function drawGrid() {
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    for (let i = 0; i <= total_row; i++) {
        context.beginPath();
        context.moveTo(0, i * blockSize);
        context.lineTo(board.width, i * blockSize);
        context.stroke();
    }

    for (let i = 0; i <= total_col; i++) {
        context.beginPath();
        context.moveTo(i * blockSize, 0);
        context.lineTo(i * blockSize, board.height);
        context.stroke();
    }
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    if (scoreDisplay) {
        scoreDisplay.textContent = "Score: " + score;
    }
}







function updateAlertDisplay(message) {
    const alertDisplay = document.getElementById('alert');
    if (alertDisplay) {
        alertDisplay.textContent = message;
    }
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    foodX = undefined;
    foodY = undefined;
    gameOver = false;
    score = 0;
    placeFood();
    updateScoreDisplay();
    updateAlertDisplay("New Game Started!");
}

let resetTimer;

function startResetTimer() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetGame, 5000);
}
