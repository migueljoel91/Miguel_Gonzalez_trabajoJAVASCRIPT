// LÓGICA PARA EL LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const productos = document.querySelectorAll('.producto');

productos.forEach(producto => {
    producto.addEventListener('click', () => {
        const img = producto.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
    });
});

// Cerrar al hacer clic en cualquier parte de la capa
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// LÓGICA PARA LOS BOTONES DE FILTRO
const filtros = document.querySelectorAll('.filtro');

filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        filtros.forEach(f => f.classList.remove('active'));
        filtro.classList.add('active');

        const categoria = filtro.value;
        productos.forEach(producto => {
            if (categoria === 'Todos' || producto.dataset.categoria === categoria) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

// REDIRECCIONAR LOS PRODUCTOS DESTACADOS DEL INDEX A LOS FILTROS DE LA GALERIA
const categoriaURL = new URLSearchParams(window.location.search).get('categoria');

filtros.forEach(filtro => {
    if (filtro.value === categoriaURL) {
        filtro.click();
    }
});