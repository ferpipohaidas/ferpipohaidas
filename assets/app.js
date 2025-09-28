// Aplicación principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Sitio web de ferpipohaidas cargado correctamente!');
    
    // Agregar animación suave a los enlaces
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mensaje de bienvenida en consola
    console.log('%c👋 ¡Hola! Bienvenido a mi sitio web', 'color: #3498db; font-size: 16px; font-weight: bold;');
    console.log('%cSi tienes alguna pregunta o sugerencia, no dudes en contactarme.', 'color: #2c3e50; font-size: 14px;');
    
    // Agregar efecto hover a los elementos interactivos
    const interactiveElements = document.querySelectorAll('.home-link, nav h1 a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Función para detectar si es página 404
    if (document.title.includes('404')) {
        console.log('Página 404 detectada');
        // Aquí se podría agregar analytics o reportes de errores
    }
});

// Función utilitaria para mostrar mensajes
function showMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Exportar funciones para uso global si es necesario
window.ferpipohaidas = {
    showMessage: showMessage
};