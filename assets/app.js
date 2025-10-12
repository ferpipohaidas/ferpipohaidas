document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const logoTyping = document.querySelector('.logo-typing');

    // Animación de escritura para el logo
    if (logoTyping) {
        const words = ['Fernando', 'Pipo']; // Las palabras completas
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150; // Velocidad de escritura en ms

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Borrando
                logoTyping.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 100; // Velocidad de borrado
            } else {
                // Escribiendo
                logoTyping.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150; // Velocidad de escritura
            }

            // Si terminó de escribir la palabra
            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pausa antes de borrar
                isDeleting = true;
            }
            // Si terminó de borrar la palabra
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Siguiente palabra
                typingSpeed = 500; // Pausa antes de escribir la siguiente
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Iniciar la animación después de un pequeño delay
        setTimeout(typeEffect, 1000);
    }

    // Scroll suave para los enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Toggle para el menú de hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace (para móviles)
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Cambiar el fondo del navbar al hacer scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});
