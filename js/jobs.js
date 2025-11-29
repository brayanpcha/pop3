// Funcionalidad del formulario de trabajo
document.addEventListener('DOMContentLoaded', function() {
    initializeJobApplication();
});

function initializeJobApplication() {
    const jobForm = document.getElementById('job-application-form');
    
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleJobApplication();
        });
    }
}

function handleJobApplication() {
    const formData = {
        name: document.getElementById('applicant-name').value,
        phone: document.getElementById('applicant-phone').value,
        email: document.getElementById('applicant-email').value,
        position: document.getElementById('applicant-position').value,
        experience: document.getElementById('applicant-experience').value,
        availability: document.getElementById('applicant-availability').value
    };

    // Validar datos requeridos
    if (!formData.name || !formData.phone || !formData.position || !formData.availability) {
        alert('Por favor completa los campos requeridos (*)');
        return;
    }

    // Generar mensaje para WhatsApp
    const message = generateJobApplicationMessage(formData);
    
    // Abrir WhatsApp con el mensaje
    window.open(`${COMPANY_INFO.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Opcional: limpiar formulario
    document.getElementById('job-application-form').reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generateJobApplicationMessage(formData) {
    let message = `¡Hola! Estoy interesado/a en trabajar con SKY POP.%0A%0A`;
    
    message += `*Información personal:*%0A`;
    message += `👤 Nombre: ${formData.name}%0A`;
    message += `📞 Teléfono: ${formData.phone}%0A`;
    if (formData.email) message += `📧 Email: ${formData.email}%0A`;
    
    message += `%0A*Información de la aplicación:*%0A`;
    message += `💼 Posición: ${getPositionName(formData.position)}%0A`;
    message += `⏰ Disponibilidad: ${getAvailabilityName(formData.availability)}%0A`;
    
    if (formData.experience) {
        message += `%0A*Experiencia e intereses:*%0A`;
        message += `${formData.experience}%0A`;
    }
    
    message += `%0AEstoy emocionado/a por la oportunidad de unirme al equipo SKY POP. ¡Quedo atento/a a su respuesta!`;
    
    return message;
}

function getPositionName(position) {
    const positions = {
        'vendedor': 'Vendedor/a de Eventos',
        'produccion': 'Asistente de Producción',
        'atencion-cliente': 'Atención al Cliente',
        'otro': 'Otra posición'
    };
    return positions[position] || position;
}

function getAvailabilityName(availability) {
    const availabilities = {
        'fines-semana': 'Fines de semana',
        'entre-semana': 'Entre semana',
        'flexible': 'Horario flexible',
        'tiempo-completo': 'Tiempo completo',
        'medio-tiempo': 'Medio tiempo'
    };
    return availabilities[availability] || availability;
}