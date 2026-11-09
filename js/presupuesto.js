// VALIDACION DE DATOS DE CONTACTO

// ===== ELEMENTOS =====

const formulario = document.getElementById('form');
const inputPlazoDias = document.getElementById('dias');
const inputPlazoMeses = document.getElementById('meses');
const errorPlazo = document.getElementById('error-plazo');
const productos = document.getElementById('productos');
const extraProtector = document.getElementById('protector');
const extraSoporte = document.getElementById('soporte');
const extraColor = document.getElementById('color');
const total = document.getElementById('total').querySelector('span');
const errorProductos = document.getElementById('error-productos');
const checkEnvio = document.getElementById('envio');
const errorEnvio = document.getElementById('error-envio');

// ===== CAMPOS DE CONTACTO =====

const campos = [
    {
        input: document.getElementById('nombre'),
        error: document.getElementById('error-nombre'),
        regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,15}$/,
        mensaje: 'El nombre debe tener mínimo 2 letras y máximo 15'
    },
    {
        input: document.getElementById('apellidos'),
        error: document.getElementById('error-apellidos'),
        regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,40}$/,
        mensaje: 'Los apellidos deben tener mínimo 2 letras y máximo 40'
    },
    {
        input: document.getElementById('telefono'),
        error: document.getElementById('error-telefono'),
        regex: /^\d{9}$/,
        mensaje: 'El teléfono debe tener 9 dígitos'
    },
    {
        input: document.getElementById('email'),
        error: document.getElementById('error-email'),
        regex: /^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
        mensaje: 'Ingrese un correo electrónico válido, por ejemplo: mmmm.nnn@xxxx.zzz'
    }
];


// FUNCIÓN DE VALIDACION DE DATOS DE CONTACTO
function validarCampo({ input, error, regex, mensaje }, alEnviar = false) {
    const valor = input.value.trim();
    const valido = regex.test(valor);

    if (valor === '' && alEnviar) {
        error.textContent = 'Este campo es obligatorio';
    } else if (valor !== '' && !valido) {
        error.textContent = mensaje;
    } else {
        error.textContent = '';
    }

    return valido;
}

// EVENTO DE VALIDACIÓN DE CAMPOS DE CONTACTO
campos.forEach(campo => {
    campo.input.addEventListener('input', () => validarCampo(campo));
});


// VALIDACIÓN DEL PLAZO EN DÍAS Y MESES
function validarPlazo() {
    const dias = inputPlazoDias.value.trim();
    const diasNum = Number(dias);
    const mesesNum = Number(inputPlazoMeses.value.trim());

    // Limpiamos errores previos
    errorPlazo.textContent = '';

    // Restaurar estado inicial si los meses son menores a 4 o está vacío
    if (mesesNum < 4 || isNaN(mesesNum) || inputPlazoMeses.value.trim() === '') {
        inputPlazoDias.disabled = false;
        inputPlazoDias.placeholder = "min. 7 máx. 30";
    }

    // Validar meses por debajo de 1
    if (inputPlazoMeses.value.trim() !== '' && mesesNum < 1) {
    errorPlazo.textContent = 'El plazo mínimo en meses es de 1';
    return false;
}    
    // Validar meses máximos (12)
    if (mesesNum > 12) {
        errorPlazo.textContent = 'El plazo máximo en meses es de 12';
        return false;
    }

    // Si los meses son igual o mayor a 4, desactivamos los días
    if (mesesNum >= 4) {
        inputPlazoDias.placeholder = "";
        inputPlazoDias.disabled = true;
        inputPlazoDias.value = "";
        return true;
    }

    // Si hay de 1 a 3 meses, permitimos ignorar los días y borramos cualquier error previo
    if (mesesNum >= 1 && mesesNum <= 3) {
        return true;
    }

    // VALIDAR DÍAS (solo si no se usan meses >= 4)
    if (dias === '' || diasNum < 7) {
        errorPlazo.textContent = 'El plazo mínimo es de 7 días';
        return false;
    }

    if (diasNum > 30) {
        errorPlazo.textContent = 'El plazo máximo en días es de 30';
        return false;
    }

    // Limpiar errores si todo está bien
    errorPlazo.textContent = '';
    return true;
}

