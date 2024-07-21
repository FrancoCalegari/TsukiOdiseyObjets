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
            loadCombinations();
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

    container.addEventListener('scroll', () => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight && loadedCount < combinations.length) {
            loadCombinations();
        }
    });

    if (combinations.length > 5) {
        container.style.overflowY = 'auto';
    }
});
