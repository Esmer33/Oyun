const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 200, width: 30, height: 30, speed: 3 };
let candy = { x: 300, y: 200, width: 20, height: 20 };
let score = 0;

// Oyunu çizen fonksiyon
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Oyuncu
  ctx.fillStyle = "#ff6ec7";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Tatlı
  ctx.fillStyle = "#ffcc00";
  ctx.fillRect(candy.x, candy.y, candy.width, candy.height);

  // Skor
  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";
  ctx.fillText("Skor: " + score, 10, 20);
}

// Hareket ve çarpışma kontrolü
function update() {
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;

  // Çarpışma
  if (
    player.x < candy.x + candy.width &&
    player.x + player.width > candy.x &&
    player.y < candy.y + candy.height &&
    player.y + player.height > candy.y
  ) {
    score++;
    candy.x = Math.random() * (canvas.width - candy.width);
    candy.y = Math.random() * (canvas.height - candy.height);
  }
}

// Klavye Kontrolü
let keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Ana döngü
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
