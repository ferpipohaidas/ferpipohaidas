// Aplicación principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Sitio web de ferpipohaidas cargado correctamente!');
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.skill-category, .portfolio-item, .service-card, .stat-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentTheme = document.body.getAttribute('data-theme');
        
        if (window.scrollY > 100) {
            if (currentTheme === 'light') {
                header.style.background = 'rgba(248, 250, 252, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            }
            header.style.backdropFilter = 'blur(25px)';
        } else {
            // Remover estilos inline para que use los CSS
            header.style.background = '';
            header.style.backdropFilter = '';
        }
    });

    // Dynamic name typing animation
    const dynamicNameElement = document.getElementById('dynamicName');
    if (dynamicNameElement) {
        const names = ['Fernando', 'Pipo'];
        let currentNameIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseDuration = 2000;

        function typeNames() {
            const currentName = names[currentNameIndex];
            
            if (!isDeleting && currentCharIndex < currentName.length) {
                // Typing
                dynamicNameElement.textContent = currentName.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                setTimeout(typeNames, typeSpeed);
            } else if (isDeleting && currentCharIndex > 0) {
                // Deleting
                dynamicNameElement.textContent = currentName.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(typeNames, deleteSpeed);
            } else if (!isDeleting && currentCharIndex === currentName.length) {
                // Pause before deleting
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeNames();
                }, pauseDuration);
            } else if (isDeleting && currentCharIndex === 0) {
                // Switch to next name
                isDeleting = false;
                currentNameIndex = (currentNameIndex + 1) % names.length;
                setTimeout(typeNames, typeSpeed);
            }
        }

        // Start the animation after a short delay
        setTimeout(typeNames, 1500);
    }

    // Form submission
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation and success message
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje Enviado!';
                submitBtn.style.background = 'linear-gradient(135deg, #9ae6b4 0%, #48bb78 100%)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floatingCard = document.querySelector('.floating-card');
        
        if (floatingCard) {
            const speed = scrolled * 0.1;
            floatingCard.style.transform = `translateY(${speed}px)`;
        }
    });

    // Counter animation for stats
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    };

    // Start counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.dataset.animated) {
                    const target = parseInt(statNumber.textContent);
                    statNumber.dataset.animated = 'true';
                    animateCounter(statNumber, target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });

    // Mensaje de bienvenida en consola
    console.log('%c👋 ¡Hola! Bienvenido a mi sitio web', 'color: #b794f6; font-size: 20px; font-weight: bold;');
    console.log('%c💻 ¿Interesado en el código? ¡Contáctame!', 'color: #90cdf4; font-size: 14px;');
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

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    const body = document.body;

    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        mobileThemeIcon.className = 'fas fa-moon';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        mobileThemeIcon.className = 'fas fa-sun';
    }

    // Function to handle theme change
    function handleThemeChange(buttonElement, iconElement) {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update header background if scrolled
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            if (newTheme === 'light') {
                header.style.background = 'rgba(248, 250, 252, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
        
        // Update both icons with animation
        themeIcon.style.transform = 'scale(0)';
        mobileThemeIcon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            if (newTheme === 'light') {
                themeIcon.className = 'fas fa-moon';
                mobileThemeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
                mobileThemeIcon.className = 'fas fa-sun';
            }
            themeIcon.style.transform = 'scale(1)';
            mobileThemeIcon.style.transform = 'scale(1)';
        }, 150);
        
        // Add ripple effect to the clicked button
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        buttonElement.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Theme toggle event listeners
    themeToggle.addEventListener('click', (e) => {
        handleThemeChange(themeToggle, themeIcon);
    });

    mobileThemeToggle.addEventListener('click', (e) => {
        handleThemeChange(mobileThemeToggle, mobileThemeIcon);
    });

// Exportar funciones para uso global si es necesario
window.ferpipohaidas = {
    showMessage: showMessage
};