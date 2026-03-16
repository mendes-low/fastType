const wordsWrapper = document.getElementById("words-wrapper");
const input = document.getElementById("hidden-input");
const timerEl = document.getElementById("timer");

const resWpm = document.getElementById("res-wpm");
const resAcc = document.getElementById("res-acc");
const resChars = document.getElementById("res-chars");
const resTime = document.getElementById("res-time");

const restartBtn = document.getElementById("restart-btn");

const wordsList = [
  "home", "nation", "follow", "interest", "develop", "however", "before",
  "work", "real", "man", "few", "use", "mean", "should", "because", "group",
  "after", "system", "number", "world", "point", "place", "again"
];

let currentWord = 0;
let time = 30;
let interval = null;
let started = false;

let correctChars = 0;
let wrongChars = 0;
let typedChars = 0;

function generateWords() {
  wordsWrapper.innerHTML = "";

  wordsList.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    if (index === 0) {
      wordSpan.classList.add("active");
    }

    word.split("").forEach((letter, letterIndex) => {
      const letterSpan = document.createElement("span");
      letterSpan.className = "letter";
      letterSpan.textContent = letter;

      if (index === 0 && letterIndex === 0) {
        letterSpan.classList.add("caret");
      }

      wordSpan.appendChild(letterSpan);
    });

    wordsWrapper.appendChild(wordSpan);
  });
}

function startTimer() {
  interval = setInterval(() => {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
      finishTest();
    }
  }, 1000);
}

function updateCaret() {
  document.querySelectorAll(".caret").forEach((el) => {
    el.classList.remove("caret");
  });

  const words = document.querySelectorAll(".word");
  const current = words[currentWord];
  if (!current) return;

  const letters = current.querySelectorAll(".letter");
  const typedLength = input.value.length;

  if (typedLength < letters.length) {
    letters[typedLength].classList.add("caret");
  } else if (letters.length > 0) {
    letters[letters.length - 1].classList.add("caret");
  }
}

function finishWord(typed, current, words) {
  const cleanTyped = typed.trim();
  const originalWord = wordsList[currentWord];

  typedChars += cleanTyped.length;

  for (let i = 0; i < originalWord.length; i++) {
    if (cleanTyped[i] === originalWord[i]) {
      correctChars++;
    } else {
      wrongChars++;
    }
  }

  if (cleanTyped.length > originalWord.length) {
    wrongChars += cleanTyped.length - originalWord.length;
  }

  current.classList.remove("active");
  input.value = "";
  currentWord++;

  if (words[currentWord]) {
    words[currentWord].classList.add("active");
  }

  updateCaret();
}

input.addEventListener("input", () => {
  if (!started) {
    started = true;
    startTimer();
  }

  const words = document.querySelectorAll(".word");
  const current = words[currentWord];
  if (!current) return;

  const letters = current.querySelectorAll(".letter");
  const typed = input.value;

  letters.forEach((letter) => {
    letter.classList.remove("correct-letter", "wrong-letter");
  });

  typed.split("").forEach((char, index) => {
    if (index >= letters.length) return;

    if (char === letters[index].textContent) {
      letters[index].classList.add("correct-letter");
    } else {
      letters[index].classList.add("wrong-letter");
    }
  });

  updateCaret();

  if (typed.endsWith(" ")) {
    finishWord(typed, current, words);
  }
});

function finishTest() {
  clearInterval(interval);
  input.disabled = true;

  const minutes = 30 / 60;
  const wpm = Math.round((correctChars / 5) / minutes);
  const accuracy =
    typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;

  resWpm.textContent = wpm;
  resAcc.textContent = accuracy + "%";
  resChars.textContent = `${correctChars}/${typedChars}`;
  resTime.textContent = "30s";
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("load", () => {
  generateWords();
  input.focus();
});

document.addEventListener("click", () => {
  input.focus();
});

