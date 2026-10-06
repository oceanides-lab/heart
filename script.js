const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function heartPosition(t) {
  const x = 16 * Math.sin(t) ** 3;

  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return { x, y };
}
const particles = [];
const layers = [1, 0.82, 0.64, 0.48, 0.35, 0.25];

for (const scale of layers) {
  let spacing;

  if (scale === 1) {
    spacing = 0.055;
  } else {
    spacing = 0.13;
  }

  for (let t = 0; t < Math.PI * 2; t += spacing) {
    const point = heartPosition(t);

    const targetX = canvas.width / 2 + point.x * 20 * scale;

    const targetY = canvas.height / 2 - point.y * 20 * scale;

    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      targetX: targetX,
      targetY: targetY,

      color: Math.random() > 0.5 ? "#ff2d55" : "#ff6b81",

      opacity: 0.4 + Math.random() * 0.6,
    });
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px monospace";
  ctx.textAlign = "center";

  for (const particle of particles) {
    particle.x += (particle.targetX - particle.x) * 0.007;
    particle.y += (particle.targetY - particle.y) * 0.007;
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 10;

    ctx.fillText("I love you", particle.x, particle.y);
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  requestAnimationFrame(animate);
}
const intro = document.getElementById("intro");
const decryptButton = document.getElementById("decrypt");

function startHeart() {
  intro.style.display = "none";

  canvas.style.opacity = "1";

  animate();
}
const systemText = document.getElementById("systemText");

const systemMessage = "[system] Initializing heart.PROTOCOL_v2.0...";

let index = 0;

function typeSystemText() {
  if (index < systemMessage.length) {
    systemText.textContent += systemMessage[index];

    index++;

    setTimeout(typeSystemText, 50);
  }
}

typeSystemText();
decryptButton.addEventListener("click", startHeart);
