document.addEventListener('DOMContentLoaded', function() {
    var fechaNacimiento = new Date('1995-07-03');
    var edad = calcularEdad(fechaNacimiento);
    document.getElementById('edad').textContent = edad;
});

function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

// hamburgerBtn
const hamburgerBtn = document.querySelector('#hamburgerBtn');

// Si se hace click en el botón, se agrega la clase 'active' al botón y al menú
hamburgerBtn.addEventListener('click', function() {
    hamburgerBtn.classList.toggle('hamburger-active');
    document.querySelector('.navbar__menu').classList.toggle('navbar-active');
});