// Convertir plazo de días (30) a meses
function convertirDiasAMeses() {
    if (Number(inputPlazoDias.value) === 30) {
        inputPlazoMeses.value = Number(inputPlazoMeses.value) + 1;
        inputPlazoDias.value = '';
    }
}

function soloEnteros(e) {
    if (e.target.value.includes('.') || e.target.value.includes(',')) {
        e.target.value = parseInt(e.target.value) || '';
    }
}

// VALIDACIÓN DEL PRODUCTO SELECCIONADO
function validarProducto() {
    if (productos.value === '') {
        errorProductos.textContent = 'Debe elegir un producto';
        return false;
    } else {
        errorProductos.textContent = '';
        return true;
    }
}

// VALIDACIÓN DE LAS CONDICIONES DE ENVÍO
function validarEnvio() {
    if (checkEnvio.checked) {
        errorEnvio.textContent = '';
        return true;
    } else {
        errorEnvio.textContent = 'Debe aceptar las condiciones de envío';
        return false;
    }
}

/* CALCULO DEL PRESUPUESTO */

function calcularPresupuesto() {
    const producto = Number(productos.value);
    const plazoMeses = Math.min(Number(inputPlazoMeses.value), 12);  // Limita a un máximo de 12 meses
    let descuento = 0  // En porcentaje
    
    // 5% por cada mes a partir del tercero, con un máximo del 50%
    for (let i=3; i <= plazoMeses; i++) {
        descuento += 5; // 5% de descuento inicial a partir del 3 mes y sumando 5% cada mes del precio del producto
    }
    
    // Aplicar extras
    let extras = 0;
    
    if (extraProtector.checked) {
        extras += 20;
    }
    if (extraSoporte.checked) {
        extras += 40;
    }
    if (extraColor.checked) {
        extras += 50;
    }
    
    const totalPresupuesto = producto - producto * (descuento / 100) + extras;
    total.textContent = `${totalPresupuesto.toFixed(2)} €`;

    if (producto === 0) {
        total.textContent = '0.00 €';
        return;
    }
}

// RESET DEL FORMULARIO
function resetFormulario() {
    formulario.reset();
    document.querySelectorAll('span.error').forEach(span => span.textContent = '');
    inputPlazoDias.disabled = false;
    inputPlazoDias.placeholder = 'min. 7 máx. 30';
    calcularPresupuesto();
}

// EVENTOS DE LOS CAMPOS DEL FORMULARIO
inputPlazoDias.addEventListener('input', soloEnteros);
inputPlazoMeses.addEventListener('input', soloEnteros);
inputPlazoDias.addEventListener('input', convertirDiasAMeses);
inputPlazoDias.addEventListener('input', validarPlazo);
inputPlazoMeses.addEventListener('input', validarPlazo);
inputPlazoDias.addEventListener('input', calcularPresupuesto);
inputPlazoMeses.addEventListener('input', calcularPresupuesto);

productos.addEventListener('change', calcularPresupuesto);
extraProtector.addEventListener('change', calcularPresupuesto);
extraSoporte.addEventListener('change', calcularPresupuesto);
extraColor.addEventListener('change', calcularPresupuesto);

productos.addEventListener('change', validarProducto);

checkEnvio.addEventListener('change', validarEnvio);

document.getElementById('btn-reset').addEventListener('click', resetFormulario);


// COMPROBACION FINAL Y ENVIO DEL FORMULARIO
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    let todoCorrecto = true;

    // Revisión de Datos de contacto (true = estamos enviando, los vacíos muestran error)
    for (let i = 0; i < campos.length; i++) {
        const esValido = validarCampo(campos[i], true);

        // Si alguno falla, apuntamos que hay un error
        if (esValido === false) {
            todoCorrecto = false;
        }
    }

    // Revisión del plazo de entrega
    const plazoOk = validarPlazo();
    if (plazoOk === false) {
        todoCorrecto = false;
    }

    // Revisión del producto seleccionado
    const productoOk = validarProducto();
    if (productoOk === false) {
        todoCorrecto = false;
    }

    // Revisión de las condiciones de envío
    const envioOk = validarEnvio();
    if (envioOk === false) {
        todoCorrecto = false;
    }

    // Envio del formulario si todo es correcto
    if (todoCorrecto) {
        alert('Formulario enviado con éxito, muchas gracias');
        formulario.submit();
    } else {
        alert('Formulario inválido, revise los campos obligatorios');
    }
});