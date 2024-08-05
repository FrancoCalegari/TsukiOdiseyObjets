const questions = [
    {
        title: "¿Cuál es tu pasatiempo favorito?",
        description: "Descripción de la pregunta 1",
        image: "./assets/img/quiz/question1.jpg",
        answers: [
            { text: "Comer", points: [1, 0, 0, 0, 0] },
            { text: "Leer", points: [0, 1, 0, 0, 0] },
            { text: "Música", points: [0, 0, 1, 0, 0] },
            { text: "Cuidar Plantas", points: [0, 0, 0, 1, 0] },
            { text: "Me gusta el Chismesito", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Qué color te gusta?",
        description: "Descripción de la pregunta 2",
        image: "./assets/img/quiz/question2.jpg",
        answers: [
            { text: "Naranja", points: [1, 0, 0, 0, 0] },
            { text: "Amarillo", points: [0, 1, 0, 0, 0] },
            { text: "Verde", points: [0, 0, 1, 0, 0] },
            { text: "Blanco", points: [0, 0, 0, 1, 0] },
            { text: "Rojo", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Qué comida o bebida te gusta más?",
        description: "Descripción de la pregunta 3",
        image: "./assets/img/quiz/question3.jpg",
        answers: [
            { text: "Zanahoria", points: [1, 0, 0, 0, 0] },
            { text: "Ramen", points: [0, 1, 0, 0, 0] },
            { text: "Te", points: [0, 0, 1, 0, 0] },
            { text: "Frutas", points: [0, 0, 0, 1, 0] },
            { text: "Queso", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Cuál personaje te cae bien?",
        description: "Descripción de la pregunta 4",
        image: "./assets/img/quiz/question4.jpg",
        answers: [
            { text: "Pipi", points: [1, 0, 0, 0, 0] },
            { text: "Rosemary", points: [0, 1, 0, 0, 0] },
            { text: "Momo", points: [0, 0, 1, 0, 0] },
            { text: "Bobo", points: [0, 0, 0, 1, 0] },
            { text: "Scarlett", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Te gusta el Sol o La Luna?",
        description: "Descripción de la pregunta 5",
        image: "./assets/img/quiz/question5.jpg",
        answers: [
            { text: "Luna", points: [1, 0, 0, 1, 1] },
            { text: "Sol", points: [0, 1, 1, 0, 0] }
        ]
    },
    {
        title: "¿Cuál personaje te cae mal?",
        description: "Descripción de la pregunta 6",
        image: "./assets/img/quiz/question6.jpg",
        answers: [
            { text: "Ninguno", points: [1, 0, 0, 0, 0] },
            { text: "Chi", points: [0, 1, 0, 0, 0] },
            { text: "Bobo", points: [0, 0, 1, 0, 0] },
            { text: "Benny", points: [0, 0, 0, 1, 0] },
            { text: "Todos", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Cuál es tu horario de dormir?",
        description: "Descripción de la pregunta 7",
        image: "./assets/img/quiz/question7.jpg",
        answers: [
            { text: "No duermo", points: [1, 0, 0, 0, 0] },
            { text: "Temprano", points: [0, 1, 0, 0, 0] },
            { text: "Tarde", points: [0, 0, 1, 0, 0] },
            { text: "Insomnio", points: [0, 0, 0, 1, 0] }
        ]
    },
  
    {
        title: "¿Cómo describirías tu personalidad?",
        description: "Descripción de la pregunta 8",
        image: "./assets/img/quiz/question6.jpg",
        answers: [
            { text: "Aventurero/a", points: [1, 0, 0, 0, 0] },
            { text: "Tranquilo/a", points: [0, 1, 0, 0, 0] },
            { text: "Energético/a", points: [0, 0, 1, 0, 0] },
            { text: "Curioso/a", points: [0, 0, 0, 1, 0] },
            { text: "Amigable", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿En qué ámbito te sientes más cómodo/a?",
        description: "Descripción de la pregunta 9",
        image: "./assets/img/quiz/question6.jpg",
        answers: [
            { text: "Naturaleza", points: [1, 0, 0, 0, 0] },
            { text: "Ciudad", points: [0, 1, 0, 0, 0] },
            { text: "Playa", points: [0, 0, 1, 0, 0] },
            { text: "Montaña", points: [0, 0, 0, 1, 0] },
            { text: "Espacio", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Cuál de estas actitudes te describe mejor?",
        description: "Descripción de la pregunta 10",
        image: "./assets/img/quiz/question4.jpg",
        answers: [
            { text: "Enojón/a", points: [1, 0, 0, 0, 0] },
            { text: "Depresivo/a", points: [0, 1, 0, 0, 0] },
            { text: "Feliz", points: [0, 0, 1, 0, 0] },
            { text: "Serio/a", points: [0, 0, 0, 1, 0] },
            { text: "Relajado/a", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Qué tipo de vestimenta prefieres?",
        description: "Descripción de la pregunta 11",
        image: "./assets/img/quiz/question3.jpg",
        answers: [
            { text: "Ropa deportiva, colores oscuros", points: [1, 0, 0, 0, 0] },
            { text: "Casual, colores pasteles", points: [0, 1, 0, 0, 0] },
            { text: "Elegante, colores vibrantes", points: [0, 0, 1, 0, 0] },
            { text: "Bohemio, colores tierra", points: [0, 0, 0, 1, 0] },
            { text: "Formal, colores neutros", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Qué colores prefieres?",
        description: "Descripción de la pregunta 12",
        image: "./assets/img/quiz/question2.jpg",
        answers: [
            { text: "Verde y marrón", points: [1, 0, 0, 0, 0] },
            { text: "Azul y blanco", points: [0, 1, 0, 0, 0] },
            { text: "Rojo y negro", points: [0, 0, 1, 0, 0] },
            { text: "Amarillo y naranja", points: [0, 0, 0, 1, 0] },
            { text: "Violeta y rosa", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Qué actividades disfrutas más?",
        description: "Descripción de la pregunta 13",
        image: "./assets/img/quiz/question1.jpg",
        answers: [
            { text: "Basket", points: [1, 0, 0, 0, 0] },
            { text: "Yoga", points: [0, 1, 0, 0, 0] },
            { text: "Natación", points: [0, 0, 1, 0, 0] },
            { text: "Senderismo", points: [0, 0, 0, 1, 0] },
            { text: "Escribir", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Tienes alguna característica física notable?",
        description: "Descripción de la pregunta 14",
        image: "./assets/img/quiz/question1.jpg",
        answers: [
            { text: "Lunares", points: [1, 0, 0, 0, 0] },
            { text: "Marcas de nacimiento", points: [0, 1, 0, 0, 0] },
            { text: "Pecas", points: [0, 0, 1, 0, 0] },
            { text: "Tatuajes", points: [0, 0, 0, 1, 0] },
            { text: "Ninguna", points: [0, 0, 0, 0, 1] }
        ]
    },
    {
        title: "¿Cuál es la inicial de tu nombre?",
        description: "Descripción de la pregunta 15",
        image: "./assets/img/quiz/question1.jpg",
        answers: [
            { text: "A-E", points: [1, 0, 0, 0, 0] },
            { text: "F-J", points: [0, 1, 0, 0, 0] },
            { text: "K-O", points: [0, 0, 1, 0, 0] },
            { text: "P-T", points: [0, 0, 0, 1, 0] },
            { text: "U-Z", points: [0, 0, 0, 0, 1] }
        ]
    }
    ];
    
    // Agregar más preguntas aquí...


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
        const buttonsContainer = document.querySelector('.quiz-answers');
        buttonsContainer.innerHTML = ''; // Clear previous buttons
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.onclick = () => selectAnswer(index);
            buttonsContainer.appendChild(button);
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
