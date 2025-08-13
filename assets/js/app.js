// Lấy phần tử DOM
const paper = document.getElementById("paper");
const stone = document.getElementById("stone");
const scissors = document.getElementById("scissors");

const userScoreEl = document.getElementById("score-user");
const drawScoreEl = document.getElementById("score-draws");
const computerScoreEl = document.getElementById("score-computer");

const userPlayer = document.getElementById("playerChoice");
const computerPlayer = document.getElementById("computerChoice");

const resetBtn = document.getElementById("reset-btn");
const resultTextEl = document.getElementById("resultText");

// Biến điểm
let userScoreCount = 0;
let computerScoreCount = 0;
let drawsCount = 0;

// Các lựa chọn và icon
const choices = {
  stone: "🗿",
  paper: "📄",
  scissors: "✂️",
};

// ======= LOAD ĐIỂM TỪ localStorage KHI VÀO TRANG =======
function loadScores() {
  const savedScores = JSON.parse(localStorage.getItem("rpsScores"));
  if (savedScores) {
    userScoreCount = savedScores.user;
    computerScoreCount = savedScores.computer;
    drawsCount = savedScores.draws;
    updateScoreboard();
  }
}

// Lưu điểm vào localStorage
function saveScores() {
  const scores = {
    user: userScoreCount,
    computer: computerScoreCount,
    draws: drawsCount,
  };
  localStorage.setItem("rpsScores", JSON.stringify(scores));
  console.log("Scores saved:", scores);
}

// Cập nhật bảng điểm
function updateScoreboard() {
  userScoreEl.textContent = userScoreCount;
  drawScoreEl.textContent = drawsCount;
  computerScoreEl.textContent = computerScoreCount;
}

// Máy chọn random
const computerPlay = () => {
  const keys = Object.keys(choices);
  return keys[Math.floor(Math.random() * keys.length)];
};

// Chơi game
function playGame(playerChoice) {
  // Hiển thị lựa chọn người chơi
  userPlayer.innerHTML = choices[playerChoice];

  // Máy chọn
  const computerChoice = computerPlay();
  computerPlayer.innerHTML = choices[computerChoice];

  // So sánh kết quả
  if (computerChoice === playerChoice) {
    drawsCount++;
    resultTextEl.textContent = "It's a Draw!";
  } else if (
    (computerChoice === "stone" && playerChoice === "scissors") ||
    (computerChoice === "paper" && playerChoice === "stone") ||
    (computerChoice === "scissors" && playerChoice === "paper")
  ) {
    computerScoreCount++;
    resultTextEl.textContent = "You Lose! 😢";
  } else {
    userScoreCount++;
    resultTextEl.textContent = "You Win! 🎉";
  }

  updateScoreboard();
  saveScores(); // Lưu điểm sau mỗi lượt
}

// Lắng nghe click
paper.addEventListener("click", () => playGame("paper"));
stone.addEventListener("click", () => playGame("stone"));
scissors.addEventListener("click", () => playGame("scissors"));

// Nút reset (đưa điểm về 0 nhưng vẫn lưu vào localStorage)
resetBtn.addEventListener("click", () => {
  userScoreCount = 0;
  computerScoreCount = 0;
  drawsCount = 0;
  updateScoreboard();
  saveScores();
  userPlayer.innerHTML = `<i class="fas fa-question text-white"></i>`;
  computerPlayer.innerHTML = `<i class="fas fa-question text-white"></i>`;
  resultTextEl.textContent = "Make your choice!";
});

// Khi load trang -> tải điểm cũ
loadScores();
