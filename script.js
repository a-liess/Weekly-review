// Questions array
const questions = [
    "Where did you experience unnecessary struggle?",
    "Did I give my best energy?",
    "Am I moving in the right direction?",
    "What made me come alive?"
];

// State variables
let currentQuestionIndex = 0;
let timerActive = false;
let timeRemaining = 120; // 2 minutes in seconds
let timerInterval;

// DOM elements
const questionText = document.getElementById('questionText');
const questionCounter = document.getElementById('questionCounter');
const timerButton = document.getElementById('timerButton');
const timerDisplay = document.getElementById('timerDisplay');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const finishButton = document.getElementById('finishButton');

// Update the display
function updateQuestion() {
    questionText.textContent = questions[currentQuestionIndex];
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Show finish button only on last question
    finishButton.style.display = currentQuestionIndex === questions.length - 1 ? 'block' : 'none';
}

// Format time for display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Timer functions
function startTimer() {
    timerActive = true;
    timeRemaining = 120;
    timerButton.disabled = true;
    timerDisplay.style.display = 'block';
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time remaining: ${formatTime(timeRemaining)}`;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerActive = false;
            timerButton.disabled = false;
            timerButton.textContent = 'Start 2min Timer';
            timerDisplay.style.display = 'none';
        }
    }, 1000);
}

// Reset timer function
function resetTimer() {
    if (timerActive) {
        clearInterval(timerInterval);
        timerActive = false;
        timerButton.disabled = false;
        timerButton.textContent = 'Start 2min Timer';
        timerDisplay.style.display = 'none';
    }
}

// Event listeners
timerButton.addEventListener('click', () => {
    if (!timerActive) {
        startTimer();
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
        resetTimer();
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
        resetTimer();
    }
});

// Add finish button event listener
finishButton.addEventListener('click', () => {
    // Hide all navigation and timer elements
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    timerButton.style.display = 'none';
    timerDisplay.style.display = 'none';
    finishButton.style.display = 'none';
    questionCounter.style.display = 'none';
    
    // Reset timer if active
    resetTimer();
    
    // Show completion message
    questionText.className = 'completion-message';
    questionText.textContent = 'Congratulations, you finished your weekly review! 🎉';
});

// Initialize the first question
updateQuestion();