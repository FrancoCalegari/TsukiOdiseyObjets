const characters = [
    {
        name: 'Benny',
        image: './assets/img/personajes/BennySprite.webp',
        sex: 'Male',
        date: '1',
        description: 'Benny es un mapache muy ansioso y centrado en el trabajo. A veces tartamudea al hablar, y se lamenta ante Tsuki de las dificultades de gestionar toda una ciudad y ser incapaz de relajarse.'
    },
    {
        name: 'Tsuki',
        image: './assets/img/personajes/TsukiSprite.webp',
        sex: 'Male',
        date: '1',
        description: 'Tsuki hace lo que quiere durante el día. El jugador puede entrar y salir del juego para ver qué está haciendo. De vez en cuando, Tsuki interactúa aleatoriamente con un objeto comprado a Pipi, creando publicaciones en Parsnap.'
    },
    {
        name: 'Bobo',
        image: './assets/img/personajes/BoboSprite.webp',
        sex: 'Male',
        date: '12',
        description: 'Bobo es un panda relajado y despreocupado, siempre listo para una siesta o una comida abundante.'
    },
    {
        name: 'Camille',
        image: './assets/img/personajes/Chameleon3.webp',
        sex: 'Female',
        date: '1',
        description: 'Aparece cada 3 horas (aproximadamente) en distintos lugares de la Aldea Hongo y recompensará con 1200Carrots tras ver un anuncio.'
    },
    {
        name: 'Chi',
        image: './assets/img/personajes/ChiSprite.webp',
        sex: 'Female',
        date: '2',
        description: 'Un ratón de biblioteca que habla sobre todo de libros. Es un desgraciado que se roba todo lo que tenemos, mala persona y falsa amiga'
    },
    {
        name: 'Dawn',
        image: './assets/img/personajes/DawnSprite.webp',
        sex: 'Female',
        date: '5',
        description: 'Dawn aparece en el Ayuntamiento alrededor de las 8 - 10am y en la Tienda general de Yori a partir de las 5pm. También se dará un baño alrededor de las 4am. Es el constructora del puéblo reparan todo y en su tienda vende cosas para decorar pareded y pizos'
    },
    {
        name: 'Draper',
        image: './assets/img/personajes/DraperSprite.webp',
        sex: 'Male',
        date: '1',
        description: 'Draper aparece por la mañana temprano y por la noche en la puerta de la casa del árbol de Tsuki con ofertas publicitarias.'
    },
    {
        name: 'Elfie',
        image: './assets/img/personajes/ElfieSprite.webp',
        sex: 'Female',
        date: '1',
        description: 'Elfie se queda en la planta baja de la Tienda general de Yori. De vez en cuando lee un libro en la recepción o utiliza el teléfono en medio de la tienda. A veces, antes y después de su turno, se la puede ver sentada en el suelo con Paige mientras escribe en un papel.'
    },
    {
        name: 'Gecko',
        image: './assets/img/personajes/GeckoSprite.webp',
        sex: 'Male',
        date: '30',
        description: 'Gecko es un pequeño lagarto ágil y curioso, explorador incansable de su entorno.Gecko es encontrado y capturado por Bobo, quien se refiere al gecko como un "bribón". Bobo luego le ofrece a Tsuki que adopte al gecko. Al hacerlo, el jugador puede nombrar al gecko como desee.'
    },
    {
        name: 'Ken',
        image: './assets/img/personajes/Ken.webp',
        sex: 'Male',
        date: '10',
        description: 'Ken tiene un exterior duro, pero por dentro se preocupa por sus amigos. Se enorgullece de su fuerza y de su exterior aterrador.'
    },
    {
        name: 'Moca',
        image: './assets/img/personajes/MocaSprite.webp',
        sex: 'Male',
        date: '7',
        description: 'A Moca le gusta tomar siestas, comer papas fritas, beber té y cuidar su bonsái. Cuando se le solicite, puede pedirle a Tsuki que compre una nueva maceta para su árbol bonsái después de que la vieja se rompa. Aparece en la tienda de Yori alrededor de las 11 a.m. y las 2. 30 horas.'
    },
    {
        name: 'Momo',
        image: './assets/img/personajes/MomoSprite.webp',
        sex: 'Female',
        date: '12',
        description: 'A Momo no le gusta hablar mucho y prefiere usar pocas palabras. Le gusta el silencio y se molesta cuando las personas a su alrededor son demasiado ruidosas.'
    },
    {
        name: 'Olson',
        image: './assets/img/personajes/OlsonSprite.webp',
        sex: 'Female',
        date: '1',
        description: 'Ella es una representante de Candiru Corp y le daría a Tsuki la opción de ver anuncios y ganar 800 zanahorias a cambio. Olson trabaja en el turno de noche, mientras que su colega Draper trabaja durante el día.'
    },
    {
        name: 'Paige',
        image: './assets/img/personajes/PaigeSprite.webp',
        sex: 'Female',
        date: '1',
        description: 'Paige es muy tranquila y con los pies en la tierra. Tiene un lado más infantil que se muestra a través de su amor por la comida y el odio de estar encerrada durante demasiado tiempo. A Paige le gusta tallar madera y pintar.'
    },
    {
        name: 'Pipi',
        image: './assets/img/personajes/PipiSprite.webp',
        sex: 'Female',
        date: '1',
        description: 'Pipi es una ardilla alegre y entusiasta, siempre recogiendo nueces y haciendo amigos.'
    },
    {
        name: 'Ratthew',
        image: './assets/img/personajes/RatthewSprite.webp',
        sex: 'Male',
        date: '16',
        description: 'Ratthew es una rata ingeniosa y astuta, con un talento especial para resolver problemas.'
    },
    {
        name: 'Rosemary',
        image: './assets/img/personajes/RosemarySprite.webp',
        sex: 'Female',
        date: '9',
        description: 'Se ve que Rosemary es gentil y cariñosa con sus plantas. Muestra un aprecio genuino por la naturaleza y le encanta hablar de ella con otras personas que comparten el mismo interés. Este lado de ella, sin embargo, se atenúa por la noche. Cerca de la hora de cierre, le hacía pasar a Tsuki para que se diera prisa y saliera de la tienda. Al visitarla después de la hora de cierre, contemplará su vida y se da a entender que está deprimida.'
    },
    {
        name: 'Scarlett',
        image: './assets/img/personajes/ScarlettSprite.webp',
        sex: 'Female',
        date: '18',
        description: 'Scarlett tiene mucha sabiduría y confianza, probablemente debido a su edad y experiencia. Le gusta mucho cantar y escribir canciones.'
    },
    {
        name: 'Yori',
        image: './assets/img/personajes/YoriSprite.webp',
        sex: 'Male',
        date: '1',
        description: 'Yori tenía una esposa llamada Miyabi. Lo más probable es que muriera durante el parto debido a que Pipi mencionó que no la conoció. Yori es viejo, pero es amable. ¡También le encanta pescar!'
    },
    {
        name: 'Rudolph',
        image: './assets/img/personajes/Rudolph.webp',
        sex: 'Male',
        date: 'Navidad',
        description: 'Rudolph se encuentra en el muelle de Mermaid Coast desde el 15 de diciembre hasta el 15 de enero.'
    },
];

const gallery = document.getElementById('personajes-gallery');
const popup = document.getElementById('personajes-popup');
const popupImage = document.getElementById('personajes-popupImage');
const popupName = document.getElementById('personajes-popupName');
const popupSex = document.getElementById('personajes-popupSex');
const popupDate = document.getElementById('personajes-popupDate');
const popupDescription = document.getElementById('personajes-popupDescription');
const closePopup = document.getElementById('personajes-closePopup');

characters.forEach((character, index) => {
    const charDiv = document.createElement('div');
    charDiv.classList.add('personajes-character');
    charDiv.innerHTML = `<img src="${character.image}" alt="${character.name}">`;
    charDiv.addEventListener('click', () => openPopup(index));
    gallery.appendChild(charDiv);
});

function openPopup(index) {
    const character = characters[index];
    popupImage.src = character.image;
    popupName.textContent = character.name;
    popupSex.textContent = `Sexo: ${character.sex}`;
    popupDate.textContent = `Aparece el día: ${character.date}`;
    popupDescription.textContent = character.description;
    popup.style.display = 'flex';
}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});