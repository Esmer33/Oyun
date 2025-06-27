// HTML'deki elementleri seç
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Oyuncu ve tatlı nesneleri
let player = { x: 50, y: 400, width: 30, height: 30, speed: 4 };
let candy = { x: 200, y: 100, width: 20, height: 20 };
let keys = {};
let score = 0;

// Oyun başladığında görünümü ayarla ve oyun döngüsünü başlat
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameLoop();
});

// Klavye kontrolü (masaüstü için)
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Oyunun güncelleme fonksiyonu
function update() {
  // Oyuncu hareketi
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;

  // Kenar sınırları
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

  // Tatlıyla çarpışma
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

// Oyunu ekrana çiz
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Oyuncu
  ctx.fillStyle = "#ff69b4";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Tatlı
  ctx.fillStyle = "#ffa500";
  ctx.fillRect(candy.x, candy.y, candy.width, candy.height);

  // Skor
  ctx.fillStyle = "#333";
  ctx.font = "20px Arial";
  ctx.fillText("Skor: " + score, 10, 30);
}

// Ana oyun döngüsü
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
