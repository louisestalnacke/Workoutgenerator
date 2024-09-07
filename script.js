document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired'); // Kontrollera att detta skrivs ut i konsolen

    const form = document.getElementById('workoutForm');
    const resultContainer = document.querySelector('.container2');

    // Lista med övningar
    const exercisesList = {
        Överkropp: ['Squats', 'Lunges', 'Leg Press', 'Deadlifts'],
        Underkropp: ['Bicep Curls', 'Tricep Dips', 'Hammer Curls', 'Push-ups'],
        Blandat: ['Bench Press', 'Push-ups', 'Chest Flyes', 'Incline Bench Press']
    };

    // Lägg till eventlyssnare för formulärets inlämning
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        console.log('Form submitted'); // Kontrollera att detta skrivs ut i konsolen
        
        const length = document.getElementById('length').value;
        const exerciseType = document.getElementById('exerciseType').value;
        const exerciseCount = document.getElementById('exerciseCount').value;
        const muscleGroup = document.getElementById('muscleGroup').value;

        const workoutPlan = generateWorkoutPlan(length, exerciseType, exerciseCount, muscleGroup);

        resultContainer.innerHTML = workoutPlan;
        resultContainer.style.display = 'flex'; // Visa resultatet med Flexbox layout
    });

    function generateWorkoutPlan(length, exerciseType, exerciseCount, muscleGroup) {
        let exercises = '';

        for (let i = 1; i <= exerciseCount; i++) {
            const exercise = getRandomExercise(muscleGroup);
            exercises += `
                <li>
                    ${i}:   <span class="exercise-text">  ${exercise}</span>
                    <button type="button" class="exercise-button" data-index="${i}">✂︎</button>
                </li>
            `;
        }

        return `
        <div class="left-column">
        <h3><strong>Tid:</strong> <span class="highlight">${length} minuter</span></h3>
        <h3><strong>Typ av övningar:</strong> <span class="highlight">${exerciseType}</span></h3>
        <h3><strong>Antal övningar:</strong> <span class="highlight">${exerciseCount}</span></h3>
        <h3><strong>Kroppsdel:</strong> <span class="highlight">${muscleGroup}</span></h3>
    </div>
    <div class="right-column">
        <ul class="exercise-list">${exercises}</ul>
    </div>
        `;
    }

    function getRandomExercise(muscleGroup) {
        const exercises = exercisesList[muscleGroup];
        const randomIndex = Math.floor(Math.random() * exercises.length);
        return exercises[randomIndex];
    }

    // Hantera knappklick för att byta övning
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('exercise-button')) {
            const button = event.target;
            const index = button.getAttribute('data-index');
            const exerciseText = button.previousElementSibling;
            const muscleGroup = document.getElementById('muscleGroup').value;
            
            // Hämta ny övning
            const newExercise = getRandomExercise(muscleGroup);
            exerciseText.textContent = newExercise; // Uppdatera texten
        }
    });
});
