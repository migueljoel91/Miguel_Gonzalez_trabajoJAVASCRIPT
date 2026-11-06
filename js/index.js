// CAMBIO DE TEMA CLARO / OSCURO
const botonTema = document.getElementById('tema');

function aplicarTema(tema) {
    document.documentElement.dataset.tema = tema;
    botonTema.textContent = tema === 'claro' ? '🌙 ' : '☀️ ';
    localStorage.setItem('tema', tema);   // recuerda la elección al recargar
}

// Al cargar la página, usa el tema guardado (o el oscuro por defecto)
aplicarTema(localStorage.getItem('tema') || 'oscuro');

botonTema.addEventListener('click', () => {
    const temaActual = document.documentElement.dataset.tema;
    aplicarTema(temaActual === 'claro' ? 'oscuro' : 'claro');
});