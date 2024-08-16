// JavaScript for Challenges
let challenges = [];
let completedChallenges = 0;

function addChallenge() {
    const challengeInput = document.getElementById('challenge-input');
    const challenge = challengeInput.value.trim();
    if (challenge) {
        challenges.push(challenge);
        challengeInput.value = '';
        renderChallenges();
    } else {
        alert('Please enter a challenge.');
    }
}

function renderChallenges() {
    const list = document.getElementById('challenge-list');
    list.innerHTML = '';
    challenges.forEach((challenge, index) => {
        const item = document.createElement('div');
        item.className = 'challenge-item';
        item.innerHTML = `
            <input type="checkbox" id="challenge-${index}" onchange="updateChallenge(${index})">
            <label for="challenge-${index}">${challenge}</label>
            <button onclick="removeChallenge(${index})">Remove</button>
        `;
        list.appendChild(item);
    });
    updateProgressBar();
}

function updateChallenge(index) {
    completedChallenges = document.querySelectorAll('#challenge-list input:checked').length;
    updateProgressBar();
}

function removeChallenge(index) {
    challenges.splice(index, 1);
    renderChallenges();
}

function updateProgressBar() {
    const progress = (completedChallenges / challenges.length) * 100 || 0;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// JavaScript for Fitness Tracker

function openModal(activity) {
    document.getElementById('modal-title').innerText = `Log Time for ${activity}`;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('time-input-modal').dataset.activity = activity;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fitness Tracker
function addFitnessActivity() {
    const activity = document.getElementById('time-input-modal').dataset.activity;
    const time = parseFloat(document.getElementById('time-input-modal').value);
    const caloriesBurnedElement = document.getElementById('calories-burned');
    const sleepFeedbackElement = document.getElementById('sleep-feedback');

    if (time) {
        let caloriesBurned = 0;
        if (activity === 'Swimming') {
            caloriesBurned = time * 7.5; // Example: 7.5 calories/minute
        } else if (activity === 'Workout') {
            caloriesBurned = time * 8.0; // Example: 8.0 calories/minute
        } else if (activity === 'Cycling') {
            caloriesBurned = time * 6.0; // Example: 6.0 calories/minute
        } else if (activity === 'Jogging') {
            caloriesBurned = time * 10.0; // Example: 10.0 calories/minute
        } else if (activity === 'Sleep') {
            displaySleepFeedback(time);
        }

        const log = document.createElement('div');
        log.className = 'fitness-log-item';
        log.innerHTML = `
            ${activity}: ${time} hours
            <button onclick="removeFitnessActivity(this, '${activity}', ${time})">Remove</button>
        `;
        document.getElementById('fitness-log').appendChild(log);

        if (activity !== 'Sleep') {
            caloriesBurnedElement.innerHTML = `<span>Calories Burned:</span> ${caloriesBurned.toFixed(2)} calories`;
        }

        closeModal();
    } else {
        alert('Please enter the time spent.');
    }
}

function removeFitnessActivity(button, activity, time) {
    button.parentElement.remove();

    // Update calories burned or sleep feedback if needed
    const fitnessLogs = document.querySelectorAll('#fitness-log .fitness-log-item');
    const caloriesBurnedElement = document.getElementById('calories-burned');
    const sleepFeedbackElement = document.getElementById('sleep-feedback');
    
    if (activity === 'Sleep') {
        // If the activity was sleep, clear the sleep feedback
        sleepFeedbackElement.innerHTML = '';
    } else {
        // Recalculate total calories burned if needed
        let totalCalories = 0;
        fitnessLogs.forEach(log => {
            const hours = parseFloat(log.textContent.split(': ')[1].split(' ')[0]);
            if (log.textContent.includes('Swimming')) {
                totalCalories += hours * 7.5;
            } else if (log.textContent.includes('Workout')) {
                totalCalories += hours * 8.0;
            } else if (log.textContent.includes('Cycling')) {
                totalCalories += hours * 6.0;
            } else if (log.textContent.includes('Jogging')) {
                totalCalories += hours * 10.0;
            }
        });
        caloriesBurnedElement.innerHTML = `<span>Calories Burned:</span> ${totalCalories.toFixed(2)} calories`;
    }
}

// JavaScript for Daily Routine
function addRoutine() {
    const timeInput = document.getElementById('time-input');
    const taskInput = document.getElementById('task-input');
    const time = timeInput.value;
    const task = taskInput.value.trim();
    if (time && task) {
        const routineList = document.getElementById('routine-list');
        const item = document.createElement('div');
        item.className = 'routine-item';
        item.innerHTML = `
            ${time} - ${task}
            <button onclick="removeRoutine(this)">Remove</button>
        `;
        routineList.appendChild(item);
        timeInput.value = '';
        taskInput.value = '';
    } else {
        alert('Please enter both time and task.');
    }
}

function removeRoutine(button) {
    button.parentElement.remove();
}


// Mood Tracker
function setMood(mood) {
    const moodSuggestion = document.getElementById('mood-suggestion');
    const moodActions = document.getElementById('mood-actions');
    moodActions.innerHTML = ''; // Clear previous actions

    switch (mood) {
        case 'happy':
            moodSuggestion.innerHTML = 'Great to see you happy! 😊';
            moodActions.innerHTML = `
                <div class="action-step">
                    <h3>Share Your Happiness</h3>
                    <p>Take a moment to share your joy with someone. It could be a friend, family member, or even a social media post!</p>
                </div>
                <div class="action-step">
                    <h3>Celebrate</h3>
                    <p>Do something you love, like treating yourself to your favorite snack or enjoying a fun activity.</p>
                </div>
            `;
            break;
        case 'sad':
            moodSuggestion.innerHTML = 'Sorry to hear you are feeling sad. 😢 Here are some suggestions to help you feel better:';
            moodActions.innerHTML = `
                <div class="action-step">
                    <h3>Meditation</h3>
                    <p>Take a few minutes for meditation to calm your mind and soothe your emotions. Here are some steps:</p>
                    <ol>
                        <li>Find a quiet and comfortable place.</li>
                        <li>Sit or lie down in a relaxed position.</li>
                        <li>Close your eyes and focus on your breath.</li>
                        <li>Inhale deeply and exhale slowly.</li>
                        <li>Continue this for 5-10 minutes.</li>
                        <li>Gradually bring your awareness back to the present.</li>
                    </ol>
                </div>
                <div class="action-step">
                    <h3>Yoga</h3>
                    <p>Try some gentle yoga poses to release tension and improve your mood. Here are some steps:</p>
                    <ol>
                        <li>Start with a few gentle stretches to warm up.</li>
                        <li>Try poses like Child’s Pose, Downward Dog, and Cat-Cow.</li>
                        <li>Hold each pose for 20-30 seconds.</li>
                        <li>Focus on your breathing throughout the practice.</li>
                        <li>Finish with a few minutes of relaxation in Savasana.</li>
                    </ol>
                </div>
            `;
            break;
        case 'neutral':
            moodSuggestion.innerHTML = 'Feeling neutral today. 😐 Maybe try a quick activity to lift your mood.';
            moodActions.innerHTML = `
                <div class="action-step">
                    <h3>Take a Short Walk</h3>
                    <p>A quick walk outside can help clear your mind and boost your mood.</p>
                </div>
                <div class="action-step">
                    <h3>Listen to Music</h3>
                    <p>Play some of your favorite music to energize yourself. Music can be a great mood lifter!</p>
                </div>
            `;
            break;
        default:
            moodSuggestion.innerHTML = '';
            moodActions.innerHTML = '';
    }
}


// JavaScript for Gratitude Journal
function addGratitude() {
    const gratitudeInput = document.getElementById('gratitude-input');
    const gratitude = gratitudeInput.value.trim();
    if (gratitude) {
        const list = document.getElementById('gratitude-list');
        const item = document.createElement('div');
        item.innerText = gratitude;
        list.appendChild(item);
        gratitudeInput.value = '';
    } else {
        alert('Please enter something you are grateful for.');
    }
}


// Water Intake Tracker
let waterLog = [];

function logWater() {
    let waterInput = document.getElementById('water-input').value;
    if (waterInput) {
        let amount = parseFloat(waterInput);
        if (!isNaN(amount) && amount > 0) {
            waterLog.push(amount);
            document.getElementById('water-input').value = '';
            displayWaterLog();
        } else {
            alert('Please enter a valid amount.');
        }
    }
}

function displayWaterLog() {
    let totalWater = waterLog.reduce((total, amount) => total + amount, 0);
    document.getElementById('total-water').innerText = `${totalWater.toFixed(2)} liters`;
}


// JavaScript for Daily Affirmations
function getAffirmation() {
    const affirmations = [
        "You are capable of achieving great things.",
        "Believe in yourself and all that you are.",
        "Every day is a new opportunity for growth.",
        "You have the power to create your own happiness.",
    ];
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    document.getElementById('affirmation-display').innerText = affirmations[randomIndex];
}

// Meal Planner
function addMeal() {
    const mealType = document.getElementById('meal-type').value;
    const mealDescription = document.getElementById('meal-description').value.trim();
    const mealList = document.getElementById(`${mealType}-list`);

    if (mealDescription) {
        const mealItem = document.createElement('div');
        mealItem.className = 'meal-item';
        mealItem.innerHTML = `
            ${mealDescription}
            <button onclick="removeMeal(this)">Remove</button>
        `;
        mealList.appendChild(mealItem);

        document.getElementById('meal-description').value = '';
    } else {
        alert('Please enter a meal description.');
    }
}

function removeMeal(button) {
    button.parentElement.remove();
}

// Pomodoro Timer
let pomodoroInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

function startPomodoro() {
    clearInterval(pomodoroInterval);
    timeLeft = 25 * 60; // Reset time
    pomodoroInterval = setInterval(updateTimer, 1000);
}

function stopPomodoro() {
    clearInterval(pomodoroInterval);
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    timeLeft = 25 * 60; // Reset time
    updateDisplay();
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('pomodoro-timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft === 0) {
        clearInterval(pomodoroInterval);
        alert('Pomodoro session ended!');
    }
    timeLeft--;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('pomodoro-timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


// JavaScript for Goal Setting
function addGoal() {
    const goalInput = document.getElementById('goal-input');
    const goal = goalInput.value.trim();
    if (goal) {
        const list = document.getElementById('goal-list');
        const item = document.createElement('div');
        item.innerText = goal;
        list.appendChild(item);
        goalInput.value = '';
    } else {
        alert('Please enter a goal.');
    }
}

// JavaScript for Expense Tracker
function addExpense() {
    const descriptionInput = document.getElementById('expense-description');
    const amountInput = document.getElementById('expense-amount');
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    if (description && !isNaN(amount)) {
        const list = document.getElementById('expense-list');
        const item = document.createElement('div');
        item.innerText = `${description}: $${amount.toFixed(2)}`;
        list.appendChild(item);
        
        const total = Array.from(list.getElementsByTagName('div'))
            .reduce((sum, div) => sum + parseFloat(div.innerText.split('$')[1]), 0);
        
        document.getElementById('total-expense').innerText = `Total: $${total.toFixed(2)}`;
        
        descriptionInput.value = '';
        amountInput.value = '';
    } else {
        alert('Please enter a valid description and amount.');
    }
}



// Function to show specific sections
function showSection(id) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}
