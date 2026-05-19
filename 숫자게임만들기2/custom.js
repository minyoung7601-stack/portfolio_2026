// 게임 상태 변수
let targetNumber;
let remainingChances = 5;
let attempts = 0;
let timerInterval;
let startTime;
let bestScore = localStorage.getItem("bestScore") || "-";
let isGameActive = false;

// DOM 요소
const userInput = document.getElementById("user-input");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const calcBtn = document.getElementById("calc-btn");
const chanceDisplay = document.getElementById("chance-display");
const heartsContainer = document.getElementById("hearts");
const timerDisplay = document.getElementById("timer");
const bestScoreDisplay = document.getElementById("best-score");
const messageDisplay = document.getElementById("message-display");
const gameoverModal = document.getElementById("gameover-modal");
const bingoModal = document.getElementById("bingo-modal");
const answerReveal = document.getElementById("answer-reveal");
const attemptsCount = document.getElementById("attempts-count");
const timeTaken = document.getElementById("time-taken");
const modalRestart = document.getElementById("modal-restart");
const bingoRestart = document.getElementById("bingo-restart");

// 카드 요소
const upCard = document.getElementById("up-card");
const downCard = document.getElementById("down-card");
const bingoCard = document.getElementById("bingo-card");

// 초기화
function initGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  remainingChances = 5;
  attempts = 0;
  isGameActive = true;

  // UI 초기화
  chanceDisplay.textContent = "5 / 5";
  updateHearts(5);
  resetCards();

  // 타이머 시작
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  timerDisplay.textContent = "0초";

  // 최고 점수 표시
  bestScoreDisplay.textContent = bestScore + (bestScore !== "-" ? "회" : "");

  // 입력 초기화
  userInput.value = "";
  userInput.disabled = false;
  userInput.focus();

  console.log("게임 시작! 정답:", targetNumber); // 디버깅용
}

// 타이머 업데이트
function updateTimer() {
  if (!isGameActive) return;
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = elapsed + "초";
}

// 하트 업데이트
function updateHearts(count) {
  const hearts = heartsContainer.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    if (index < count) {
      heart.classList.remove("lost");
      heart.textContent = "❤️";
    } else {
      heart.classList.add("lost");
      heart.textContent = "🤍";
    }
  });
}

// 카드 초기화
function resetCards() {
  upCard.classList.remove("active");
  downCard.classList.remove("active");
  bingoCard.classList.remove("active");
}

// 카드 활성화
function activateCard(cardType) {
  resetCards();

  switch (cardType) {
    case "up":
      upCard.classList.add("active");
      break;
    case "down":
      downCard.classList.add("active");
      break;
    case "bingo":
      bingoCard.classList.add("active");
      break;
  }
}

// 메시지 표시
function showMessage(text, type = "normal") {
  // 기존 메시지 제거
  const existingMessage = messageDisplay.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  messageDisplay.appendChild(message);

  // 2초 후 메시지 제거
  setTimeout(() => {
    if (message.parentNode) {
      message.remove();
    }
  }, 2000);
}

// 게임 플레이
function play() {
  if (!isGameActive) return;

  const inputValue = userInput.value.trim();

  // 입력 검증
  if (inputValue === "") {
    showMessage("숫자를 입력하세요!", "error");
    userInput.focus();
    return;
  }

  const userNumber = parseInt(inputValue);

  // 숫자가 아닌 경우
  if (isNaN(userNumber)) {
    showMessage("숫자가 아닙니다!", "error");
    userInput.value = "";
    userInput.focus();
    return;
  }

  // 범위 검증
  if (userNumber < 1 || userNumber > 100) {
    showMessage("1부터 100까지의 숫자를 입력하세요!", "error");
    userInput.value = "";
    userInput.focus();
    return;
  }

  attempts++;
  remainingChances--;

  // UI 업데이트
  chanceDisplay.textContent = `${remainingChances} / 5`;
  updateHearts(remainingChances);

  // 비교
  if (userNumber === targetNumber) {
    // BINGO!
    handleBingo();
  } else if (userNumber < targetNumber) {
    // UP!
    activateCard("up");
    showMessage("UP! 더 큰 숫자입니다 📈");
    userInput.value = "";
    userInput.focus();
  } else {
    // DOWN!
    activateCard("down");
    showMessage("DOWN! 더 작은 숫자입니다 📉");
    userInput.value = "";
    userInput.focus();
  }

  // 기회 소진
  if (remainingChances === 0 && userNumber !== targetNumber) {
    handleGameOver();
  }
}

// BINGO 처리
function handleBingo() {
  isGameActive = false;
  clearInterval(timerInterval);

  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  activateCard("bingo");
  showMessage("🎉 BINGO! 정답입니다!", "success");

  // 최고 점수 업데이트
  if (bestScore === "-" || attempts < parseInt(bestScore)) {
    bestScore = attempts;
    localStorage.setItem("bestScore", bestScore);
  }

  // 모달 표시 (약간의 지연)
  setTimeout(() => {
    attemptsCount.textContent = attempts;
    timeTaken.textContent = elapsed;
    bingoModal.classList.add("show");
  }, 500);

  userInput.disabled = true;
}

// GAME OVER 처리
function handleGameOver() {
  isGameActive = false;
  clearInterval(timerInterval);

  showMessage("💀 GAME OVER!", "error");

  setTimeout(() => {
    answerReveal.textContent = targetNumber;
    gameoverModal.classList.add("show");
  }, 500);

  userInput.disabled = true;
}

// 게임 리셋
function resetGame() {
  gameoverModal.classList.remove("show");
  bingoModal.classList.remove("show");
  initGame();
}

// 랜덤 숫자 추천
function suggestNumber() {
  if (!isGameActive) return;
  const suggestion = Math.floor(Math.random() * 100) + 1;
  userInput.value = suggestion;
  showMessage(`🎲 ${suggestion}을(를) 추천합니다!`);
}

// 이벤트 리스너
playBtn.addEventListener("click", play);

resetBtn.addEventListener("click", () => {
  if (confirm("정말 다시 시작하시겠습니까?")) {
    resetGame();
  }
});

calcBtn.addEventListener("click", suggestNumber);

modalRestart.addEventListener("click", resetGame);
bingoRestart.addEventListener("click", resetGame);

// 엔터키 처리
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    play();
  }
});

// 포커스 시 입력값 선택
userInput.addEventListener("focus", () => {
  userInput.select();
});

// 페이지 로드 시 게임 초기화
document.addEventListener("DOMContentLoaded", initGame);
