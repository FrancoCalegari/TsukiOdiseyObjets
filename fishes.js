const fishData = [
    { type: 'Ajolote', place: 'Rosemarys Plant Shop', startHour: 2, endHour: 7 },
    { type: 'Tiburón Anillado', place: 'Rosemarys Plant Shop', startHour: 18, endHour: 23 },
    { type: 'Lengüeta', place: 'Rosemarys Plant Shop', startHour: 2, endHour: 3 },
    { type: 'Barracuda', place: 'Mermaid Coast/Muelle', startHour: 17, endHour: 21 },
    { type: 'Espiga azul', place: 'Mermaid Coast/Muelle', startHour: 18, endHour: 19 },
    { type: 'Pez Gato', place: 'Dawns Workshop', startHour: 8, endHour: 11 },
    { type: 'Pez Payaso padre', place: 'Dawns Workshop', startHour: 1, endHour: 5 },
    { type: 'Pez payaso', place: 'Mermaid Coast/Muelle', startHour: 12, endHour: 16 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    { type: 'default', place: 'default', startHour: 8, endHour: 11 },
    
    
    
    
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
