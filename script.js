const questions = [
    {
        question: "What was the bloodiest battle in history?",
        answers: [
            { text: "Battle of Stalingrad", correct: true, someFact: "Casualties are estimated between 2 to 4.1 million casualties on both sides" },
            { text: "Siege of Leningrad", correct: false },
            { text: "Siege of Baghdad", correct: false },
            { text: "Battle of Berlin", correct: false }
        ],
        correctAnswerIndex: 1
    },
    {
        question: "What was the biggest Tank Battle in history?",
        answers: [
            { text: "Battle of Kursk", correct: true, someFact: "Over 6 thousand tanks were used by both sides" },
            { text: "Battle of 73 Easting", correct: false },
            { text: "Second battle of El Alamein", correct: false },
            { text: "Battle of Bulge", correct: false }
        ],
        correctAnswerIndex: 1
    },
    {
        question: "When Constantinopole fell?",
        answers: [
            { text: "1299", correct: false },
            { text: "1444", correct: false },
            { text: "1453", correct: true, someFact: "Siege continued for 53 days and marked an end to the Byzantine Empire" },
            { text: "1492", correct: false }
        ],
        correctAnswerIndex: 3
    },
    {
        question: "When did Russian Empire leave WWI",
        answers: [
            { text: "1914", correct: false },
            { text: "1915", correct: false },
            { text: "1918", correct: false },
            { text: "1917", correct: true, someFact: "Russian empire gave up fighting because of Soviet Revolution. It let the German Empire focus on western front" }
        ],
        correctAnswerIndex: 4
    },
]

const question = document.getElementById("question")
const answerButtons = document.querySelector(".button-div")
const nextButton = document.querySelector(".next-btn")
const TotalScore = document.getElementById("score")
const CurrentScore = document.querySelector(".CurrentScore")

nextButton.style.display = "none"



let currentQuestionIndex = 0
let score = 0


function StartQuiz() {
    currentQuestionIndex = 0
    score = 0
    CurrentScore.innerHTML = `Current Score ${score}/4`
    TotalScore.style.display = "none"
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

    answerButtons.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("q-btn");
        button.dataset.correct = answer.correct; // Assigning correct answer to each button

        button.addEventListener('click', () => {
            // Display submit button
            const submitBtn = document.createElement("button");
            submitBtn.innerHTML = "Submit";
            submitBtn.classList.add("submit-btn");
            submitBtn.style.display = "block"
            answerButtons.appendChild(submitBtn);

            button.classList.add("clicked");

            // When submit button is clicked, proceed
            submitBtn.addEventListener('click', () => {
                const isCorrect = button.dataset.correct === "true";
                SelectAnswer(button, isCorrect);
            });
        });

        answerButtons.appendChild(button);
    });
}

function SelectAnswer(selectedBtn, isCorrect) {
    // Remove the clicked class
    selectedBtn.classList.remove("clicked");

    if (isCorrect) {
        selectedBtn.classList.add("success");
        score++;
    } else {
        selectedBtn.classList.add("failure");
    }

    // Disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("success");
        }
        button.classList.add("disabled");
        button.disabled = true;
    });

    CurrentScore.innerHTML = `Current Score ${score}/4`;
    nextButton.style.display = "block";
}



function ShowScore() {
    resetState()
    question.innerHTML = ""

    TotalScore.style.display = "block"
    TotalScore.innerHTML = `Your total score is ${score}/4`

    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
    nextButton.classList.add(["w-32", "h-16"])
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    }
    else {
        StartQuiz()
    }
})

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        ShowScore()
    }
}
function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

StartQuiz()