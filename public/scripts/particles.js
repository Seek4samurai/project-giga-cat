const particlesArray = [];

class particle {
  constructor() {
    this.x = bird.x;
    this.y = bird.y - 5;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "hsla(" + hue + ", 100%, 50%, 0.8)";
  }
  update() {
    this.x -= gamespeed;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 20, 30);
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  particlesArray.unshift(new particle());
  for (i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  //if more than 200, remove 20
  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}
