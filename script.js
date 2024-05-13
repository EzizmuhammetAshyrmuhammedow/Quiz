const questions = [
    {
        question: "What was the bloodiest battle in history?",
        answers: [
            { text: "Battle of Stalingrad", correct: false },
            { text: "Siege of Leningrad", correct: true },
            { text: "Siege of Baghdad", correct: false },
            { text: "Battle of Berlin", correct: false }
        ]
    },
    {
        question: "What was the biggest Tank Battle in history?",
        answers: [
            { text: "Battle of Kursk", correct: true },
            { text: "Battle of 73 Easting", correct: false },
            { text: "Second battle of El Alamein", correct: false },
            { text: "Battle of Bulge", correct: false }
        ]
    },
    {
        question: "When Constantinopole fell?",
        answers: [
            { text: "1299", correct: false },
            { text: "1444", correct: false },
            { text: "1453", correct: true },
            { text: "1492", correct: false }
        ]
    },
    {
        question: "When did Russian Empire leave WWI",
        answers: [
            { text: "1914", correct: false },
            { text: "1915", correct: false },
            { text: "1918", correct: false },
            { text: "1917", correct: true }
        ]
    },
]

const question = document.getElementById("question")
const answerButton = document.querySelector(".button-div")
const nextButton = document.querySelector(".next-btn")
const TotalScore = document.getElementById("score")
TotalScore.style.display = "none"

let currentQuestionIndex = 0
let score = 0

function StartQuiz() {
    score = 0
    nextButton.innerHTML = "Next"
    nextButton.addEventListener("click", NextQuestion);
    showQuestion()
}
function showQuestion() {

    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    question.innerHTML = questionNo + ". " + currentQuestion.question

    answerButton.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("q-btn")

        answerButton.appendChild(button)


        button.addEventListener('click', () => {
            if (answer.correct === true) {
                button.classList.add("success");
                score++
            } else {
                button.classList.add("failure");
            }
            disableAllButtons()
        })
    })
}

function disableAllButtons() {
    const buttons = answerButton.querySelectorAll(".q-btn");
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}

function NextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
        QuizEnd()
    }
    else {
        currentQuestionIndex++;
        showQuestion();
    }

}
function QuizEnd(){
    answerButton.style.display = "none"
    question.style.display = "none"
    TotalScore.style.display = "block"
    nextButton.style.display = "none"

    TotalScore.innerHTML = `Your total score is ${score}/4`
}
StartQuiz()