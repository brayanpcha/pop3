// Configuración de la compañía
const COMPANY_INFO = {
    name: 'SKY POP',
    phone: '3223428970',
    email: 'golosinasjp@gmail.com',
    instagram: 'https://www.instagram.com/golosinasjp?igsh=MXFvYXp0Y3NoeDFyZg==',
    whatsappLink: 'https://wa.me/573223428970',
};

// Colores disponibles para algodones
const COTTON_COLORS = [
    'Azul cielo', 'Rosado', 'Morado', 'Amarillo', 'Verde', 'Naranja', 'Negro', 'Blanco'
];

// Mapeo de colores a códigos HEX
const COLOR_HEX_MAP = {
    'Azul cielo': '#87CEEB',
    'Rosado': '#FFB6C1',
    'Morado': '#DDA0DD',
    'Amarillo': '#FFFACD',
    'Verde': '#98FB98',
    'Naranja': '#FFA07A',
    'Negro': '#2F2F2F',
    'Blanco': '#FFFFFF',
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Inicializar componentes si existen en la página
    if (document.getElementById('carousel-slides')) {
        initializeCarousel();
    }
    
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    // Inicializar gestor del carrito
    initializeCart();
});

// Cargar productos destacados
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    // Tomar los primeros 4 productos como destacados
    const featuredProducts = window.PRODUCTS ? window.PRODUCTS.slice(0, 4) : [];
    
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p class="text-center">No hay productos disponibles</p>';
        return;
    }
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-image-overlay"></div>
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                </div>
                <p class="product-description">${product.description}</p>
                
                ${product.options ? `
                <div class="color-options">
                    <label class="color-label">
                        Color: <span class="color-selected">${product.options.values[0]}</span>
                    </label>
                    <div class="color-buttons">
                        ${product.options.values.map(color => `
                            <button class="color-btn ${color === product.options.values[0] ? 'selected' : ''}" 
                                    style="background-color: ${getColorHex(color)}"
                                    title="${color}"
                                    onclick="selectColor(this, '${color}')">
                            </button>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${product.variants ? `
                <div class="variant-options">
                    <label class="variant-label">Opciones:</label>
                    <select class="variant-select" onchange="selectVariant(this, ${product.id})">
                        ${product.variants.map((variant, idx) => `
                            <option value="${idx}">${variant.name} - $${variant.price.toLocaleString()}</option>
                        `).join('')}
                    </select>
                </div>
                ` : ''}
                
                <div class="product-actions">
                    <button class="action-btn add-to-cart-btn" onclick="addToCart('${product.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Agregar
                    </button>
                    <button class="action-btn whatsapp-btn" onclick="directWhatsApp('${product.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        Pedir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper para obtener color HEX
function getColorHex(colorName) {
    return COLOR_HEX_MAP[colorName] || '#CCCCCC';
}

// Seleccionar color en producto
function selectColor(button, color) {
    const buttons = button.parentElement.querySelectorAll('.color-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    const selectedSpan = button.closest('.color-options').querySelector('.color-selected');
    selectedSpan.textContent = color;
}

// Seleccionar variante
function selectVariant(select, productId) {
    // Esta función se implementará cuando se cargue el producto completo
    console.log('Variante seleccionada:', select.value, 'para producto:', productId);
}

// Añadir al carrito
function addToCart(productId) {
    const product = window.PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const card = document.querySelector(`[onclick="addToCart('${productId}')"]`).closest('.product-card');
    let selectedColor = null;
    let selectedVariant = null;
    let price = product.price;
    
    // Obtener color seleccionado
    if (product.options) {
        const colorSelected = card.querySelector('.color-selected');
        selectedColor = colorSelected ? colorSelected.textContent : product.options.values[0];
    }
    
    // Obtener variante seleccionada
    if (product.variants) {
        const variantSelect = card.querySelector('.variant-select');
        const variantIndex = variantSelect ? parseInt(variantSelect.value) : 0;
        selectedVariant = product.variants[variantIndex].name;
        price = product.variants[variantIndex].price;
    }
    
    // Añadir al carrito
    if (window.cartManager) {
        window.cartManager.addToCart(product, 1, selectedColor, selectedVariant, price);
    }
}

// Pedido directo por WhatsApp
function directWhatsApp(productId) {
    const product = window.PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const card = document.querySelector(`[onclick="directWhatsApp('${productId}')"]`).closest('.product-card');
    let selectedColor = null;
    let selectedVariant = null;
    
    // Obtener color seleccionado
    if (product.options) {
        const colorSelected = card.querySelector('.color-selected');
        selectedColor = colorSelected ? colorSelected.textContent : product.options.values[0];
    }
    
    // Obtener variante seleccionada
    if (product.variants) {
        const variantSelect = card.querySelector('.variant-select');
        const variantIndex = variantSelect ? parseInt(variantSelect.value) : 0;
        selectedVariant = product.variants[variantIndex].name;
    }
    
    let message = `Hola! Estoy interesado en comprar ${product.name}`;
    if (selectedColor) message += ` en color ${selectedColor}`;
    if (selectedVariant) message += ` (${selectedVariant})`;
    message += `. ¿Me ayudas con la disponibilidad?`;
    
    window.open(`${COMPANY_INFO.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
}