// JavaScript per il sito Toyota Production System

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    
    // Inizializza tutte le funzionalità
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initCardHoverEffects();
    initTooltips();
    
    console.log('🚗 Toyota Production System - Sito caricato correttamente!');
});

// Smooth scrolling per i link di navigazione
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Offset per navbar fissa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gestione della navigazione attiva
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Aggiorna al caricamento della pagina
    updateActiveLink();
    
    // Aggiorna durante lo scroll
    window.addEventListener('scroll', updateActiveLink);
}

// Animazioni al scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    // Osserva tutte le card e sezioni
    const elementsToAnimate = document.querySelectorAll('.card, section h2, section .lead');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Effetti hover per le card
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Inizializza i tooltip di Bootstrap
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Funzione per aggiungere effetti alle icone
function addIconEffects() {
    const icons = document.querySelectorAll('.icon-circle i');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Gestione del menu mobile
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Chiudi il menu quando si clicca su un link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// Funzione per il contatore animato (se necessario)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const speed = 200;
        
        const animate = () => {
            const value = parseInt(counter.innerText);
            const data = target / speed;
            
            if (value < target) {
                counter.innerText = Math.ceil(value + data);
                setTimeout(animate, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        animate();
    });
}

// Gestione degli errori
window.addEventListener('error', function(e) {
    console.error('Errore JavaScript:', e.error);
});

// Funzione per evidenziare le differenze tra i metodi
function highlightMethodDifferences() {
    const methodCards = document.querySelectorAll('#confronto .card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Evidenzia la card corrente
            this.style.border = '2px solid #0d6efd';
            this.style.transform = 'scale(1.02)';
            
            // Riduci l'opacità delle altre card
            methodCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Ripristina lo stato normale
            this.style.border = '';
            this.style.transform = '';
            
            methodCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
}

// Inizializza gli effetti aggiuntivi quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    addIconEffects();
    initMobileMenu();
    highlightMethodDifferences();
});

// Funzione per il back to top
function initBackToTop() {
    const backToTopBtn = document.querySelector('footer a[href="#home"]');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Aggiungi la funzione back to top
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
});

// Gestione del tema scuro (opzionale)
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

// Carica il tema salvato
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Carica il tema al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadSavedTheme);

// Statistiche di performance (opzionale)
function logPerformance() {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Tempo di caricamento: ${loadTime}ms`);
    });
}

// Attiva il logging delle performance
logPerformance();
