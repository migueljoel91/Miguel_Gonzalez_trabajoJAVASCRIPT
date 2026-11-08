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

const errorNombre = document.getElementById('error-nombre');
const errorApellidos = document.getElementById('error-apellidos');
const errorTelefono = document.getElementById('error-telefono');
const errorEmail = document.getElementById('error-email');

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

function resetFormulario() {
    inputNombre.value = '';
    inputApellidos.value = '';
    inputTelefono.value = '';
    inputEmail.value = '';
    inputNombre.classList.remove('error');
    inputApellidos.classList.remove('error');
    inputTelefono.classList.remove('error');
    inputEmail.classList.remove('error');
    errorNombre.textContent = '';
    errorApellidos.textContent = '';
    errorTelefono.textContent = '';
    errorEmail.textContent = '';
}

const botonReset = document.getElementById('btn-reset');
botonReset.addEventListener('click', resetFormulario);


// EVENTOS DE LOS CAMPOS DEL FORMULARIO
inputNombre.addEventListener('input', validarNombre);
inputApellidos.addEventListener('input', validarApellidos);
inputTelefono.addEventListener('input', validarTelefono);
inputEmail.addEventListener('input', validarEmail);

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    // Se ejecutan las 4 validaciones una sola vez (así se marcan todos los errores a la vez)
    const nombreOk = validarNombre();
    const apellidosOk = validarApellidos();
    const telefonoOk = validarTelefono();
    const emailOk = validarEmail();

    if (nombreOk && apellidosOk && telefonoOk && emailOk) {
        alert('Formulario enviado con éxito, muchas gracias');
        formulario.submit();
    } else {
        alert('Formulario inválido, revise los campos obligatorios');
    }
});