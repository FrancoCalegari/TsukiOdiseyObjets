document.addEventListener('DOMContentLoaded', () => {
    const codes = [
        { text: "TsukiLovesiceCream", date: "2024-06-01", type: "temporal" },
        { text: "YOUROCK", date: "2024-06-06", type: "expired" },
        { text: "ElMariana", date: "2024-06-11", type: "expired" },
        { text: "AyorittGift", date: "2024-06-10", type: "temporal" },
        { text: "to30vg7", date: "2024-06-10", type: "temporal" },
        { text: "to28lv9", date: "2024-05-29", type: "temporal" },
        { text: "tsukilovesmate", date: "2024-05-29", type: "temporal" },
        { text: "30KCLUB", date: "2024-05-29", type: "expired" },
        { text: "314DAY", date: "2024-06-04", type: "temporal" },
        { text: "to18st0", date: "2024-06-04", type: "temporal" },
        { text: "to06pl1", date: "2024-06-10", type: "temporal" },
        { text: "to30cg7", date: "2023-06-10", type: "temporal" },
        { text: "Matsuri23", date: "2023-06-10", type: "temporal" },
        { text: "PARTY", date: "2023-06-10", type: "temporal" },
        { text: "Riversgift", date: "2024-06-12", type: "temporal" },
        { text: "LNY2024", date: "2024-03-10", type: "temporal" },
        { text: "to12fl6", date: "2024-06-13", type: "expired" },
        { text: "to3dj", date: "2024-06-14", type: "expired" },
        { text: "HUGYOURDAD24", date: "2024-06-16", type: "expired" },
    ];

    const TEMPORAL_DAYS = 3;
    const today = new Date();
    const activeCodesContainer = document.getElementById('active-codes');
    const inactiveCodesContainer = document.getElementById('inactive-codes');
    const toggleInactiveButton = document.getElementById('toggle-inactive');
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

    const inactiveCodes = [];
    let hasActiveCodes = false;

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
            codeElement.style.filter = 'drop-shadow(1px 1px 30px #cab65e)';
            codeElement.style.transition = '500ms all';
            codeElement.style.border = 'solid 3px #efcd36';
        }

        const codeText = document.createElement('p');
        codeText.textContent = code.text;
        codeElement.appendChild(codeText);

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Emitido: ${issuedDate.toLocaleDateString()}`;
        codeElement.appendChild(releaseDate);

        if (isActive) {
            hasActiveCodes = true;
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
            inactiveCodes.push(codeElement);
        }
    });

    if (!hasActiveCodes) {
        const noActiveCodesMessage = document.createElement('p');
        noActiveCodesMessage.textContent = "No hay códigos activos por el momento :(";
        activeCodesContainer.appendChild(noActiveCodesMessage);
    }

    // Mostrar los primeros 4 códigos inactivos
    inactiveCodes.slice(0, 4).forEach(codeElement => {
        inactiveCodesContainer.appendChild(codeElement);
    });

    // Mostrar botón si hay más de 4 códigos inactivos
    if (inactiveCodes.length > 4) {
        toggleInactiveButton.classList.remove('hidden');
        let showingMore = false;

        toggleInactiveButton.addEventListener('click', () => {
            if (showingMore) {
                // Ocultar los códigos inactivos extras
                inactiveCodes.slice(4).forEach(codeElement => {
                    codeElement.style.display = 'none';
                });
                toggleInactiveButton.textContent = 'Mostrar más';
            } else {
                // Mostrar los códigos inactivos extras
                inactiveCodes.slice(4).forEach(codeElement => {
                    inactiveCodesContainer.appendChild(codeElement);
                    codeElement.style.display = 'block';
                });
                toggleInactiveButton.textContent = 'Mostrar menos';
            }
            showingMore = !showingMore;
        });
    }

    updateRemainingTime(); // Initial call to show remaining time immediately

    //// Verificar si el navegador soporta notificaciones
    if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones de escritorio.");
    } else {
        document.getElementById('enable-notifications').addEventListener('click', function() {
            // Solicitar permiso para enviar notificaciones
            Notification.requestPermission().then(function(result) {
                if (result === 'granted') {
                    // Permiso concedido
                    console.log("Permiso para notificaciones concedido.");
                    verificarNuevosCodigos(); // Ejecutar la verificación al habilitar notificaciones
                }
            });
        });
    }

    // Función para mostrar una notificación
    function mostrarNotificacion(titulo, mensaje, url) {
        if (Notification.permission === 'granted') {
            const opciones = {
                body: mensaje,
                icon: 'https://tsuki-odisey-objets.vercel.app/assets/img/Logo.png', // Puedes agregar un ícono de tu elección
                data: { url: url }
            };
            const notificacion = new Notification(titulo, opciones);
            notificacion.onclick = function() {
                window.open(notificacion.data.url);
            };
        }
    }

    // Función para contar códigos válidos (no expirados)
    function contarCodigos() {
        return codes.filter(code => code.type !== 'expired').length;
    }

    // Almacenar la cantidad inicial de códigos válidos
    if (!localStorage.getItem('cantidadCodigos')) {
        localStorage.setItem('cantidadCodigos', contarCodigos());
    }

    // Función para verificar si hay nuevos códigos
    function verificarNuevosCodigos() {
        const cantidadGuardada = parseInt(localStorage.getItem('cantidadCodigos'), 10);
        const cantidadActual = contarCodigos();

        // Log en consola las variables del caché y las actuales
        console.log(`Cantidad de códigos guardada en caché: ${cantidadGuardada}`);
        console.log(`Cantidad de códigos actual en la página: ${cantidadActual}`);

        if (cantidadActual > cantidadGuardada) {
            const titulo = "¡Nuevo Código de Tsuki :D!";
            const mensaje = `Hay ${cantidadActual - cantidadGuardada} nuevos códigos de canje disponibles.`;
            const url = "https://tsuki-odisey-objets.vercel.app/";
            mostrarNotificacion(titulo, mensaje, url);
            localStorage.setItem('cantidadCodigos', cantidadActual);
        } else if (cantidadActual < cantidadGuardada) {
            localStorage.setItem('cantidadCodigos', cantidadActual);
        }
    }

    // Verificar nuevos códigos cada 10 segundos
    setInterval(verificarNuevosCodigos, 10000);
});
