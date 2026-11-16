async function cargarNoticias() {
    const contenedor = document.querySelector('#noticias .news-container');

    try {
        // 1. Pedimos el archivo JSON y esperamos la respuesta
        const response = await fetch('./data/noticias.json');

        // 2. Si el archivo no existe o falla, lanzamos un error
        if (!response.ok) {
            throw new Error('No se pudo cargar el JSON');
        }

        // 3. Convertimos el texto del JSON en un objeto de JavaScript
        const data = await response.json();

        // 4. Recorremos el array de noticias y montamos el HTML
        let contenido = '';

        data.noticias.forEach((noticia) => {
            contenido += `
                <article class="noticia">
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                    <span class="categoria">${noticia.categoria}</span>
                    <div class="contenido-noticia">
                        <h3>${noticia.titulo}</h3>
                        <time datetime="${noticia.fecha}">${noticia.fecha}</time>
                        <div class="texto-noticia">
                            <p>${noticia.resumen}</p>
                            <p>${noticia.contenido}</p>
                        </div>
                    </div>
                    <div class="botones-noticia">
                        <button type="button" class="leer-mas">Leer más</button>
                    </div>
                </article>
            `;
        });

        // 5. Pintamos todas las noticias de una vez
        contenedor.innerHTML = contenido;

        // 6. Añadimos los event listeners a los botones "Leer más" para expandir o contraer la noticia
        const botonesLeerMas = contenedor.querySelectorAll('.leer-mas');

        botonesLeerMas.forEach((boton) => {
            boton.addEventListener('click', () => {
                const noticia = boton.closest('.noticia');
                noticia.classList.toggle('abierta');
                if (noticia.classList.contains('abierta')) {
                    boton.textContent = 'Leer menos';
                } else {
                    boton.textContent = 'Leer más';
                }
            });
        });
    } catch (error) {
        // Si algo falla, lo mostramos en consola y avisamos en la página
        console.error(error);
        contenedor.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
    }
}

// Llamamos a la función para que se ejecute
cargarNoticias();
