const galeriaContainer = document.getElementById('galeria-container');
const tarjetas = document.querySelectorAll('.tarjeta');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let index = 0;
const totalTarjetas = tarjetas.length;

function mostrarTarjeta(index) {
    const tarjetaWidth = tarjetas[0].offsetWidth + 20; // 20 is the margin
    const offset = index * tarjetaWidth - (galeriaContainer.clientWidth - tarjetaWidth) / 2;
    galeriaContainer.scroll({
        left: offset,
        behavior: 'smooth'
    });
    actualizarFoco();
}

function siguienteTarjeta() {
    index = (index + 1) % totalTarjetas;
    mostrarTarjeta(index);
}

function anteriorTarjeta() {
    index = (index - 1 + totalTarjetas) % totalTarjetas;
    mostrarTarjeta(index);
}

function actualizarFoco() {
    tarjetas.forEach((tarjeta, idx) => {
        if (idx === index) {
            tarjeta.style.filter = 'drop-shadow(1px 1px 20px #DDD7BD)';
        } else {
            tarjeta.style.filter = 'none';
        }
    });
}

prevButton.addEventListener('click', anteriorTarjeta);
nextButton.addEventListener('click', siguienteTarjeta);

setInterval(siguienteTarjeta, 7000); // Cambiar cada 10 segundos

// Inicializar
mostrarTarjeta(index);
