const obstaclesArray = [];

class Obstacle {
  constructor() {
    // To change Vertical Gap between Obstacles
    this.top = (Math.random() * canvas.height) / 3 + 30;
    this.bottom = (Math.random() * canvas.height) / 3 + 30;
    // ------------------------------------------------
    this.x = canvas.width;
    // To change Width of Obstacles
    this.width = 20;
    // ------------------------------------------------
    this.color = "hsla(" + hue + ", 100%, 50%, 1)";
    this.counted = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= gamespeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObstacles() {
  // To change Gap between two consecutive Obstacles
  if (frame % 40 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
