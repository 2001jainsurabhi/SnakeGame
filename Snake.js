'use strict';

// Function to start the game
function startGame() {
  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");

  var gridSize = 20;
  var tileCount = 20;
  var snake = [{ x: 10, y: 10 }];
  var apple = { x: 15, y: 15 };
  var xVelocity = 0;
  var yVelocity = 0;
  var score = 0;

  function update() {
    snake[0].x += xVelocity;
    snake[0].y += yVelocity;

    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
      endGame();
      return;
    }

    for (var i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        endGame();
        return;
      }
    }

    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      score++;
      apple = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
      snake.push({});
    }

    for (var i = snake.length - 1; i >= 1; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }

    draw();
    setTimeout(update, 100);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = "green";
    for (var i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
  }

  function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2 - 15);
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp" && yVelocity !== 1) {
      xVelocity = 0;
      yVelocity = -1;
    } else if (e.key === "ArrowDown" && yVelocity !== -1) {
      xVelocity = 0;
      yVelocity = 1;
    } else if (e.key === "ArrowLeft" && xVelocity !== 1) {
      xVelocity = -1;
      yVelocity = 0;
    } else if (e.key === "ArrowRight" && xVelocity !== -1) {
      xVelocity = 1;
      yVelocity = 0;
    }
  });

  update(); // Start the game loop
}

startGame(); // Call the function to start the game