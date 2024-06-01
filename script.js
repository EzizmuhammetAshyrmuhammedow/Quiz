const questions = [
  {
    question: "What was the bloodiest battle in history?",
    answers: [
      {
        text: "Battle of Stalingrad",
        correct: true,
        someFact:
          "In Stalingrad, Casualties are estimated between 2 to 4.1 million casualties on both sides",
      },
      {
        text: "Siege of Leningrad",
        correct: false,
        someFact:
          "In Stalingrad, Casualties are estimated between 2 to 4.1 million casualties on both sides",
      },
      {
        text: "Siege of Baghdad",
        correct: false,
        someFact:
          "In Stalingrad, Casualties are estimated between 2 to 4.1 million casualties on both sides",
      },
      {
        text: "Battle of Berlin",
        correct: false,
        someFact:
          "In Stalingrad, Casualties are estimated between 2 to 4.1 million casualties on both sides",
      },
    ],
  },
  {
    question: "What was the biggest Tank Battle in history?",
    answers: [
      {
        text: "Battle of Kursk",
        correct: true,
        someFact:
          "Over 6 thousand tanks were used by both sides in Battle of Kursk",
      },
      {
        text: "Battle of 73 Easting",
        correct: false,
        someFact:
          "Over 6 thousand tanks were used by both sides in Battle of Kursk",
      },
      {
        text: "Second battle of El Alamein",
        correct: false,
        someFact:
          "Over 6 thousand tanks were used by both sides in Battle of Kursk",
      },
      {
        text: "Battle of Bulge",
        correct: false,
        someFact:
          "Over 6 thousand tanks were used by both sides in Battle of Kursk",
      },
    ],
  },
  {
    question: "When Constantinopole fell?",
    answers: [
      {
        text: "1299",
        correct: false,
        someFact:
          "Siege continued for 53 days and marked an end to the Byzantine Empire in 1453",
      },
      {
        text: "1444",
        correct: false,
        someFact:
          "Siege continued for 53 days and marked an end to the Byzantine Empire in 1453",
      },
      {
        text: "1453",
        correct: true,
        someFact:
          "Siege continued for 53 days and marked an end to the Byzantine Empire in 1453",
      },
      {
        text: "1492",
        correct: false,
        someFact:
          "Siege continued for 53 days and marked an end to the Byzantine Empire in 1453",
      },
    ],
  },
  {
    question: "When did Russian Empire leave WWI",
    answers: [
      {
        text: "1914",
        correct: false,
        someFact:
          "Russian empire gave up fighting WW1 in 1917 because of Soviet Revolution. It let the German Empire focus on western front",
      },
      {
        text: "1915",
        correct: false,
        someFact:
          "Russian empire gave up fighting WW1 in 1917 because of Soviet Revolution. It let the German Empire focus on western front",
      },
      {
        text: "1918",
        correct: false,
        someFact:
          "Russian empire gave up fighting WW1 in 1917 because of Soviet Revolution. It let the German Empire focus on western front",
      },
      {
        text: "1917",
        correct: true,
        someFact:
          "Russian empire gave up fighting WW1 in 1917 because of Soviet Revolution. It let the German Empire focus on western front",
      },
    ],
  },
  {
    question: "When did French Revolution began",
    answers: [
      {
        text: "1789",
        correct: true,
        someFact: "The French Revolution was started in 1789 and ended in 1799",
      },
      {
        text: "1799",
        correct: false,
        someFact: "The French Revolution was started in 1789 and ended in 1799",
      },
      {
        text: "1800",
        correct: false,
        someFact: "The French Revolution was started in 1789 and ended in 1799",
      },
      {
        text: "1792",
        correct: false,
        someFact: "The French Revolution was started in 1789 and ended in 1799",
      },
    ],
  },
  {
    question: "What was the most produced Tank",
    answers: [
      {
        text: "Panzer IV",
        correct: false,
        someFact:
          "Soviet T-54/T-55 were the most produced tanks in history. 100-120k of them were produced during the Cold War.",
      },
      {
        text: "Soviet T-34",
        correct: false,
        someFact:
          "Soviet T-54/T-55 were the most produced tanks in history. 100-120k of them were produced during the Cold War.",
      },
      {
        text: "M4 Sherman",
        correct: false,
        someFact:
          "Soviet T-54/T-55 were the most produced tanks in history. 100-120k of them were produced during the Cold War.",
      },
      {
        text: "Soviet t-54/t-55",
        correct: true,
        someFact:
          "Soviet T-54/T-55 were the most produced tanks in history. 100-120k of them were produced during the Cold War.",
      },
    ],
  },
];

const question = document.getElementById("question");
const answerButtons = document.querySelector(".button-div");
const nextButton = document.querySelector(".next-btn");
const TotalScore = document.getElementById("score");
const CurrentScore = document.querySelector(".CurrentScore");
const facts = document.querySelector(".facts");

nextButton.style.display = "none";
facts.style.display = "none";

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  CurrentScore.innerHTML = `Current Score ${score}/${questions.length}`;
  TotalScore.style.display = "none";
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  window.currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = questionNo + ". " + currentQuestion.question;

  answerButtons.innerHTML = "";
  facts.innerHTML = "";

  let submitBtnCreated = false; // Flag to track if submit button is already created
  let selectedAnswer = null; // Track the selected answer

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("q-btn");
    button.dataset.correct = answer.correct; // Assigning correct answer to each button

    button.addEventListener("click", () => {
      Array.from(answerButtons.children).forEach((btn) => {
        btn.classList.remove("clicked");
      });

      button.classList.add("clicked");
      selectedAnswer = answer; // Track the selected answer

      // Only create submit button if not already created
      if (!submitBtnCreated) {
        const submitBtn = document.createElement("button");
        submitBtn.innerHTML = "Submit";
        submitBtn.classList.add("submit-btn");
        submitBtn.style.display = "block";
        answerButtons.appendChild(submitBtn);

        submitBtn.addEventListener("click", () => {
          facts.style.display = "block";
          facts.innerHTML = selectedAnswer.someFact; // Show the fact for the selected answer
          submitBtn.style.display = "none";
          const isCorrect = selectedAnswer.correct;
          SelectAnswer(selectedAnswer, isCorrect);

          // Remove clicked class from all buttons
          Array.from(answerButtons.children).forEach((button) => {
            button.classList.remove("clicked");
          });

          // Disable all buttons after submitting
          Array.from(answerButtons.children).forEach((button) => {
            button.disabled = true;
          });
        });

        submitBtnCreated = true; // Set flag to true after creating submit button
      }
    });

    answerButtons.appendChild(button);
  });
}

function SelectAnswer(selectedAnswer, isCorrect) {
  // Get the corresponding button for the selected answer
  const selectedBtn = Array.from(answerButtons.children).find(
    (button) => button.innerHTML === selectedAnswer.text
  );

  if (isCorrect) {
    selectedBtn.classList.add("success");
    score++;
  } else {
    selectedBtn.classList.add("failure");
  }

  // Disable all buttons and highlight correct answer
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("success");
    }
    button.classList.add("disabled");
    button.disabled = true;
  });

  CurrentScore.innerHTML = `Current Score ${score}/${questions.length}`;
  nextButton.style.display = "block";
}

function ShowScore() {
  resetState();
  question.innerHTML = "";

  TotalScore.style.display = "block";
  TotalScore.innerHTML = `Your total score is ${score}/${questions.length}`;

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.classList.add(["w-32", "h-16"]);
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    StartQuiz();
  }
});

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    ShowScore();
  }
}
function resetState() {
  nextButton.style.display = "none";
  facts.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

StartQuiz();
