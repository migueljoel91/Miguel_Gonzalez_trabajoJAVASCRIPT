// VALIDACION DE DATOS DE CONTACTO
const formulario = document.getElementById('form');

// PATTERN PARA VALIDACION DE CAMPOS
const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,15}$/;
const REGEX_APELLIDOS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,40}$/;
const REGEX_TELEFONO = /^\d{9}$/;
const REGEX_EMAIL = /^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

// ELEMENTOS DEL FORMULARIO
const inputNombre = document.getElementById('nombre');
const inputApellidos = document.getElementById('apellidos');
const inputTelefono = document.getElementById('telefono');
const inputEmail = document.getElementById('email');
const inputPlazoDias = document.getElementById('dias');
const inputPlazoMeses = document.getElementById('meses');


const errorNombre = document.getElementById('error-nombre');
const errorApellidos = document.getElementById('error-apellidos');
const errorTelefono = document.getElementById('error-telefono');
const errorEmail = document.getElementById('error-email');
const errorPlazo = document.getElementById('error-plazo');


// FUNCIONES DE VALIDACION
function validarNombre() {
    const nombre = inputNombre.value.trim();

    if (nombre === '') {
        inputNombre.classList.remove('error');
        errorNombre.textContent = '';
        return false;
    }

    if (!REGEX_NOMBRE.test(nombre)) {
        inputNombre.classList.add('error');
        errorNombre.textContent = 'El nombre debe tener mínimo 2 letras y máximo 15';
        return false;
    } 

    inputNombre.classList.remove('error');
    errorNombre.textContent = '';
    return true;
}

function validarApellidos() {
    const apellidos = inputApellidos.value.trim();

    if (apellidos === '') {
        inputApellidos.classList.remove('error');
        errorApellidos.textContent = '';
        return false;
    }

    if (!REGEX_APELLIDOS.test(apellidos)) {
        inputApellidos.classList.add('error');
        errorApellidos.textContent = 'Los apellidos deben tener mínimo 2 letras y máximo 40';
        return false;
    } 

    inputApellidos.classList.remove('error');
    errorApellidos.textContent = '';
    return true;
}

function validarTelefono() {
    const telefono = inputTelefono.value.trim();

    if (telefono === '') {
        inputTelefono.classList.remove('error');
        errorTelefono.textContent = '';
        return false;
    }

    if (!REGEX_TELEFONO.test(telefono)) {
        inputTelefono.classList.add('error');
        errorTelefono.textContent = 'El teléfono debe tener 9 dígitos';
        return false;
    } 

    inputTelefono.classList.remove('error');
    errorTelefono.textContent = '';
    return true;
}

function validarEmail() {
    const email = inputEmail.value.trim();

    if (email === '') {
        inputEmail.classList.remove('error');
        errorEmail.textContent = '';
        return false;
    }

    if (!REGEX_EMAIL.test(email)) {
        inputEmail.classList.add('error');
        errorEmail.textContent = 'Ingrese un correo electrónico válido, por ejemplo: mmmm.nnn@xxxx.zzz';
        return false;
    } 

    inputEmail.classList.remove('error');
    errorEmail.textContent = '';
    return true;
}

// VALIDACIÓN DEL PLAZO EN DÍAS Y MESES
function validarPlazo() {
    const dias = inputPlazoDias.value.trim();
    const diasNum = Number(dias);
    const mesesNum = Number(inputPlazoMeses.value.trim());

    // 1. Restaurar estado inicial si los meses son menores a 4 o está vacío
    if (mesesNum < 4 || isNaN(mesesNum) || inputPlazoMeses.value.trim() === '') {
        inputPlazoDias.disabled = false;
        inputPlazoDias.placeholder = "min. 7 máx. 30";
    }

        // Limpiamos errores previos al empezar a evaluar
    errorPlazo.textContent = '';
    inputPlazoDias.classList.remove('error');
    inputPlazoMeses.classList.remove('error');

    // 2. Validar meses máximos (12)
    if (mesesNum > 12) {
        inputPlazoDias.classList.add('error');
        errorPlazo.textContent = 'El plazo máximo en meses es de 12';
        return false;
    }

    // Si los meses son igual o mayor a 4, desactivamos los días
    if (mesesNum >= 4) {
        inputPlazoDias.placeholder = "";
        inputPlazoDias.disabled = true;
        inputPlazoDias.value = "";
        inputPlazoDias.classList.remove('error');
        errorPlazo.textContent = '';
        return true;
    }

    // Si hay de 1 a 3 meses, permitimos ignorar los días y borramos cualquier error previo
    if (mesesNum >= 1 && mesesNum <= 3) {
        inputPlazoDias.classList.remove('error');
        errorPlazo.textContent = '';
        return true;
    }

    // 3. VALIDAR DÍAS (solo si no se usan meses >= 4)
    if (dias === '' || diasNum < 7) {
        inputPlazoDias.classList.add('error');
        errorPlazo.textContent = 'El plazo mínimo es de 7 días';
        return false;
    }

    if (diasNum > 30) {
        inputPlazoDias.classList.add('error');
        errorPlazo.textContent = 'El plazo máximo en días es de 30';
        return false;
    }

    // Limpiar errores si todo está bien
    inputPlazoDias.classList.remove('error');
    errorPlazo.textContent = '';
    return true;
}

