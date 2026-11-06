// VALIDACION DE FORMULARIO
const formulario = document.getElementById('form');

const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,15}$/;
const REGEX_APELLIDOS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,40}$/;
const REGEX_TELEFONO = /^\d{9}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

