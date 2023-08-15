const startBtn = document.getElementById("start");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedBackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const scoreForm = document.getElementById("score-form");
const timerElement = document.getElementById("time");

let currentQ = 0;
let score = 0;
let timeLeft = 0;
let timerInterval;

startBtn.addEventListener("click", start);
optionsContainer.addEventListener("click", checkAnswer);
scoreForm.addEventListener("submit", saveScore);

const quizQ = [
    {
        question: "Commonly used data types DO Not Include: ",
        options: ["String", "Boolens", "Alerts", "Numbers"],
        answer: 2
    },
    {
        question: "The condition in an if/else statement is enclosed with _______",
        options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        answer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store _______",
        options: ["Numberes and Strings", "Curly Brackets", "Parenthesis", "All the above"],
        answer: 3
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        options: ["JavaScript", "Terminal/Bash", "For Loops", "Console Log"],
        answer: 3
    }
];

function start() {
    startBtn.style.display = "none";
    timeLeft = 60;
    score = 0;
    showQuestion();
    startTimer();
    quiz();
}

function quiz() {
    document.getElementById("quiz").style.display = "block";
}

function showQuestion() {
    const question = quizQ[currentQ];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
        let optionButton = document.createElement("button");
        optionButton.classList.add("option");
        optionButton.textContent = question.options[i];
        optionsContainer.appendChild(optionButton); 
    }
}

function checkAnswer(event) {
  
  if (event.target.classList.contains("option")) {
    const selectedOption = event.target;
    const question = quizQ[currentQ];
    const selectedAnswer = Array.from(optionsContainer.children).indexOf(selectedOption);
    const isCorrect = selectedAnswer === question.answer;

      if (isCorrect) {
        score++;
        alert("Correct!");
        currentQ++;
        if (currentQ < quizQ.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      }
      else {
        timeLeft -= 10;
        alert("Wrong! Haha dumby");
      }
    }
  }


  
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("try-again").style.display = "block";
    scoreElement.textContent = score;
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function saveScore(event) {
    event.preventDefault();
    const initials = initialsInput.value.trim();
  
    if (initials) {
      console.log("Initials:", initials);
      console.log("Score:", score)
      localStorage.setItem("highScores", JSON.stringify({ initials, score }));
    }
  }
  