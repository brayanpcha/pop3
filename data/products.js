// Datos de productos
window.PRODUCTS = [
    {
        id: 'algodon-grande',
        name: 'Algodón de Azúcar Grande (40cm)',
        description: 'Nuestro clásico algodón de azúcar gigante, suave como una nube y delicioso. Ideal para impactar.',
        price: 2500,
        category: 'cotton',
        image: '../images/imagenalgo.jpg',
        options: {
            name: 'Color',
            values: ['Azul cielo', 'Rosado', 'Morado', 'Amarillo', 'Verde', 'Naranja', 'Negro', 'Blanco']
        }
    },
    {
        id: 'algodon-pequeno',
        name: 'Algodón de Azúcar Pequeño (25cm)',
        description: 'La porción perfecta de dulzura para los más pequeños.',
        price: 2000,
        category: 'cotton',
        image: '../images/imagenmin.jpg',
        options: {
            name: 'Color',
            values: ['Azul cielo', 'Rosado', 'Morado', 'Amarillo', 'Verde', 'Naranja', 'Negro', 'Blanco']
        }
    },
    {
        id: 'algodon-vaso',
        name: 'Algodón en Vaso (9 oz)',
        description: 'Presentación práctica y lista para llevar. Mantiene la frescura.',
        price: 3500,
        category: 'cotton',
        image: './images/product-3.jpg',
        variants: [
            { name: 'Sin Sticker', price: 3500 },
            { name: 'Con Sticker Personalizado', price: 4000 }
        ]
    },
    {
        id: 'crispetas-colores',
        name: 'Crispetas de Colores',
        description: 'Deliciosas crispetas dulces y coloridas, perfectas para alegrar cualquier mesa.',
        price: 2000,
        category: 'popcorn',
        image: '../images/imagencris.jpg'
    },
    {
        id: 'manzana-caramelada',
        name: 'Manzana Caramelada',
        description: 'Crujiente manzana cubierta de una capa roja de caramelo artesanal.',
        price: 6000,
        category: 'snack',
        image: '../images/imagenmanza.jpg'
    },
    {
        id: 'fresa-chocolate',
        name: 'Fresa con Chocolate',
        description: 'Fresa fresca cubierta de delicioso chocolate.',
        price: 1500,
        category: 'snack',
        image: '../images/imagefresa.jpg'
    },
    {
        id: 'fresa-masmelos',
        name: 'Fresas con Masmelos',
        description: 'Brocheta de fresas con masmelos y baño de chocolate.',
        price: 2500,
        category: 'snack',
        image: './images/product-7.jpg'
    },
    {
        id: 'combo-fiesta',
        name: 'Combo Fiesta',
        description: 'Paquete completo con algodón, crispetas y fresas con chocolate para tus eventos.',
        price: 12000,
        category: 'combo',
        image: './images/product-8.jpg'
    }
];

// Categorías para filtrado
window.PRODUCT_CATEGORIES = [
    { id: 'all', name: 'Todos los Productos' },
    { id: 'cotton', name: 'Algodones de Azúcar' },
    { id: 'popcorn', name: 'Crispetas' },
    { id: 'snack', name: 'Snacks' },
    { id: 'combo', name: 'Combos' }
];