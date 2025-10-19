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

    // Animaciones para la sección About con Intersection Observer
    const aboutAnimations = () => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activar animación
                    entry.target.style.animationPlayState = 'running';
                    // Dejar de observar
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar todos los elementos animados en About
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const animatedElements = aboutSection.querySelectorAll(
                '.about-card, .about-intro p, .journey-section h3, .timeline-item, .value-section'
            );
            
            animatedElements.forEach(element => {
                element.style.animationPlayState = 'paused';
                observer.observe(element);
            });
        }
    };

    // Inicializar animaciones
    aboutAnimations();

    // --- Formulario de contacto ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formStatusTitle = document.getElementById('formStatusTitle');
    const formStatusMessage = document.getElementById('formStatusMessage');
    const formStatusIcon = document.getElementById('formStatusIcon');
    const formStatusClose = document.getElementById('formStatusClose');

    // URL de webhook de n8n (configurada por el usuario)
    const N8N_WEBHOOK_URL = 'https://n8n.ferpipohaidas.com/webhook/ferpipohaidas-contact';


    function showStatus({ success = true, title = '', message = '' }) {
        formStatusTitle.textContent = title;
        formStatusMessage.textContent = message;
        // Reemplazar emojis por textos descriptivos
        formStatusIcon.textContent = success ? '✓' : '✕';
        formStatusIcon.style.color = success ? '#28a745' : '#dc3545';
        formStatusIcon.style.fontSize = '3rem';
        formStatus.classList.add('visible');
        formStatus.setAttribute('aria-hidden', 'false');
        // Focus para accesibilidad
        formStatusClose.focus();
    }

    function hideStatus() {
        formStatus.classList.remove('visible');
        formStatus.setAttribute('aria-hidden', 'true');
    }

    // Notificación temporal (éxito o error)
    function showNotification(message = '', success = true, duration = 4000) {
        let notification = document.getElementById('successMessage');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'successMessage';
            notification.setAttribute('aria-live', 'polite');
            document.body.appendChild(notification);
        }
        
        // Remover clase hide si existe (de notificación anterior)
        notification.classList.remove('hide');
        
        notification.textContent = message;
        notification.className = success ? 'success-message' : 'error-message';
        notification.style.display = 'block';
        
        // Forzar reflow para que la animación se reinicie
        void notification.offsetWidth;
        
        // Después de (duration - 300ms), añadir clase hide para animación de salida
        setTimeout(() => {
            notification.classList.add('hide');
            // Finalmente ocultarla
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, duration - 300);
    }

    // Cambiar estado del botón a enviado (verde)
    function setButtonSuccess(button) {
        if (!button) return;
        const originalText = button.textContent;
        button.textContent = 'Enviado';
        button.classList.add('btn-sent');
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('btn-sent');
            button.disabled = false;
        }, 2500);
    }

    // Toast temporal para mensajes de éxito
    function showToast(message = '', duration = 3000) {
        let toast = document.getElementById('siteToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'siteToast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => {
            toast.classList.remove('visible');
        }, duration);
    }

    // Manejar cierre
    if (formStatusClose) {
        formStatusClose.addEventListener('click', (e) => {
            e.preventDefault();
            hideStatus();
        });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && formStatus.classList.contains('visible')) {
            hideStatus();
        }
    });

    // Helper: timeout para fetch
    function fetchWithTimeout(resource, options = {}) {
        const { timeout = 10000 } = options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        return fetch(resource, { ...options, signal: controller.signal })
            .finally(() => clearTimeout(id));
    }

    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Nos aseguramos que el botón use clase para spinner
        if (submitButton) submitButton.classList.add('btn--with-spinner');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const payload = {
                email: formData.get('email') || '',
                message: formData.get('message') || ''
            };

            // Validación simple: sólo email y mensaje
            if (!payload.email || !payload.message) {
                // Mostrar notificación de validación (o simplemente no hacer nada)
                alert('Por favor completa tu email y tu mensaje antes de enviar.');
                return;
            }

            // Manipular botón: desactivar y mostrar spinner (solo cambiar entre texto y spinner)
            let spinner;
            if (submitButton) {
                submitButton.disabled = true;
                spinner = document.createElement('span');
                spinner.className = 'btn--spinner';
                spinner.setAttribute('aria-hidden', 'true');
                submitButton.appendChild(spinner);
            }

            try {
                const res = await fetchWithTimeout(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    timeout: 10000
                });

                if (!res.ok) {
                    let errText = `Respuesta inesperada del servidor (${res.status})`;
                    try {
                        const body = await res.json();
                        if (body && body.message) errText = body.message;
                    } catch (_) {}
                    // Mostrar notificación de error
                    showNotification(errText, false);
                    return;
                }

                // Intentar leer mensaje del body JSON si existe
                let successMessage = 'Tu mensaje se envió correctamente.';
                try {
                    const body = await res.json();
                    if (body && body.message) successMessage = body.message;
                } catch (_) {
                    // noop
                }

                // Éxito: quitar spinner y cambiar botón a verde "Enviado"
                if (spinner) spinner.remove();
                
                // Cambiar botón a estado éxito
                setButtonSuccess(submitButton);
                
                contactForm.reset();
            } catch (err) {
                const isAbort = err.name === 'AbortError';
                const errMsg = isAbort ? 'La solicitud tardó demasiado. Por favor, intenta de nuevo.' : 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
                showNotification(errMsg, false);
            } finally {
                // Asegurar que spinner se elimina si quedó
                if (submitButton) {
                    const sp = submitButton.querySelector('.btn--spinner');
                    if (sp) sp.remove();
                }
            }
        });
    }
});
