document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias a los elementos del HTML
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const filtros = document.querySelectorAll('.filtro');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (slides.length === 0) return;
 
    let currentIndex = 0; // posición dentro de las slides VISIBLES
 
    // 2. Devuelve solo las slides que no están ocultas por el filtro
    function getVisibleSlides() {
        return slides.filter(slide => !slide.hidden);
    }
 
    // 3. Crear un punto indicador (dot) por cada slide
    const dots = slides.map((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
 
        dot.addEventListener('click', () => {
            currentIndex = getVisibleSlides().indexOf(slide);
            updateCarousel();
        });
 
        dotsContainer.appendChild(dot);
        return dot;
    });
 
    // 4. Función principal: coloca las clases active / prev / next
    function updateCarousel() {
        const visibles = getVisibleSlides();
        const total = visibles.length;
 
        if (total === 0) return;
        if (currentIndex >= total) currentIndex = 0;
 
        slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
 
        visibles[currentIndex].classList.add('active');
        if (total > 1) {
            visibles[(currentIndex + 1) % total].classList.add('next');
        }
        if (total > 2) {
            visibles[(currentIndex - 1 + total) % total].classList.add('prev');
        }
 
        // Cada dot se oculta si su slide está oculta y se marca si es la activa
        slides.forEach((slide, i) => {
            dots[i].hidden = slide.hidden;
            dots[i].classList.toggle('active', slide === visibles[currentIndex]);
        });

        // Si el lightbox está abierto, que muestre la nueva imagen activa
        if (lightbox.classList.contains('active')) {
            abrirLightbox(visibles[currentIndex].querySelector('img'));
        }
    }
 
    // 5. Moverse hacia delante (+1) o hacia atrás (-1)
    function mover(paso) {
        const total = getVisibleSlides().length;
        if (total === 0) return;
        currentIndex = (currentIndex + paso + total) % total;
        updateCarousel();
    }
 
    nextBtn.addEventListener('click', () => mover(1));
    prevBtn.addEventListener('click', () => mover(-1));
 
    // 6. Lightbox (imagen ampliada)
    function abrirLightbox(img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
    }
 
    function cerrarLightbox() {
        lightbox.classList.remove('active');
    }
 
    // 7. Clic en una slide: la activa abre el lightbox, las laterales navegan
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('active')) {
                abrirLightbox(slide.querySelector('img'));
            } else {
                currentIndex = getVisibleSlides().indexOf(slide);
                updateCarousel();
            }
        });
    });
 
    lightbox.addEventListener('click', cerrarLightbox);
 
    // 8. Teclado: Escape cierra, flechas navegan
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowRight') mover(1);
        if (e.key === 'ArrowLeft') mover(-1);
    });
 
    // 9. Filtros por categoría
    function aplicarFiltro(categoria) {
        filtros.forEach(f => f.classList.toggle('active', f.value === categoria));
 
        slides.forEach(slide => {
            slide.hidden = categoria !== 'Todos' && slide.dataset.categoria !== categoria;
        });
 
        currentIndex = 0;
        updateCarousel();
    }
 
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => aplicarFiltro(filtro.value));
    });
 
    // 10. Arranque: usa la categoría de la URL (si viene desde el Index) o "Todos"
    const categoriaURL = new URLSearchParams(window.location.search).get('categoria');
    const existe = Array.from(filtros).some(f => f.value === categoriaURL);
    aplicarFiltro(existe ? categoriaURL : 'Todos');
});