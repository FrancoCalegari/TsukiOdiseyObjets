const fishData = [
    { type: 'Ajolote', place: 'Rosemarys Plant Shop', startHour: 2, endHour: 7 },
    { type: 'Tiburón Anillado', place: 'Rosemarys Plant Shop', startHour: 18, endHour: 0 },
    { type: 'Lengüeta', place: 'Rosemarys Plant Shop', startHour: 2, endHour: 3 },
    { type: 'Barracuda', place: 'Mermaid Coast/Muelle', startHour: 17, endHour: 21 },
    { type: 'Espiga azul', place: 'Mermaid Coast/Muelle', startHour: 18, endHour: 19 },
    { type: 'Pez Gato', place: 'Dawns Workshop', startHour: 8, endHour: 11 },
    { type: 'Pez Payaso padre', place: 'Dawns Workshop', startHour: 1, endHour: 5 },
    { type: 'Pez payaso', place: 'Mermaid Coast/Muelle', startHour: 12, endHour: 16 },
    { type: 'Disco', place: 'Rosemarys Plant Shop', startHour: 22, endHour: 1 },
    { type: 'Pez Perro', place: 'Mermaid Coast/Muelle', startHour: 7, endHour: 14 },
    { type: 'Pez Murciélago Oscuro', place: 'Dawns Workshop/Rosemarys Plant Shop', startHour: 18, endHour: 23 },
    { type: 'Anguila Electrica', place: 'Dawns Workshop', startHour: 10, endHour: 0 },
    { type: 'Pez Elefante', place: 'Rosemarys Plant Shop', startHour: 6, endHour: 14 },
    { type: 'Cangrejo Buscador', place: 'Rosemarys Plant Shop', startHour: 4, endHour: 9 },
    { type: 'Cuerno de flor', place: 'Rosemarys Plant Shop', startHour: 7, endHour: 16 },
    { type: 'Gar', place: 'Dawns Workshop/Rosemarys Plant Shop', startHour: 1, endHour: 7 },
    { type: 'Almeja gigante', place: 'Dawns Workshop', startHour: 2, endHour: 6 },
    { type: 'Pez Dorado', place: 'Dawns Workshop', startHour: 18, endHour: 23 },
    { type: 'Gourami', place: 'Rosemarys Plant Shop', startHour: 19, endHour: 23 },
    { type: 'Cangrejo de Herradura', place: 'Mermaid Coast/Muelle', startHour: 0, endHour: 18 },
    { type: 'Kouhaku Koi', place: 'Rosemarys Plant Shop', startHour: 10, endHour: 20 },
    { type: 'Labeo', place: 'Rosemarys Plant Shop', startHour: 5, endHour: 9 },
    { type: 'Lamprea', place: 'Mermaid Coast/Muelle', startHour: 5, endHour: 17 },
    { type: 'Pez León', place: 'Mermaid Coast/Muelle', startHour: 10, endHour: 19 },
    { type: 'Pez dorado cabeza de león', place: 'Rosemarys Plant Shop', startHour: 7, endHour: 10 },
    { type: 'Pez Pulmonado', place: 'Dawns Workshop', startHour: 10, endHour: 14 },
    { type: 'Mahi-Mahi', place: 'Dawns Workshop', startHour: 7, endHour: 11 },
    { type: 'Man o war', place: 'Dawns Workshop', startHour: 10, endHour: 5 },
    { type: 'Pez Gelatina De Luna', place: 'Mermaid Coast/Muelle', startHour: 2, endHour: 7 },
    { type: 'Anguila Morenas', place: 'Mermaid Coast/Muelle/Dawns Workshop', startHour: 1, endHour: 5 },
    { type: 'Saltador de Barro', place: 'Dawns Workshop', startHour: 17, endHour: 22 },
    { type: 'Pez remo', place: 'Rosemarys Plant Shop', startHour: 6, endHour: 13 },
    { type: 'Oscar', place: 'Rosemarys Plant Shop', startHour: 6, endHour: 14 },
    { type: 'Pacu', place: 'Rosemarys Plant Shop', startHour: 9, endHour: 11 },
    { type: 'Pez Loro', place: 'Mermaid Coast/Muelle', startHour: 6, endHour: 11 },
    { type: 'Anguila Pelicano', place: 'Mermaid Coast/Muelle', startHour: 0, endHour: 3 },
    { type: 'Perca', place: 'Rosemarys Plant Shop/Dawns Workshop', startHour: 1, endHour: 8 },
    { type: 'Pez Lucioperca', place: 'Todos lo lugares/All locations', startHour: 8, endHour: 11 },
    { type: 'Piraña', place: 'Dawns Workshop/Rosemarys Plant Shop', startHour: 16, endHour: 20 },
    { type: 'Pleco', place: 'Dawns Workshop/Rosemarys Plant Shop', startHour: 1, endHour: 13 },
    { type: 'Abadejo', place: 'Mermaid Coast/Muelle', startHour: 17, endHour: 23 },
    { type: 'Pez Globo', place: 'Mermaid Coast/Muelle', startHour: 17, endHour: 23 },
    { type: 'Anguila de Río', place: 'Dawns Workshop', startHour: 0, endHour: 14 },
    { type: 'Chabelita tricolor', place: 'Mermaid Coast/Muelle', startHour: 6, endHour: 10 },
    { type: 'Pez Roca', place: 'Rosemarys Plant Shop', startHour: 9, endHour: 17 },
    { type: 'Salmon', place: 'Dawns Workshop', startHour: 5, endHour: 11 },
    { type: 'Shiro-Utsuri Koi', place: 'Rosemarys Plant Shop', startHour: 5, endHour: 10 },
    { type: 'Showa Koi', place: 'Rosemarys Plant Shop', startHour: 16, endHour: 22 },
    { type: 'Anchoa', place: 'Mermaid Coast/Muelle', startHour: 0, endHour: 23 },
    { type: 'Mixtape Costero', place: 'Mermaid Coast/Muelle', startHour: 0, endHour: 23 },
    { type: 'Lubina Negra', place: 'Mermaid Coast/Muelle', startHour: 0, endHour: 23 },
    { type: 'Cazon', place: 'Mermaid Coast/Muelle', startHour: 8, endHour: 12 },
    { type: 'Meduza Luna', place: 'Mermaid Coast/Muelle', startHour: 15, endHour: 17 },
    { type: 'Espinozo', place: 'Mermaid Coast/Muelle', startHour: 9, endHour: 10 },
    { type: 'Rayo manchado', place: 'Mermaid Coast/Muelle', startHour: 13, endHour: 17 },
    { type: 'Pez Sapo', place: 'Mermaid Coast/Muelle', startHour: 15, endHour: 17 },
    { type: 'Lengueta', place: 'Rosemarys Plant Shop', startHour: 14, endHour: 15 },
    { type: 'Pez Betta', place: 'Rosemarys Plant Shop', startHour: 0, endHour: 23 },
    { type: 'Cangrejo Violinista', place: 'Rosemarys Plant Shop', startHour: 4, endHour: 9 },
    { type: 'Gruami', place: 'Rosemarys Plant Shop', startHour: 19, endHour: 23 },
    { type: 'Comuns Crab', place: 'Rosemarys Plant Shop', startHour: 0, endHour: 10 },
    { type: 'Cangrejo Vampiro', place: 'Dawns Workshop/Rosemarys Plant Shop', startHour: 8, endHour: 11 },
    { type: 'Tilapia', place: 'Rosemarys Plant Shop', startHour: 0, endHour: 4 },
    // { type: 'default', place: 'default', startHour: 0, endHour: 1 },
    // { type: 'default', place: 'default', startHour: 0, endHour: 1 },
    // { type: 'default', place: 'default', startHour: 0, endHour: 1 },
    // { type: 'default', place: 'default', startHour: 0, endHour: 1 },
    // { type: 'default', place: 'default', startHour: 0, endHour: 1 },
    // { type: 'default', place: 'default', startHour: 0, endHour: 1 },

    
    
    // Agrega más pescados según sea necesario
];

