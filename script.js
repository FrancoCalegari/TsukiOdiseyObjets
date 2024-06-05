document.addEventListener('DOMContentLoaded', () => {
    const itemListContainer = document.getElementById('itemListContainer');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const filterButton = document.getElementById('filterButton');

    function csvToArray(str, delimiter = ",") {
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter).map(header => header.trim());
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");

        const items = rows.map(row => {
            const values = row.split(delimiter).map(value => value.trim());
            if (values.length !== headers.length || values.includes('')) {
                return null;
            }
            const item = headers.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return item;
        }).filter(item => item !== null);

        return items;
    }

    function renderItemsByCategory(itemsToRender) {
        const categories = [...new Set(itemsToRender.map(item => item.category))];
        itemListContainer.innerHTML = '';
    
        categories.forEach(category => {
            const section = document.createElement('section');
            section.classList.add('category-section');
            section.innerHTML = `<div class="categoria-titulo"><h2>${category}</h2></div>`;
            const itemList = document.createElement('div');
            itemList.classList.add('item-list');
    
            const itemsInCategory = itemsToRender.filter(item => item.category === category);
            itemsInCategory.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item', 'fade-in');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price"><img src="https://cdn-icons-png.flaticon.com/512/2556/2556893.png" style="width: 20px; height: fit-content; border-radius: 1px; padding: 0; margin: 0; background-color: transparent; border-radius: 0;">${item.price}</div>
                        <div class="item-category">Categoría: ${item.category}</div>
                        <div class="item-rarity">Rareza: ${item.rarity}</div>
                        <div class="more-info">${item.description}</div>
                    </div>
                `;
    
                // Agregar clase de rareza para asignar el color de fondo
                switch (item.rarity.toLowerCase()) {
                    case 'común':
                        itemElement.classList.add('common');
                        break;
                    case 'raro':
                        itemElement.classList.add('rare');
                        break;
                    case 'legendario':
                        itemElement.classList.add('legendary');
                        break;
                    default:
                        break;
                }
    
                itemElement.addEventListener('click', () => {
                    itemElement.classList.toggle('active');
                });
                itemList.appendChild(itemElement);
            });
    
            section.appendChild(itemList);
            itemListContainer.appendChild(section);
        });
    }
    

    function fetchItems() {
        fetch('items.csv')
            .then(response => response.text())
            .then(data => {
                const items = csvToArray(data);
                renderItemsByCategory(items);

                searchInput.addEventListener('input', () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
                    renderItemsByCategory(filteredItems);
                });

                filterButton.addEventListener('click', () => {
                    const filterTerm = filterSelect.value;
                    const filteredItems = items.filter(item => item.category.toLowerCase().includes(filterTerm.toLowerCase()) || item.rarity.toLowerCase().includes(filterTerm.toLowerCase()));
                    renderItemsByCategory(filteredItems);
                });
            })
            .catch(error => console.error('Error al cargar el archivo CSV:', error));
    }

    fetchItems();
});

document.addEventListener('DOMContentLoaded', () => {
    const pins = document.querySelectorAll('.pin');
    const infoBox = document.getElementById('pin-info-box');
    const overlay = document.getElementById('overlay');
    const pinTitle = document.getElementById('pin-title');
    const pinDescription = document.getElementById('pin-description');
    const commonFishList = document.getElementById('common-fish-list');
    const legendaryFishList = document.getElementById('legendary-fish-list');
    const closeBtn = document.querySelector('.close-btn');

    pins.forEach(pin => {
        pin.addEventListener('click', () => {
            const title = pin.getAttribute('data-title');
            const description = pin.getAttribute('data-description');
            const commonFish = pin.getAttribute('data-common-fish').split(', ');
            const legendaryFish = pin.getAttribute('data-legendary-fish').split(', ');

            pinTitle.textContent = title;
            pinDescription.textContent = description;

            commonFishList.innerHTML = '';
            legendaryFishList.innerHTML = '';

            commonFish.forEach(fish => {
                const li = document.createElement('li');
                li.textContent = fish;
                commonFishList.appendChild(li);
            });

            legendaryFish.forEach(fish => {
                const li = document.createElement('li');
                li.textContent = fish;
                legendaryFishList.appendChild(li);
            });

            infoBox.style.display = 'block';
            overlay.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        infoBox.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        infoBox.style.display = 'none';
        overlay.style.display = 'none';
    });
});