// Get the canvas and its bounds
const canvas = document.getElementById("canvas1");
let canvasLeftBound = canvas.offsetLeft;
let canvasUpperBound = canvas.offsetTop;

const startBtn = document.getElementById("single");
const menuDom = document.getElementById("menu");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let state = false;
let isDead = false;
let spacePresssed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 4;

// Background-----------------------------
const background = new Image();
background.src = "../assets/BG.png";
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  else BG.x1 -= gamespeed;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

// ----------------------------------------------------------

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  handleObstacles();
  if (handleCollisions()) {
    isDead = true;
    state = false;
    renderDeadBtn();
    return;
  }
  bird.update();
  bird.draw();
  ctx.fillStyle = "hsla(" + hue + ", 100%, 50%, 1)";
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleParticles();
  handleCollisions();
  requestAnimationFrame(animate);
  angle += 0.12;
  hue += 10;
  frame++;
}

if (state) {
  animate();
}

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePresssed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePresssed = false;
});

startBtn.addEventListener("click", () => {
  state = true;
  menuDom.parentNode.removeChild(menuDom);
  animate();
});

// Collision Detection----------------------------------------------------
const bang = new Image();
bang.src = "../assets/bang.png";
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
      //Collision Detection
    ) {
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = "25px Georgia";
      ctx.fillStyle = "White";
      ctx.fillText(
        "Game Over, Your Score is " + score,
        160,
        canvas.height / 2 - 10
      );
      return true;
    }
  }
}

// Render Btn and handle click events
function renderDeadBtn() {
  ctx.fillStyle = "#006680";
  ctx.fillRect(240, 200, 120, 40);
  ctx.font = "30px Georgia";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Retry!", canvas.width / 2, canvas.height / 2 + 30);
}

canvas.addEventListener("click", (e) => {
  let x = e.pageX - canvasLeftBound;
  let y = e.pageY - canvasUpperBound;

  if (y > 0 && y < 40 && x > -60 && x < 60) {
    location.reload();
  }
});
