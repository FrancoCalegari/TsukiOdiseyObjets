document.addEventListener('DOMContentLoaded', () => {
    const codes = [
        { text: "TsukiLovesiceCream", date: "2024-06-07", type: "permanente" },
        { text: "yourock", date: "2024-06-06", type: "permanente" },
        { text: "ElMariana", date: "2024-06-04", type: "temporal" },
        { text: "AyorittGift", date: "2024-06-9", type: "temporal" },
        { text: "to30vg7", date: "2024-05-30", type: "temporal" },
        { text: "to28lv9", date: "2024-05-29", type: "permanente" },
        { text: "tsukilovesmate", date: "2024-05-29", type: "permanente" },
        { text: "30KCLUB", date: "2024-05-29", type: "permanente" },
        { text: "314DAY", date: "2024-06-04", type: "permanente" },
        { text: "to18st0", date: "2024-06-04", type: "permanente" },
        { text: "vegeta777", date: "2024-06-04", type: "temporal" },
    ];

    const TEMPORAL_DAYS = 1;
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

                const remainingTimeElement = card.querySelector('.remaining-time');
                if (!remainingTimeElement) return; // Skip if the remaining time element is not found

                if (difference > 0) { // Si el código todavía no ha expirado
                    if (difference > 86400000) { // Si es mayor a 24 horas
                        const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
                        remainingTimeElement.textContent = `Tiempo restante: ${remainingDays} días`;
                    } else {
                        const remainingHours = Math.floor(difference / (1000 * 60 * 60));
                        const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                        const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
                        remainingTimeElement.textContent = `Tiempo restante: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
                    }
                } else { // Si el código ha expirado
                    card.classList.add('expired');
                    inactiveCodesContainer.appendChild(card); // Mover el código a la sección de códigos inactivos
                }
            }
        });
    }

    setInterval(updateRemainingTime, 1000); // Actualizar cada segundo

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

        const codeText = document.createElement('p');
        codeText.textContent = code.text;
        codeElement.appendChild(codeText);

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Emitido: ${issuedDate.toLocaleDateString()}`;
        codeElement.appendChild(releaseDate);

        if (isActive) {
            if (code.type === "temporal") {
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