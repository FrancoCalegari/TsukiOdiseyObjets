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
                itemElement.classList.add('item');
                itemElement.innerHTML = `
                
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">${item.price}</div>
                        <div class="item-category">Categoría: ${item.category}</div>
                        <div class="item-rarity">Rareza: ${item.rarity}</div>
                        <div class="more-info">${item.description}</div>
                    </div>
                
                `;
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
