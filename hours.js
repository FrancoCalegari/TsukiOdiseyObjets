const reloj = document.getElementById('reloj');
const botonToggle = document.getElementById('toggleFormato');
let formato24Horas = true;

// Cargar configuración del formato desde el cache del navegador
if (localStorage.getItem('formato24Horas') !== null) {
    formato24Horas = JSON.parse(localStorage.getItem('formato24Horas'));
}

// Actualizar el texto del botón según el formato actual
function actualizarTextoBoton() {
    if (formato24Horas) {
        botonToggle.textContent = 'AM/PM';
    } else {
        botonToggle.textContent = '24hs';
    }
}

function actualizarHora() {
    const ahora = new Date();
    let horas = ahora.getHours();
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    let periodo = '';

    if (!formato24Horas) {
        periodo = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12;
        horas = horas ? horas : 12; // El 0 se convierte en 12
    }
    horas = String(horas).padStart(2, '0');

    reloj.textContent = `${horas}:${minutos} ${periodo}`;
}

botonToggle.addEventListener('click', () => {
    formato24Horas = !formato24Horas;
    localStorage.setItem('formato24Horas', JSON.stringify(formato24Horas));
    actualizarTextoBoton();
    actualizarHora();
});

setInterval(actualizarHora, 1000);
actualizarTextoBoton();
actualizarHora(); // Llamada inicial para mostrar la hora inmediatamente
