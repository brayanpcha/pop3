// Datos del carousel
const CAROUSEL_SLIDES = [
    {
        image: "../images/imagelogo.jpg",
        title: "Momentos Dulces en Familia",
        subtitle: "Siente el sabor del cielo y endulza tu alma.",
        cta: "Ver Catálogo",
        link: "../skypop-website/catalog.html"
    },
    {
        image: "../images/imagencris.jpg",
        title: "Crispetas de Colores",
        subtitle: "Elige tu color favorito y vive la magia.",
        cta: "Cotizar Evento",
        link: "../skypop-website/quote.html"
    },
    {
        image: "../images/imagenalgo.jpg",
        title: "Algodones Gigantes",
        subtitle: "Suavidad y sabor que impactan.",
        cta: "Pedir Ahora",
        link: "../skypop-website/catalog.html"
    }
];

// Inicializar carousel
function initializeCarousel() {
    let currentSlide = 0;
    const slidesContainer = document.getElementById('carousel-slides');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Crear slides
    slidesContainer.innerHTML = CAROUSEL_SLIDES.map((slide, index) => `
        <div class="carousel-slide">
            <img src="${slide.image}" alt="${slide.title}">
            <div class="carousel-overlay">
                <div class="carousel-content">
                    <h1 class="carousel-title">${slide.title}</h1>
                    <p class="carousel-subtitle">"${slide.subtitle}"</p>
                    <a href="${slide.link}" class="btn-primary">${slide.cta}</a>
                </div>
            </div>
        </div>
    `).join('');

    // Crear indicadores
    indicatorsContainer.innerHTML = CAROUSEL_SLIDES.map((_, index) => `
        <div class="carousel-indicator ${index === 0 ? 'active' : ''}" 
             onclick="goToSlide(${index})"></div>
    `).join('');

    // Funciones de navegación
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % CAROUSEL_SLIDES.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length;
        updateCarousel();
    }

    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide cada 5 segundos
    let slideInterval = setInterval(nextSlide, 5000);

    // Pausar auto slide al interactuar
    slidesContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slidesContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Hacer funciones globales para los indicadores
    window.goToSlide = goToSlide;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('carousel-slides')) {
        initializeCarousel();
    }
});

