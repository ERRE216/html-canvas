const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circlePosX = 200;
let circlePosY = 200;
let circleRadius = 20;

let rectPosX = 350;
let rectPosY = 300;
let rectWidth = 50;
let rectHeight = 50;

let hitPointX = rectPosX;
let hitPointY = rectPosY;

document.addEventListener(
  'mousemove',
  (e) => {
    getMousePos(canvas, e);
  },
  false,
);

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();

  circlePosX = evt.clientX - rect.left / rect.right - rect.left * canvas.width;
  circlePosY = evt.clientY - rect.top / rect.bottom - rect.top * canvas.height;
}

function checkCollsions() {
  if (circlePosX < rectPosX) hitPointX = rectPosX;
  if (circlePosX > rectPosX + rectWidth) hitPointX = rectPosX + rectWidth;
  if (circlePosX > rectPosX && circlePosX < rectPosX + rectWidth)
    hitPointX = circlePosX;

  if (circlePosY < rectPosY) hitPointY = rectPosY;
  if (circlePosY > rectPosY + rectHeight) hitPointY = rectPosY + rectHeight;
  if (circlePosY > rectPosY && circlePosY < rectPosY + rectHeight)
    hitPointY = circlePosY;

  let distance = Math.sqrt(
    Math.pow(circlePosX - hitPointX, 2) + Math.pow(circlePosY - hitPointY, 2),
  );

  if (distance < circleRadius) console.log('Collision:', true);
}

function loop() {
  checkCollsions();

  requestAnimationFrame(() => {
    // console.log('X:', hitPointX, 'Y:', hitPointY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(rectPosX, rectPosY, rectWidth, rectHeight);
    ctx.fillStyle = 'rgb(250, 0, 0)';
    ctx.beginPath();
    ctx.arc(circlePosX, circlePosY, circleRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgb(0, 250, 0)';
    ctx.beginPath();
    ctx.arc(hitPointX, hitPointY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgb(0, 250, 250)';
    ctx.beginPath();
    ctx.moveTo(circlePosX, circlePosY);
    ctx.lineTo(hitPointX, hitPointY);
    ctx.stroke();

    loop();
  });
}
loop();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      circlePosY--;
      break;
    case 'a':
    case 'ArrowLeft':
      circlePosX--;
      break;
    case 'd':
    case 'ArrowRight':
      circlePosX++;
      break;
    case 's':
    case 'ArrowDown':
      circlePosY++;
      break;
    default:
      break;
  }
});
