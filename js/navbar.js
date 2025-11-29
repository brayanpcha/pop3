// Funcionalidad del Navbar
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
});

function initializeNavbar() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('show');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Actualizar enlaces activos basado en la URL actual
    updateActiveLinks();
    
    // Manejar scroll para efectos en el navbar
    window.addEventListener('scroll', handleNavbarScroll);
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenu.classList.add('show');
    
    // Cambiar ícono a X
    menuIcon.innerHTML = `
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    `;
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenu.classList.remove('show');
    
    // Cambiar ícono a hamburguesa
    menuIcon.innerHTML = `
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    `;
}

function updateActiveLinks() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Actualizar enlaces desktop
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Actualizar enlaces móviles
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
}

// Navegación suave para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave para enlaces que apuntan a IDs en la misma página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to top para el logo
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            if (this.getAttribute('href') === 'index.html' || this.getAttribute('href') === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});