

// Variables y funciones para el manejo del mapa
const pins = document.querySelectorAll('.pin');
const overlay = document.getElementById('overlay');
const pinInfoBox = document.getElementById('pin-info-box');
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

        overlay.style.display = 'block';
        pinInfoBox.style.display = 'block';
        document.body.classList.add('no-scroll');
    });
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    pinInfoBox.style.display = 'none';
    document.body.classList.remove('no-scroll');
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    pinInfoBox.style.display = 'none';
    document.body.classList.remove('no-scroll');
});

