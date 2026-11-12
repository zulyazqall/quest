// Quiz questions
const questions = [
    {
        question: "Which component is considered the 'brain' of the computer?",
        options: ["RAM", "CPU", "GPU", "Hard Drive"],
        answer: 1,
        explanation: "Correct! The CPU (Central Processing Unit) is called the brain as it performs most calculations."
    },
    {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Readily Available Memory", "Rapid Access Module", "Running Active Memory"],
        answer: 0,
        explanation: "Correct! RAM stands for Random Access Memory, which temporarily stores data for quick access."
    },
    {
        question: "Which component stores data permanently even when the power is off?",
        options: ["RAM", "CPU", "SSD", "GPU"],
        answer: 2,
        explanation: "Correct! SSDs (Solid State Drives) and HDDs (Hard Disk Drives) store data permanently."
    },
    {
        question: "Which port would you typically plug a mouse into?",
        options: ["USB", "HDMI", "Ethernet", "VGA"],
        answer: 0,
        explanation: "Correct! Most mice connect via USB ports (or wirelessly via USB receivers)."
    },
    {
        question: "What component processes graphics in a computer?",
        options: ["CPU", "RAM", "SSD", "GPU"],
        answer: 3,
        explanation: "Correct! The GPU (Graphics Processing Unit) handles graphics rendering."
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// DOM elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const progressBar = document.getElementById('progress');

// Display question
function displayQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1}: ${q.question}`;
    
    optionsEl.innerHTML = '';
    q.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('option');
        optionEl.textContent = option;
        
        // Highlight if already answered
        if (userAnswers[currentQuestion] !== null) {
            if (index === q.answer) {
                optionEl.classList.add('correct');
            } else if (index === userAnswers[currentQuestion] && userAnswers[currentQuestion] !== q.answer) {
                optionEl.classList.add('incorrect');
            }
        }
        
        optionEl.addEventListener('click', () => selectAnswer(index));
        optionsEl.appendChild(optionEl);
    });
    
    // Show feedback if answered
    if (userAnswers[currentQuestion] !== null) {
        feedbackEl.textContent = q.explanation;
        feedbackEl.style.display = 'block';
        feedbackEl.style.backgroundColor = userAnswers[currentQuestion] === q.answer ? '#d4edda' : '#f8d7da';
        nextBtn.disabled = false;
    } else {
        feedbackEl.style.display = 'none';
        nextBtn.disabled = true;
    }
    
    // Update progress
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
    
    // Update score display
    updateScore();
}

// Handle answer selection
function selectAnswer(index) {
    if (userAnswers[currentQuestion] !== null) return;
    
    userAnswers[currentQuestion] = index;
    const q = questions[currentQuestion];
    
    if (index === q.answer) {
        score++;
    }
    
    displayQuestion();
}

// Update score display
function updateScore() {
    const answered = userAnswers.filter(a => a !== null).length;
    scoreEl.textContent = `Score: ${score}/${answered} (${Math.round((score / answered) * 100 || 0)}%)`;
}

// Event listeners for navigation
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        // Quiz completed
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = '';
        feedbackEl.textContent = `Final Score: ${score}/${questions.length} %`;
        feedbackEl.style.display = 'block';
        feedbackEl.style.backgroundColor = '#d4edda';
        nextBtn.disabled = true;
        prevBtn.disabled = false;
    }
});
// Start the quiz
displayQuestion();