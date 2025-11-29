// Funcionalidad específica del catálogo
document.addEventListener('DOMContentLoaded', function() {
    initializeCatalog();
});

function initializeCatalog() {
    const categoryFilter = document.getElementById('category-filter');
    const productsGrid = document.getElementById('catalog-products-grid');
    const emptyMessage = document.getElementById('catalog-empty');

    // Cargar todos los productos inicialmente
    loadProducts('all');

    // Event listener para el filtro de categorías
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            loadProducts(this.value);
        });
    }

    function loadProducts(category) {
        if (!window.PRODUCTS) {
            productsGrid.innerHTML = '<p>Error al cargar los productos</p>';
            return;
        }

        // Filtrar productos por categoría
        const filteredProducts = category === 'all' 
            ? window.PRODUCTS 
            : window.PRODUCTS.filter(product => product.category === category);

        // Mostrar u ocultar mensaje de vacío
        if (filteredProducts.length === 0) {
            productsGrid.style.display = 'none';
            emptyMessage.style.display = 'block';
            return;
        }

        productsGrid.style.display = 'grid';
        emptyMessage.style.display = 'none';

        // Renderizar productos
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-image-overlay"></div>
                </div>
                <div class="product-content">
                    <div class="product-header">
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-price">$${getProductPrice(product).toLocaleString()}</span>
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
                        <select class="variant-select" onchange="updateVariantPrice(this, '${product.id}')">
                            ${product.variants.map((variant, idx) => `
                                <option value="${idx}" data-price="${variant.price}">
                                    ${variant.name} - $${variant.price.toLocaleString()}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    ` : ''}
                    
                    <div class="product-actions">
                        <button class="action-btn add-to-cart-btn" onclick="addToCartFromCatalog('${product.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            Agregar
                        </button>
                        <button class="action-btn whatsapp-btn" onclick="directWhatsAppFromCatalog('${product.id}')">
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

    function getProductPrice(product) {
        if (product.variants) {
            return product.variants[0].price;
        }
        return product.price;
    }
}

// Funciones globales para el catálogo
function updateVariantPrice(select, productId) {
    const selectedOption = select.options[select.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const productCard = select.closest('.product-card');
    const priceElement = productCard.querySelector('.product-price');
    
    priceElement.textContent = `$${parseInt(price).toLocaleString()}`;
}

function addToCartFromCatalog(productId) {
    const product = window.PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const card = document.querySelector(`[onclick="addToCartFromCatalog('${productId}')"]`).closest('.product-card');
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

function directWhatsAppFromCatalog(productId) {
    const product = window.PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const card = document.querySelector(`[onclick="directWhatsAppFromCatalog('${productId}')"]`).closest('.product-card');
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