// Convertir plazo de días (30) a meses
function convertirDiasAMeses() {
    let diasValor = Number(inputPlazoDias.value)
    let mesesValor = Number(inputPlazoMeses.value)

    if (diasValor == 30) {
        mesesValor += 1;
        diasValor = "";
        inputPlazoDias.value = diasValor;
        inputPlazoMeses.value = mesesValor;

        // Disparar la validación para actualizar estados si pasa de 3 a 4 meses
        validarPlazo();
    }

    if (inputPlazoMeses.value.trim() === "") {
        inputPlazoDias.placeholder = "min. 7 máx. 30";
    }
}

inputPlazoDias.addEventListener('input', convertirDiasAMeses);
inputPlazoMeses.addEventListener('input', validarPlazo);

// Evitar decimales en el input de días
inputPlazoDias.addEventListener('input', (e) => {
    if (e.target.value.includes('.') || e.target.value.includes(',')) {
        e.target.value = parseInt(e.target.value) || '';
    }
});

// Evitar decimales en el input de meses
inputPlazoMeses.addEventListener('input', (e) => {
    if (e.target.value.includes('.') || e.target.value.includes(',')) {
        e.target.value = parseInt(e.target.value) || '';
    }
});


// RESET DEL FORMULARIO
function resetFormulario() {
    inputNombre.value = '';
    inputApellidos.value = '';
    inputTelefono.value = '';
    inputEmail.value = '';
    inputPlazoDias.value = '';
    inputPlazoMeses.value = '';
    inputNombre.classList.remove('error');
    inputApellidos.classList.remove('error');
    inputTelefono.classList.remove('error');
    inputEmail.classList.remove('error');
    errorNombre.textContent = '';
    errorApellidos.textContent = '';
    errorTelefono.textContent = '';
    errorEmail.textContent = '';
    inputPlazoDias.classList.remove('error');
    inputPlazoMeses.classList.remove('error');
    errorPlazo.textContent = '';
}

const botonReset = document.getElementById('btn-reset');
botonReset.addEventListener('click', resetFormulario);


// EVENTOS DE LOS CAMPOS DEL FORMULARIO
inputNombre.addEventListener('input', validarNombre);
inputApellidos.addEventListener('input', validarApellidos);
inputTelefono.addEventListener('input', validarTelefono);
inputEmail.addEventListener('input', validarEmail);
inputPlazoDias.addEventListener('input', validarPlazo);
inputPlazoMeses.addEventListener('input', validarPlazo);



formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    // Se ejecutan las 4 validaciones una sola vez (así se marcan todos los errores a la vez)
    const nombreOk = validarNombre();
    const apellidosOk = validarApellidos();
    const telefonoOk = validarTelefono();
    const emailOk = validarEmail();
    const plazoDiasOk = validarPlazoDias();
    const plazoMesesOk = validarPlazoMeses();

    if (nombreOk && apellidosOk && telefonoOk && emailOk && plazoDiasOk && plazoMesesOk) {
        alert('Formulario enviado con éxito, muchas gracias');
        formulario.submit();
    } else {
        alert('Formulario inválido, revise los campos obligatorios');
    }
});


/* CALCULO DEL PRESUPUESTO */

const total = document.getElementById('total').querySelector('span');

const productos = (document.getElementById('productos'));

function calcularPresupuesto() {
    const producto = Number(document.getElementById('productos').value);
    const plazoMeses = Number(inputPlazoMeses.value);
    let descuento = 0  // En porcentaje

    // Aplicar descuento por plazo si es mayor o igual a 3 meses
    for (let i=3; i <= plazoMeses; i++) {
        descuento += 5; // 5% de descuento inicial a partir del 3 mes y sumando 5% cada mes del precio inicial
        if (descuento === 33){
            break;
        }
    }

    const totalPresupuesto = producto - producto * (descuento / 100);
    total.textContent = `${totalPresupuesto.toFixed(2)} €`;
};

productos.addEventListener('change', calcularPresupuesto);
inputPlazoMeses.addEventListener('input', calcularPresupuesto);
inputPlazoDias.addEventListener('input', calcularPresupuesto);






