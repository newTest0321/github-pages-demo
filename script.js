document.addEventListener("DOMContentLoaded", function () {
  const WORDS = ["apple", "grape", "melon", "peach", "mango", "lemon"];
  const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)];
  const board = document.getElementById("game-board");
  const keyboard = document.getElementById("keyboard");
  const message = document.getElementById("message");
  let currentRow = 0;
  let currentCol = 0;
  let guesses = Array.from({ length: 6 }, () => Array(5).fill(""));

  function buildBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      for (let j = 0; j < 5; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = guesses[i][j];
        rowDiv.appendChild(tile);
      }
      board.appendChild(rowDiv);
    }
  }

  function buildKeyboard() {
    keyboard.innerHTML = "";
    const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    keys.push("Enter", "Back");
    keys.forEach((key) => {
      const btn = document.createElement("button");
      btn.textContent = key;
      btn.className = "key";
      btn.addEventListener("click", () => handleKey(key));
      keyboard.appendChild(btn);
    });
  }

  function handleKey(key) {
    if (currentRow >= 6) return;
    if (key === "Back") {
      if (currentCol > 0) {
        currentCol -= 1;
        guesses[currentRow][currentCol] = "";
        buildBoard();
      }
    } else if (key === "Enter") {
      if (currentCol === 5) {
        checkGuess();
      }
    } else if (/^[A-Z]$/.test(key)) {
      if (currentCol < 5) {
        guesses[currentRow][currentCol] = key.toLowerCase();
        currentCol += 1;
        buildBoard();
      }
    }
  }

  function checkGuess() {
    const guess = guesses[currentRow].join("");
    if (!WORDS.includes(guess)) {
      message.textContent = "Not a valid word!";
      return;
    }
    colorTiles(guess);
    if (guess === ANSWER) {
      message.textContent = "Congratulations, you won!";
      currentRow = 6;
      return;
    }
    currentRow += 1;
    currentCol = 0;
    if (currentRow >= 6) {
      message.textContent = `Game Over! The answer was "${ANSWER}"`;
    }
  }

  function colorTiles(guess) {
    const rowDiv = board.children[currentRow];
    for (let i = 0; i < 5; i++) {
      const tile = rowDiv.children[i];
      if (guess[i] === ANSWER[i]) {
        tile.classList.add("correct");
      } else if (ANSWER.includes(guess[i])) {
        tile.classList.add("present");
      } else {
        tile.classList.add("absent");
      }
    }
  }

  buildBoard();
  buildKeyboard();

  window.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") handleKey("Back");
    else if (e.key === "Enter") handleKey("Enter");
    else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
  });
});
