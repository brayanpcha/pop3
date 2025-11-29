// Gestor del Carrito
class CartManager {
    constructor() {
        this.items = [];
        this.isCartOpen = false;
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.updateCartDisplay();
    }
    
    // Cargar carrito desde localStorage
    loadFromStorage() {
        const savedCart = localStorage.getItem('skypop_cart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch (e) {
                console.error("Error al cargar el carrito:", e);
                this.items = [];
            }
        }
    }
    
    // Guardar carrito en localStorage
    saveToStorage() {
        localStorage.setItem('skypop_cart', JSON.stringify(this.items));
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Botones de abrir/cerrar carrito
        document.getElementById('open-cart-btn')?.addEventListener('click', () => this.openCart());
        document.getElementById('open-cart-btn-mobile')?.addEventListener('click', () => this.openCart());
        document.getElementById('close-cart-btn')?.addEventListener('click', () => this.closeCart());
        document.getElementById('continue-shopping-btn')?.addEventListener('click', () => this.closeCart());
        document.getElementById('back-to-catalog-btn')?.addEventListener('click', () => {
            this.closeCart();
            window.location.href = 'catalog.html';
        });
        
        // Overlay para cerrar carrito
        document.getElementById('cart-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'cart-overlay') {
                this.closeCart();
            }
        });
        
        // Botones del carrito
        document.getElementById('checkout-btn')?.addEventListener('click', () => this.handleCheckout());
        document.getElementById('clear-cart-btn')?.addEventListener('click', () => this.clearCart());
    }
    
    // Añadir producto al carrito
    addToCart(product, quantity = 1, option = null, variantName = null, variantPrice = null) {
        const priceToUse = variantPrice || product.price;
        const uniqueId = `${product.id}-${option || 'std'}-${variantName || 'std'}`;
        
        const existingItem = this.items.find(item => item.uniqueId === uniqueId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                uniqueId,
                productId: product.id,
                name: product.name,
                price: priceToUse,
                image: product.image,
                quantity,
                selectedOption: option,
                selectedVariant: variantName
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.openCart();
    }
    
    // Eliminar producto del carrito
    removeFromCart(uniqueId) {
        this.items = this.items.filter(item => item.uniqueId !== uniqueId);
        this.saveToStorage();
        this.updateCartDisplay();
    }
    
    // Actualizar cantidad
    updateQuantity(uniqueId, change) {
        const item = this.items.find(item => item.uniqueId === uniqueId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(uniqueId);
            } else {
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }
    
    // Vaciar carrito
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }
    
    // Abrir carrito
    openCart() {
        this.isCartOpen = true;
        document.getElementById('cart-overlay').style.display = 'block';
        this.updateCartDisplay();
    }
    
    // Cerrar carrito
    closeCart() {
        this.isCartOpen = false;
        document.getElementById('cart-overlay').style.display = 'none';
    }
    
    // Procesar pedido por WhatsApp
    handleCheckout() {
        if (this.items.length === 0) return;
        
        let message = "¡Hola! Me gustaría hacer un pedido de los siguientes productos:%0A%0A";
        
        this.items.forEach(item => {
            message += `• ${item.quantity}x ${item.name}`;
            if (item.selectedOption) message += ` (${item.selectedOption})`;
            if (item.selectedVariant) message += ` - ${item.selectedVariant}`;
            message += ` - $${(item.price * item.quantity).toLocaleString()}%0A`;
        });
        
        message += `%0ATotal Estimado: $${this.cartTotal.toLocaleString()}%0A`;
        message += `%0AQuedo atento a la confirmación y disponibilidad. Gracias.`;
        
        window.open(`${COMPANY_INFO.whatsappLink}?text=${message}`, '_blank');
    }
    
    // Actualizar visualización del carrito
    updateCartDisplay() {
        const cartCount = this.cartCount;
        const cartTotal = this.cartTotal;
        
        // Actualizar contadores
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = cartCount;
        });
        
        // Mostrar/ocultar elementos según si hay productos
        const cartEmpty = document.getElementById('cart-empty');
        const cartItemsList = document.getElementById('cart-items-list');
        const cartFooter = document.getElementById('cart-footer');
        
        if (this.items.length === 0) {
            cartEmpty.style.display = 'flex';
            cartItemsList.style.display = 'none';
            cartFooter.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartItemsList.style.display = 'flex';
            cartFooter.style.display = 'block';
            
            // Actualizar total
            document.getElementById('cart-total').textContent = `$${cartTotal.toLocaleString()}`;
            
            // Actualizar lista de productos
            cartItemsList.innerHTML = this.items.map(item => `
                <li class="cart-item">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <div>
                            <div class="item-header">
                                <h3 class="item-name">${item.name}</h3>
                                <p class="item-price">$${(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                            ${item.selectedOption ? `<p class="item-options">Color: ${item.selectedOption}</p>` : ''}
                            ${item.selectedVariant ? `<p class="item-options">${item.selectedVariant}</p>` : ''}
                        </div>
                        <div class="item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="window.cartManager.updateQuantity('${item.uniqueId}', -1)" ${item.quantity <= 1 ? 'disabled' : ''}>
                                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn" onclick="window.cartManager.updateQuantity('${item.uniqueId}', 1)">
                                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                            <button class="remove-btn" onclick="window.cartManager.removeFromCart('${item.uniqueId}')">
                                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </li>
            `).join('');
        }
    }
    
    // Getter para total del carrito
    get cartTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    // Getter para cantidad total de items
    get cartCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Inicializar gestor del carrito
function initializeCart() {
    window.cartManager = new CartManager();
}