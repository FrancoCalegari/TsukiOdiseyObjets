document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Pregunta 1",
            description: "Esta es una breve descripción de la pregunta 1.",
            img: "path/to/image1.jpg",
            options: [
                { text: "Opción 1", concentracion: 1, determinacion: -1, inteligencia: 0, ternura: 2, afecto: 1, amistad: -1, generosidad: 0, lealtad: 1, amabilidad: -1 },
                { text: "Opción 2", concentracion: -1, determinacion: 1, inteligencia: 2, ternura: 0, afecto: -1, amistad: 1, generosidad: 0, lealtad: -1, amabilidad: 2 },
                { text: "Opción 3", concentracion: 0, determinacion: 0, inteligencia: -1, ternura: 1, afecto: 0, amistad: -1, generosidad: 2, lealtad: 1, amabilidad: 0 },
                { text: "Opción 4", concentracion: 2, determinacion: -1, inteligencia: 1, ternura: 0, afecto: 2, amistad: 0, generosidad: 1, lealtad: -1, amabilidad: 1 }
            ]
        },
        {
            question: "Pregunta 2",
            description: "Esta es una breve descripción de la pregunta 2.",
            img: "path/to/image2.jpg",
            options: [
                { text: "Opción 1", concentracion: 1, determinacion: -1, inteligencia: 0, ternura: 2, afecto: 1, amistad: -1, generosidad: 0, lealtad: 1, amabilidad: -1 },
                { text: "Opción 2", concentracion: -1, determinacion: 1, inteligencia: 2, ternura: 0, afecto: -1, amistad: 1, generosidad: 0, lealtad: -1, amabilidad: 2 },
                { text: "Opción 3", concentracion: 0, determinacion: 0, inteligencia: -1, ternura: 1, afecto: 0, amistad: -1, generosidad: 2, lealtad: 1, amabilidad: 0 },
                { text: "Opción 4", concentracion: 2, determinacion: -1, inteligencia: 1, ternura: 0, afecto: 2, amistad: 0, generosidad: 1, lealtad: -1, amabilidad: 1 }
            ]
        },
        {
            question: "Pregunta 3",
            description: "Esta es una breve descripción de la pregunta 3.",
            img: "path/to/image3.jpg",
            options: [
                { text: "Opción 1", concentracion: 1, determinacion: -1, inteligencia: 0, ternura: 2, afecto: 1, amistad: -1, generosidad: 0, lealtad: 1, amabilidad: -1 },
                { text: "Opción 2", concentracion: -1, determinacion: 1, inteligencia: 2, ternura: 0, afecto: -1, amistad: 1, generosidad: 0, lealtad: -1, amabilidad: 2 },
                { text: "Opción 3", concentracion: 0, determinacion: 0, inteligencia: -1, ternura: 1, afecto: 0, amistad: -1, generosidad: 2, lealtad: 1, amabilidad: 0 },
                { text: "Opción 4", concentracion: 2, determinacion: -1, inteligencia: 1, ternura: 0, afecto: 2, amistad: 0, generosidad: 1, lealtad: -1, amabilidad: 1 }
            ]
        },
        {
            question: "Pregunta 4",
            description: "Esta es una breve descripción de la pregunta 4.",
            img: "path/to/image4.jpg",
            options: [
                { text: "Opción 1", concentracion: 1, determinacion: -1, inteligencia: 0, ternura: 2, afecto: 1, amistad: -1, generosidad: 0, lealtad: 1, amabilidad: -1 },
                { text: "Opción 2", concentracion: -1, determinacion: 1, inteligencia: 2, ternura: 0, afecto: -1, amistad: 1, generosidad: 0, lealtad: -1, amabilidad: 2 },
                { text: "Opción 3", concentracion: 0, determinacion: 0, inteligencia: -1, ternura: 1, afecto: 0, amistad: -1, generosidad: 2, lealtad: 1, amabilidad: 0 },
                { text: "Opción 4", concentracion: 2, determinacion: -1, inteligencia: 1, ternura: 0, afecto: 2, amistad: 0, generosidad: 1, lealtad: -1, amabilidad: 1 }
            ]
        }
    ];

    const characters = [
        { name: "Personaje 1", img: "img1.jpg", concentracion: 8, determinacion: 5, inteligencia: 7, ternura: 4, afecto: 6, amistad: 5, generosidad: 7, lealtad: 8, amabilidad: 6 },
        // Añade más personajes aquí
    ];

    let currentQuestion = 0;
    const scores = {
        concentracion: 0, determinacion: 0, inteligencia: 0, ternura: 0, afecto: 0, amistad: 0, generosidad: 0, lealtad: 0, amabilidad: 0
    };

    function renderQuestion() {
        console.log(`Renderizando pregunta ${currentQuestion + 1}`);

        if (currentQuestion >= questions.length) {
            showResult();
            return;
        }
        
        const question = questions[currentQuestion];
        const card = document.createElement('div');
        card.className = 'quiz-card active';

        const questionText = document.createElement('h2');
        questionText.textContent = question.question;
        card.appendChild(questionText);

        const descriptionText = document.createElement('p');
        descriptionText.textContent = question.description;
        card.appendChild(descriptionText);

        const questionImg = document.createElement('img');
        questionImg.src = question.img;
        questionImg.alt = question.question;
        card.appendChild(questionImg);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';

        question.options.forEach(option => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'quiz-option';
            optionBtn.textContent = option.text;
            optionBtn.addEventListener('click', () => handleOptionClick(option));
            optionsContainer.appendChild(optionBtn);
        });

        card.appendChild(optionsContainer);
        document.getElementById('quiz-container').appendChild(card);
    }

    function handleOptionClick(option) {
        console.log(`Seleccionó la opción: ${option.text}`);
        console.log(`Puntuaciones antes de la selección:`, { ...scores });

        Object.keys(scores).forEach(key => {
            scores[key] += option[key];
        });

        console.log(`Puntuaciones después de la selección:`, { ...scores });

        const currentCard = document.querySelector('.quiz-card.active');
        currentCard.classList.remove('active');
        currentCard.addEventListener('animationend', () => {
            currentCard.remove();
            currentQuestion++;
            renderQuestion();
        });

        // For browsers that don't support 'animationend' event
        setTimeout(() => {
            if (document.body.contains(currentCard)) {
                currentCard.remove();
                currentQuestion++;
                renderQuestion();
            }
        }, 500);
    }

    function showResult() {
        console.log('Mostrando resultados');

        const resultCard = document.createElement('div');
        resultCard.className = 'quiz-card active';

        if (scores.concentracion < 4) {
            console.error('Error: Puntaje de concentración demasiado bajo');
            const errorText = document.createElement('h2');
            errorText.textContent = 'Hubo un error con la puntuación. Tu puntaje de concentración es muy bajo.';
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
                console.log(`Personaje más cercano: ${closestCharacter.name}`);
                const resultText = document.createElement('h2');
                resultText.textContent = `Te pareces a: ${closestCharacter.name}`;
                resultCard.appendChild(resultText);

                const resultImage = document.createElement('img');
                resultImage.src = closestCharacter.img;
                resultImage.alt = closestCharacter.name;
                resultCard.appendChild(resultImage);

                const resultDescription = document.createElement('p');
                resultDescription.textContent = `Descripción del personaje: ${closestCharacter.name}`;
                resultCard.appendChild(resultDescription);

                const resultBar = document.createElement('div');
                resultBar.className = 'quiz-result-bar';
                resultBar.style.width = `${calculateSimilarity(closestCharacter)}%`;
                resultCard.appendChild(resultBar);
            } else {
                console.error('Error: No se encontró un personaje cercano');
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
        console.log('Reiniciando quiz');
        currentQuestion = 0;
        Object.keys(scores).forEach(key => scores[key] = 0);
        document.getElementById('quiz-container').innerHTML = '';
        renderQuestion();
    }

    try {
        renderQuestion();
    } catch (error) {
        console.error('Error inicializando el quiz:', error);
    }
});
