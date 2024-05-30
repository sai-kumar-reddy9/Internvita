const apiUrl = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium';

let currentQuestionIndex = 0;
let questions = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function fetchQuestions() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results.map(q => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer],
        answer: q.correct_answer
    }));
    questions.forEach(q => shuffle(q.options));
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('question').innerText = "Quiz Completed!";
        document.getElementById('options').innerHTML = "";
        document.getElementById('next-question').style.display = "none";
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerHTML = currentQuestion.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer is ${currentQuestion.answer}.`);
    }
    document.getElementById('next-question').style.display = "block";
}

document.getElementById('next-question').onclick = () => {
    currentQuestionIndex++;
    document.getElementById('next-question').style.display = "none";
    loadQuestion();
};

// Fetch and load questions on page load
fetchQuestions();
