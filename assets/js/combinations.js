document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.combination-container');
    let loadedCount = 0;
    const loadLimit = 8;
    let combinations = [];

    // Función para cargar combinaciones desde el archivo JSON
    const loadCombinationsFromFile = async () => {
        try {
            const response = await fetch('assets/js/database/combinations.json');
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status} ${response.statusText}`);
            }
            combinations = await response.json();
            loadCombinations(); // Cargar las primeras combinaciones al inicio
        } catch (error) {
            console.error('Error loading combinations:', error.message);
        }
    };

    const loadCombinations = () => {
        const toLoad = combinations.slice(loadedCount, loadedCount + loadLimit);
        toLoad.forEach(combination => {
            const combinationDiv = document.createElement('div');
            combinationDiv.classList.add('combination');

            combination.objets.forEach((object, index) => {
                const objectContainer = document.createElement('div');
                objectContainer.classList.add('object-container');

                const img = document.createElement('img');
                img.src = object;
                img.alt = `Object ${index + 1}`;
                objectContainer.appendChild(img);

                combinationDiv.appendChild(objectContainer);

                if (index < combination.objets.length - 1) {
                    const plusSign = document.createElement('span');
                    plusSign.textContent = '+';
                    combinationDiv.appendChild(plusSign);
                }
            });

            const equalsSign = document.createElement('span');
            equalsSign.textContent = '=';
            combinationDiv.appendChild(equalsSign);

            const resultContainer = document.createElement('div');
            resultContainer.classList.add('object-container');

            const result = document.createElement('img');
            result.src = combination.result;
            result.alt = 'Result';
            resultContainer.appendChild(result);

            combinationDiv.appendChild(resultContainer);

            container.appendChild(combinationDiv);
        });

        loadedCount += loadLimit;
    };

    // Cargar combinaciones al inicio
    loadCombinationsFromFile();

    // Detectar el evento de desplazamiento
    const handleScroll = () => {
        // Añadir un margen de 100 píxeles para detectar el final
        const margin = 100;
        if (container.scrollTop + container.clientHeight + margin >= container.scrollHeight && loadedCount < combinations.length) {
            loadCombinations();
        }
    };

    container.addEventListener('scroll', handleScroll);

    // Detectar cambios en la orientación de la pantalla y ajustar el estilo
    window.addEventListener('resize', () => {
        // Asegúrate de que el contenedor tenga suficiente altura para el desplazamiento
        if (window.innerWidth <= 768) { // Ajustar según sea necesario para dispositivos móviles
            container.style.maxHeight = '80vh'; // Ajusta la altura máxima según tus necesidades
        } else {
            container.style.maxHeight = 'none';
        }
    });

    // Llama a resize para establecer el estilo inicial
    window.dispatchEvent(new Event('resize'));
});
