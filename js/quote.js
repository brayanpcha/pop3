// Funcionalidad del formulario de cotización
document.addEventListener('DOMContentLoaded', function() {
    initializeQuoteForm();
});

function initializeQuoteForm() {
    const quoteForm = document.getElementById('quote-form');
    const productsList = document.getElementById('products-list');

    // Cargar lista de productos
    if (productsList && window.PRODUCTS) {
        productsList.innerHTML = window.PRODUCTS.map(product => `
            <div class="product-checkbox">
                <input type="checkbox" id="product-${product.id}" name="products" value="${product.id}">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                </div>
            </div>
        `).join('');
    }

    // Manejar envío del formulario
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuoteSubmission();
        });
    }

    // Validar fecha (no permitir fechas pasadas)
    const eventDate = document.getElementById('event-date');
    if (eventDate) {
        const today = new Date().toISOString().split('T')[0];
        eventDate.min = today;
    }
}

function handleQuoteSubmission() {
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        eventType: document.getElementById('event-type').value,
        guests: document.getElementById('guests').value,
        eventDate: document.getElementById('event-date').value,
        eventTime: document.getElementById('event-time').value,
        eventLocation: document.getElementById('event-location').value,
        specialRequests: document.getElementById('special-requests').value,
        products: getSelectedProducts()
    };

    // Validar datos requeridos
    if (!formData.name || !formData.phone || !formData.eventType || !formData.eventDate) {
        alert('Por favor completa los campos requeridos (*)');
        return;
    }

    // Generar mensaje para WhatsApp
    const message = generateWhatsAppMessage(formData);
    
    // Abrir WhatsApp con el mensaje
    window.open(`${COMPANY_INFO.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Opcional: limpiar formulario
    document.getElementById('quote-form').reset();
}

function getSelectedProducts() {
    const checkboxes = document.querySelectorAll('input[name="products"]:checked');
    return Array.from(checkboxes).map(checkbox => {
        const product = window.PRODUCTS.find(p => p.id === checkbox.value);
        return product ? product.name : checkbox.value;
    });
}

function generateWhatsAppMessage(formData) {
    let message = `¡Hola! Solicito cotización para un evento.%0A%0A`;
    
    message += `*Información del contacto:*%0A`;
    message += `👤 Nombre: ${formData.name}%0A`;
    message += `📞 Teléfono: ${formData.phone}%0A`;
    if (formData.email) message += `📧 Email: ${formData.email}%0A`;
    
    message += `%0A*Información del evento:*%0A`;
    message += `🎉 Tipo: ${getEventTypeName(formData.eventType)}%0A`;
    if (formData.guests) message += `👥 Invitados: ${formData.guests}%0A`;
    message += `📅 Fecha: ${formatDate(formData.eventDate)}%0A`;
    if (formData.eventTime) message += `⏰ Hora: ${formData.eventTime}%0A`;
    if (formData.eventLocation) message += `📍 Ubicación: ${formData.eventLocation}%0A`;
    
    if (formData.products.length > 0) {
        message += `%0A*Productos de interés:*%0A`;
        formData.products.forEach(product => {
            message += `• ${product}%0A`;
        });
    }
    
    if (formData.specialRequests) {
        message += `%0A*Solicitudes especiales:*%0A`;
        message += `${formData.specialRequests}%0A`;
    }
    
    message += `%0AQuedo atento a la cotización. ¡Gracias!`;
    
    return message;
}

function getEventTypeName(type) {
    const types = {
        'fiesta-infantil': 'Fiesta Infantil',
        'evento-escolar': 'Evento Escolar',
        'evento-empresarial': 'Evento Empresarial',
        'boda': 'Boda',
        'cumpleanos': 'Cumpleaños',
        'otro': 'Otro'
    };
    return types[type] || type;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
