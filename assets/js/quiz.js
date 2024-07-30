document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Pregunta 1",
            options: [
                { text: "Opción 1", personality: 1, determination: -1, justice: 0, tenderness: 2, affection: 1, friendship: -1, generosity: 0, loyalty: 1, kindness: -1 },
                { text: "Opción 2", personality: -1, determination: 1, justice: 2, tenderness: 0, affection: -1, friendship: 1, generosity: 0, loyalty: -1, kindness: 2 },
                { text: "Opción 3", personality: 0, determination: 0, justice: -1, tenderness: 1, affection: 0, friendship: -1, generosity: 2, loyalty: 1, kindness: 0 },
                { text: "Opción 4", personality: 2, determination: -1, justice: 1, tenderness: 0, affection: 2, friendship: 0, generosity: 1, loyalty: -1, kindness: 1 }
            ]
        },
        // Añade más preguntas aquí
    ];

    const characters = [
        { name: "Personaje 1", img: "img1.jpg", personality: 8, determination: 5, justice: 7, tenderness: 4, affection: 6, friendship: 5, generosity: 7, loyalty: 8, kindness: 6 },
        // Añade más personajes aquí
    ];

    let currentQuestion = 0;
    const scores = {
        personality: 0, determination: 0, justice: 0, tenderness: 0, affection: 0, friendship: 0, generosity: 0, loyalty: 0, kindness: 0
    };

    function renderQuestion() {
        if (currentQuestion >= questions.length) {
            showResult();
            return;
        }
        
        const question = questions[currentQuestion];
        const card = document.createElement('div');
        card.className = 'card active';

        const questionText = document.createElement('h2');
        questionText.textContent = question.question;
        card.appendChild(questionText);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';

        question.options.forEach(option => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'option';
            optionBtn.textContent = option.text;
            optionBtn.addEventListener('click', () => handleOptionClick(option));
            optionsContainer.appendChild(optionBtn);
        });

        card.appendChild(optionsContainer);
        document.getElementById('quiz-container').appendChild(card);
    }

    function handleOptionClick(option) {
        Object.keys(scores).forEach(key => {
            scores[key] += option[key];
        });

        const currentCard = document.querySelector('.card.active');
        currentCard.classList.remove('active');
        currentCard.addEventListener('animationend', () => {
            currentCard.remove();
            currentQuestion++;
            renderQuestion();
        });
    }

    function showResult() {
        const resultCard = document.createElement('div');
        resultCard.className = 'card active';

        if (scores.personality < 4) {
            const errorText = document.createElement('h2');
            errorText.textContent = 'Hubo un error con la puntuación. Tu puntaje de personalidad es muy bajo.';
            resultCard.appendChild(errorText);
        } else {
            let closestCharacter = null;
            let closestDiff = Infinity;

            characters.forEach(character => {
                const diff = getScoreDifference(character);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    closestCharacter = character;
                }
            });

            if (closestCharacter) {
                const resultText = document.createElement('h2');
                resultText.textContent = `Te pareces a: ${closestCharacter.name}`;
                resultCard.appendChild(resultText);

                const resultImg = document.createElement('img');
                resultImg.src = closestCharacter.img;
                resultImg.alt = closestCharacter.name;
                resultCard.appendChild(resultImg);

                const resultDescription = document.createElement('p');
                resultDescription.textContent = `Descripción del personaje: ${closestCharacter.name}`;
                resultCard.appendChild(resultDescription);

                const resultBar = document.createElement('div');
                resultBar.className = 'result-bar';
                resultBar.style.width = `${calculateSimilarity(closestCharacter)}%`;
                resultCard.appendChild(resultBar);
            } else {
                const errorText = document.createElement('h2');
                errorText.textContent = 'Hubo un error con la puntuación.';
                resultCard.appendChild(errorText);
            }
        }

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Empezar otra vez';
        restartButton.addEventListener('click', restartQuiz);
        resultCard.appendChild(restartButton);

        document.getElementById('quiz-container').appendChild(resultCard);
    }

    function getScoreDifference(character) {
        return Object.keys(scores).reduce((acc, key) => acc + Math.abs(scores[key] - character[key]), 0);
    }

    function calculateSimilarity(character) {
        const maxScore = Object.keys(scores).length * 10;
        const userScore = Object.keys(scores).reduce((acc, key) => acc + scores[key], 0);
        const characterScore = Object.keys(character).reduce((acc, key) => acc + character[key], 0);
        return Math.min((userScore / characterScore) * 100, 100);
    }

    function restartQuiz() {
        currentQuestion = 0;
        Object.keys(scores).forEach(key => scores[key] = 0);
        document.getElementById('quiz-container').innerHTML = '';
        renderQuestion();
    }

    renderQuestion();
});
