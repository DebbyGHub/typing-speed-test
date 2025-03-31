let timerInterval;
let startTime;
let isTypingStarted = false;

const inputTextElement = document.getElementById("inputText");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy"); // New accuracy element
const textElement = document.getElementById("text");
const quoteText = document.getElementById("quote");

const testText = "type this to know your typing speed in wpm";

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    timerElement.textContent = timeElapsed;
    calculateWPM(timeElapsed);
  }, 1000);
}

function calculateWPM(timeElapsed) {
  const typedText = inputTextElement.value.trim();
  const wordsTyped = typedText.split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timeElapsed) * 60) || 0;
  wpmElement.textContent = wpm;
}

function calculateAccuracy() {
  const typedText = inputTextElement.value;
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === testText[i]) {
      correctChars++;
    }
  }
  const accuracy = ((correctChars / testText.length) * 100).toFixed(2);
  accuracyElement.textContent = accuracy + "%";
}

function resetTest() {
  clearInterval(timerInterval);
  timerElement.textContent = "0";
  wpmElement.textContent = "0";
  accuracyElement.textContent = "100%";
  inputTextElement.value = "";
  isTypingStarted = false;
  textElement.textContent = testText;
  inputTextElement.focus();
  quoteText.style.display = "block";
}

inputTextElement.addEventListener("input", () => {
  if (!isTypingStarted) {
    isTypingStarted = true;
    startTimer();
  }
  calculateAccuracy();

  const typedText = inputTextElement.value.trim();
  if (typedText === testText) {
    alert("Congratulations! You finished typing the text.");
    resetTest();
  }
});
