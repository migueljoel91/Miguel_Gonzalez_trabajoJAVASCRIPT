document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias a los elementos del HTML
    const diapositivas = Array.from(document.querySelectorAll('.carousel-slide'));
    const botonAnterior = document.getElementById('prevBtn');
    const botonSiguiente = document.getElementById('nextBtn');
    const contenedorPuntos = document.getElementById('carouselDots');
    const filtros = document.querySelectorAll('.filtro');
    const visor = document.getElementById('lightbox');
    const imagenVisor = document.getElementById('lightbox-img');

    if (diapositivas.length === 0) return;

    let indiceActual = 0; // posición dentro de las diapositivas VISIBLES

    // 2. Devuelve solo las diapositivas que no están ocultas por el filtro
    function obtenerDiapositivasVisibles() {
        return diapositivas.filter((diapositiva) => !diapositiva.hidden);
    }

    // 3. Crear un punto indicador por cada diapositiva
    const puntos = diapositivas.map((diapositiva, indice) => {
        const punto = document.createElement('button');
        punto.type = 'button';
        punto.className = 'dot';
        punto.setAttribute('aria-label', `Ir a la imagen ${indice + 1}`);

        punto.addEventListener('click', () => {
            indiceActual = obtenerDiapositivasVisibles().indexOf(diapositiva);
            actualizarCarrusel();
        });

        contenedorPuntos.appendChild(punto);
        return punto;
    });

    // 4. Función principal: coloca las clases active / prev / next
    function actualizarCarrusel() {
        const visibles = obtenerDiapositivasVisibles();
        const total = visibles.length;

        if (total === 0) return;
        if (indiceActual >= total) indiceActual = 0;

        diapositivas.forEach((diapositiva) => diapositiva.classList.remove('active', 'prev', 'next'));

        // ¿Estamos en modo tarjeta? Basta con mirar la primera diapositiva
        const modoTarjetas = diapositivas[0].classList.contains('tarjeta-modo');

        // Solo en modo carrusel se colocan active / prev / next
        if (!modoTarjetas) {
            visibles[indiceActual].classList.add('active');
            if (total > 1) {
                visibles[(indiceActual + 1) % total].classList.add('next');
            }
            if (total > 2) {
                visibles[(indiceActual - 1 + total) % total].classList.add('prev');
            }
        }

        // Cada punto se oculta si su diapositiva está oculta y se marca si es la activa
        diapositivas.forEach((diapositiva, i) => {
            puntos[i].hidden = diapositiva.hidden;
            puntos[i].classList.toggle('active', diapositiva === visibles[indiceActual]);
        });

        // Si el visor está abierto, que muestre la nueva imagen activa
        if (visor.classList.contains('active')) {
            abrirVisor(visibles[indiceActual].querySelector('img'));
        }
    }

    // 5. Moverse hacia delante (+1) o hacia atrás (-1)
    function mover(paso) {
        const total = obtenerDiapositivasVisibles().length;
        if (total === 0) return;
        indiceActual = (indiceActual + paso + total) % total;
        actualizarCarrusel();
    }

    botonSiguiente.addEventListener('click', () => mover(1));
    botonAnterior.addEventListener('click', () => mover(-1));

    // 6. Visor de imagen ampliada (lightbox)
    function abrirVisor(imagen) {
        imagenVisor.src = imagen.src;
        imagenVisor.alt = imagen.alt;
        visor.classList.add('active');
    }

    function cerrarVisor() {
        visor.classList.remove('active');
    }

    // 7. Clic en una diapositiva: la activa abre el visor, las laterales navegan
    diapositivas.forEach((diapositiva) => {
        diapositiva.addEventListener('click', () => {
            // Si esta en modo tarjeta, solo abre el visor
            if (diapositiva.classList.contains('tarjeta-modo')) {
                indiceActual = obtenerDiapositivasVisibles().indexOf(diapositiva);
                abrirVisor(diapositiva.querySelector('img'));
                return;
            }
            // Modo carrusel: la activa abre el visor, las laterales navegan
            if (diapositiva.classList.contains('active')) {
                abrirVisor(diapositiva.querySelector('img'));
            } else {
                indiceActual = obtenerDiapositivasVisibles().indexOf(diapositiva);
                actualizarCarrusel();
            }
        });
    });

    visor.addEventListener('click', cerrarVisor);

    // 8. Teclado: Escape cierra, flechas navegan
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') cerrarVisor();
        if (evento.key === 'ArrowRight') mover(1);
        if (evento.key === 'ArrowLeft') mover(-1);
    });

    // 9. Filtros por categoría
    function aplicarFiltro(categoria) {
        filtros.forEach((boton) => boton.classList.toggle('active', boton.value === categoria));

        diapositivas.forEach((diapositiva) => {
            diapositiva.hidden = categoria !== 'Todos' && diapositiva.dataset.categoria !== categoria;
        });

        indiceActual = 0;
        actualizarCarrusel();
    }

    filtros.forEach((filtro) => {
        filtro.addEventListener('click', () => aplicarFiltro(filtro.value));
    });

    // 10. Arranque: usa la categoría de la URL (si viene desde el Index) o "Todos"
    const categoriaUrl = new URLSearchParams(window.location.search).get('categoria');
    const existe = Array.from(filtros).some((boton) => boton.value === categoriaUrl);
    aplicarFiltro(existe ? categoriaUrl : 'Todos');

    // 11. Cambiar entre modo carrusel y modo tarjetas
    const botonCambiarModo = document.getElementById('cambiar-modo');

    botonCambiarModo.addEventListener('click', () => {
        if (botonCambiarModo.textContent.trim() === 'Modo tarjeta') {
            botonCambiarModo.textContent = 'Modo carrusel';
        } else {
            botonCambiarModo.textContent = 'Modo tarjeta';
        }
        cambiarModo();
    });

    function cambiarModo() {
        const contenedor = document.getElementById('carousel-container');
        const contenedorDiapositivas = document.getElementById('carousel-track');
        const tarjetas = Array.from(contenedorDiapositivas.children);

        contenedor.classList.toggle('carousel-container');
        contenedorDiapositivas.classList.toggle('carousel-track');
        contenedorDiapositivas.classList.toggle('tarjetas-track');

        tarjetas.forEach((tarjeta) => {
            tarjeta.classList.toggle('carousel-slide');
            tarjeta.classList.toggle('tarjeta-modo');
            tarjeta.classList.remove('active', 'next', 'prev');
        });

        // ¿En qué modo estamos ahora?
        const modoTarjetas = contenedorDiapositivas.classList.contains('tarjetas-track');

        // Flechas y puntos: ocultos en tarjetas, visibles en carrusel
        const display = modoTarjetas ? 'none' : '';
        botonAnterior.style.display = display;
        botonSiguiente.style.display = display;
        contenedorPuntos.style.display = display;

        // Al volver al carrusel, recolocar active / prev / next
        if (!modoTarjetas) {
            actualizarCarrusel();
        }
    }
});
