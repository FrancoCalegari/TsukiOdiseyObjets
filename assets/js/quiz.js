const questions = [
    {
        title: "¿Cuál es tu pasatiempo favorito?",
        description: "Descripción de la pregunta 1",
        image: "question1.jpg",
        answers: [
            { text: "Comer", points: [1, 0, 0, 0, 0] }, // Tsuki recibe 1 punto
            { text: "Leer", points: [0, 1, 0, 0, 0] }, // Chi recibe 1 punto
            { text: "Música", points: [0, 0, 1, 0, 0] }, // Moca recibe 1 punto
            { text: "Cuidar Plantas", points: [0, 0, 0, 1, 0] }, // Rosemary recibe 1 punto
            { text: "Me gusta el Chismesito", points: [0, 0, 0, 0, 1] } // Ratthew recibe 1 punto
        ]
    },
    {
        title: "¿Qué color te gusta?",
        description: "Descripción de la pregunta 2",
        image: "question2.jpg",
        answers: [
            { text: "Naranja", points: [1, 0, 0, 0, 0] },
            { text: "Amarillo", points: [0, 1, 0, 0, 0] },
            { text: "Verde", points: [0, 0, 1, 0, 0] },
            { text: "Blanco", points: [0, 0, 0, 1, 0] },
            { text: "Rojo", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "Que comida te gusta mas?",
        description: "Descripción de la pregunta 3",
        image: "question2.jpg",
        answers: ["Zhanahorias", "Ramen", "Te'", "Frutas", "Queso"]
    },
    {
        title: "Cual personaje te cae bien?",
        description: "Descripción de la pregunta 4",
        image: "question2.jpg",
        answers: ["Pipi", "Rosemary", "Momo", "Bobo", "Scarlett"]
    },
    {
        title: "Cual personaje te cae mal?",
        description: "Descripción de la pregunta 5",
        image: "question2.jpg",
        answers: ["Ninguno", "Chi", "Bobo", "Benny", "Todos"]
    },
    {
        title: "Cual es tu horario de dormir?",
        description: "Descripción de la pregunta 6",
        image: "question2.jpg",
        answers: ["No duermo", "12pm", "11pm", "insomnio", "8am"]
    }
    // Agregar más preguntas aquí...
];

const results = [
    { name: "Tsuki", image: "./assets/img/personajes/TsukiSprite.webp" },
    { name: "Chi", image: "./assets/img/personajes/ChiSprite.webp" },
    { name: "Moca", image: "./assets/img/personajes/MocaSprite.webp" },
    { name: "Rosemary", image: "./assets/img/personajes/RosemarySprite.webp" },
    { name: "Ratthew", image: "./assets/img/personajes/RatthewSprite.webp" }
];

let currentQuestion = 0;
let points = [0, 0, 0, 0, 0];

function startQuiz() {
    document.getElementById('quiz-intro-card').style.display = 'none';
    document.getElementById('quiz-question-card').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        document.getElementById('quiz-question-title').textContent = question.title;
        document.getElementById('quiz-question-description').textContent = question.description;
        document.getElementById('quiz-question-image').src = question.image;
        const buttons = document.querySelectorAll('.quiz-answers button');
        buttons.forEach((button, index) => {
            button.textContent = question.answers[index].text;
            button.onclick = () => selectAnswer(index);
        });
        console.log(`Mostrando pregunta ${currentQuestion + 1}`);
    } else {
        showResults();
    }
}

function selectAnswer(index) {
    const question = questions[currentQuestion];
    const pointsToAdd = question.answers[index].points;
    points = points.map((point, i) => point + pointsToAdd[i]);
    console.log(`Seleccionada respuesta ${index} para pregunta ${currentQuestion + 1}`);
    currentQuestion++;
    showQuestion();
}

function showResults() {
    document.getElementById('quiz-question-card').style.display = 'none';
    document.getElementById('quiz-result-card').style.display = 'block';
    const maxPoints = Math.max(...points);
    const resultIndex = points.indexOf(maxPoints);
    const result = results[resultIndex];
    document.getElementById('quiz-result-title').textContent = `¡Te pareces a ${result.name}!`;
    document.getElementById('quiz-result-image').src = result.image;
    
    const chart = document.getElementById('quiz-result-chart');
    chart.innerHTML = '';
    points.forEach((point, index) => {
        const barContainer = document.createElement('div');
        const barLabel = document.createElement('div');
        const bar = document.createElement('div');
        
        barLabel.textContent = results[index].name;
        barLabel.classList.add('quiz-result-label');
        
        bar.style.width = `${(point / questions.length) * 100}%`;
        bar.textContent = point;
        bar.classList.add('quiz-result-bar');
        
        barContainer.appendChild(barLabel);
        barContainer.appendChild(bar);
        chart.appendChild(barContainer);
    });

    console.log(`Resultado final: ${result.name}`);
}

function restartQuiz() {
    currentQuestion = 0;
    points = [0, 0, 0, 0, 0];
    document.getElementById('quiz-result-card').style.display = 'none';
    document.getElementById('quiz-intro-card').style.display = 'block';
}
