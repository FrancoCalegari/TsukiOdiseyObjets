document.addEventListener('DOMContentLoaded', () => {
    const codes = [
        { text: "TsukiLovesiceCream", date: "2024-06-01", type: "permanente" },
        { text: "YOUROCK", date: "2024-06-06", type: "permanente" },
        { text: "ElMariana", date: "2024-06-11", type: "permanente" },
        { text: "AyorittGift", date: "2024-06-10", type: "temporal" },
        { text: "to30vg7", date: "2024-06-10", type: "temporal" },
        { text: "to28lv9", date: "2024-05-29", type: "temporal" },
        { text: "tsukilovesmate", date: "2024-05-29", type: "temporal" },
        { text: "30KCLUB", date: "2024-05-29", type: "temporal" },
        { text: "314DAY", date: "2024-06-04", type: "temporal" },
        { text: "to18st0", date: "2024-06-04", type: "temporal" },
        { text: "to06pl1", date: "2024-06-10", type: "temporal" },
        { text: "to30cg7", date: "2023-06-10", type: "temporal" },
        { text: "Matsuri23", date: "2023-06-10", type: "temporal" },
        { text: "PARTY", date: "2023-06-10", type: "temporal" },
        { text: "Riversgift", date: "2024-06-12", type: "temporal" },
        { text: "LNY2024", date: "2024-03-10", type: "temporal" },
        { text: "to12fl6", date: "2024-06-13", type: "temporal" },
        { text: "to3dj", date: "2024-06-14", type: "temporal" },
    ];

    const TEMPORAL_DAYS = 4;
    const today = new Date();
    const activeCodesContainer = document.getElementById('active-codes');
    const inactiveCodesContainer = document.getElementById('inactive-codes');
    const popup = document.getElementById('popup');

    function showPopup() {
        popup.classList.add('code-show');
        setTimeout(() => {
            popup.classList.remove('code-show');
        }, 2000);
    }

    function updateRemainingTime() {
        const now = new Date();
        codes.forEach(code => {
            const expirationDate = new Date(code.date);
            if (code.type === "temporal") {
                expirationDate.setDate(expirationDate.getDate() + TEMPORAL_DAYS);
                const difference = expirationDate.getTime() - now.getTime();

                const card = document.getElementById(code.text);
                if (!card) return; // Skip if the card is not found

                const expiraEnElement = card.querySelector('.expira-en');
                const remainingTimeElement = card.querySelector('.remaining-time');
                if (!expiraEnElement || !remainingTimeElement) return; // Skip if the elements are not found

                if (difference > 0) { // Si el código todavía no ha expirado
                    expiraEnElement.textContent = 'Expira en:';
                    if (difference > 86400000) { // Si es mayor a 24 horas
                        const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
                        remainingTimeElement.textContent = `${remainingDays} días`;
                    } else {
                        const remainingHours = Math.floor(difference / (1000 * 60 * 60));
                        const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                        const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
                        remainingTimeElement.textContent = `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
                    }
                } else { // Si el código ha expirado
                    card.classList.add('expired');
                    inactiveCodesContainer.appendChild(card); // Mover el código a la sección de códigos inactivos
                }
            }
        });
    }

    setInterval(updateRemainingTime, 1000); // Actualizar cada segundo

    // Ordenar los códigos por fecha en orden descendente
    codes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Obtener la fecha más reciente
    const mostRecentDate = codes[0].date;

    codes.forEach(code => {
        const issuedDate = new Date(code.date);
        let isActive = false;

        if (code.type === "permanente") {
            isActive = true;
        } else if (code.type === "temporal") {
            const expirationDate = new Date(issuedDate);
            expirationDate.setDate(issuedDate.getDate() + TEMPORAL_DAYS);
            isActive = today <= expirationDate;
        }

        const codeElement = document.createElement('div');
        codeElement.id = code.text; // Usar el código como ID para actualizar el tiempo restante
        codeElement.className = 'code-card';

        // Resaltar el código con la fecha más reciente
        if (code.date === mostRecentDate) {
            codeElement.style.filter = 'drop-shadow(1px 1px 20px #DDD7BD)';
            codeElement.style.transition = '500ms all';
        }

        const codeText = document.createElement('p');
        codeText.textContent = code.text;
        codeElement.appendChild(codeText);

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Emitido: ${issuedDate.toLocaleDateString()}`;
        codeElement.appendChild(releaseDate);

        if (isActive) {
            if (code.type === "temporal") {
                const expiraEn = document.createElement('p');
                expiraEn.className = 'expira-en';
                codeElement.appendChild(expiraEn);

                const remainingTime = document.createElement('p');
                remainingTime.className = 'remaining-time';
                codeElement.appendChild(remainingTime);
            }

            codeElement.addEventListener('click', () => {
                navigator.clipboard.writeText(code.text).then(() => {
                    showPopup();
                });
            });
            activeCodesContainer.appendChild(codeElement);
        } else {
            codeElement.classList.add('expired');
            codeElement.addEventListener('click', () => {
                navigator.clipboard.writeText(code.text).then(() => {
                    showPopup();
                });
            });
            inactiveCodesContainer.appendChild(codeElement);
        }
    });

    updateRemainingTime(); // Initial call to show remaining time immediately
});