document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.getElementById('timeline');
    const currentHour = new Date().getHours();

    const fishesAvailableNow = fishData.filter(fish => {
        if (fish.startHour < fish.endHour) {
            return currentHour >= fish.startHour && currentHour < fish.endHour;
        } else {
            // Handle overnight fishing times (e.g., 18:00 - 06:00)
            return currentHour >= fish.startHour || currentHour < fish.endHour;
        }
    });

    fishesAvailableNow.forEach(fish => {
        const fishEntry = document.createElement('div');
        fishEntry.className = 'fish-entry';

        const fishTitle = document.createElement('h2');
        fishTitle.textContent = `${fish.type}`;

        const fishDetails = document.createElement('p');
        fishDetails.textContent = `Lugar: ${fish.place} | Hora de pesca: ${fish.startHour}:00 - ${fish.endHour}:00`;

        fishEntry.appendChild(fishTitle);
        fishEntry.appendChild(fishDetails);

        timeline.appendChild(fishEntry);
    });

    if (fishesAvailableNow.length === 0) {
        const noFishMessage = document.createElement('p');
        noFishMessage.className = "noFishMessage";
        noFishMessage.textContent = 'No hay pescados disponibles para pescar en este momento.';
        timeline.appendChild(noFishMessage);
    }
});




document.getElementById('show-all-schedules').addEventListener('click', () => {
    const popup = document.getElementById('schedule-popup');
    const fishSchedules = document.getElementById('fish-schedules');
    
    // Limpiar el contenido anterior
    fishSchedules.innerHTML = '';

    // Agrupar peces por lugar
    const fishByPlace = fishData.reduce((acc, fish) => {
        if (!acc[fish.place]) {
            acc[fish.place] = [];
        }
        acc[fish.place].push(fish);
        return acc;
    }, {});

    // Crear el contenido del popup
    for (const place in fishByPlace) {
        const placeHeader = document.createElement('h3');
        placeHeader.textContent = place;
        fishSchedules.appendChild(placeHeader);

        const fishList = document.createElement('ul');
        fishByPlace[place].forEach(fish => {
            const fishItem = document.createElement('li');
            fishItem.textContent = `${fish.type}: ${fish.startHour}:00 - ${fish.endHour}:00`;
            fishList.appendChild(fishItem);
        });
        fishSchedules.appendChild(fishList);
    }

    // Mostrar el popup y bloquear el scroll del body
    popup.style.display = 'block';
    document.body.style.overflowY = 'hidden';
});

// Ocultar el popup al hacer clic en la "x"
document.getElementById('close-popup').addEventListener('click', () => {
    const popup = document.getElementById('schedule-popup');
    popup.style.display = 'none';
    document.body.style.overflowY = 'auto'; // Rehabilitar el scroll del body
});

// Ocultar el popup al hacer clic fuera de él
window.addEventListener('click', (event) => {
    const popup = document.getElementById('schedule-popup');
    if (event.target == popup) {
        popup.style.display = 'none';
        document.body.style.overflowY = 'auto'; // Rehabilitar el scroll del body
    }
});
