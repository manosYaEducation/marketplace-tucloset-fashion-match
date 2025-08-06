// Scripts para la gestión del perfil de usuario

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del perfil
    loadProfileData();
    
    // Manejar selección de estilos en preferencias
    const stylePreferences = document.getElementById('stylePreferences');
    if (stylePreferences) {
        stylePreferences.addEventListener('click', function(e) {
            if (e.target.classList.contains('tag-item')) {
                e.target.classList.toggle('selected');
            }
        });
    }
    
    // Manejar formulario de datos personales
    const personalDataForm = document.getElementById('personalDataForm');
    if (personalDataForm) {
        personalDataForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePersonalData();
        });
    }
});

function loadProfileData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Cargar datos en los campos del formulario
    const fields = {
        'firstName': currentUser.firstName,
        'lastName': currentUser.lastName,
        'email': currentUser.email,
        'age': currentUser.age || 25,
        'location': 'Madrid, España', // Valor por defecto
        'bio': 'Amante de la moda sostenible y los looks minimalistas. Siempre buscando piezas únicas para mi guardarropa.'
    };
    
    Object.keys(fields).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = fields[fieldId];
        }
    });
    
    // Marcar estilos seleccionados
    if (currentUser.styles) {
        currentUser.styles.forEach(style => {
            const styleTag = document.querySelector(`[data-style="${style}"]`);
            if (styleTag) {
                styleTag.classList.add('selected');
            }
        });
    }
}

function savePersonalData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Obtener datos del formulario
    const updatedData = {
        ...currentUser,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };
    
    // Guardar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedData));
    
    // Mostrar mensaje de éxito
    showSuccessMessage('Datos personales actualizados correctamente');
    
    // Actualizar UI
    updateUIForLoggedUser(updatedData);
}

function savePreferences() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Obtener estilos seleccionados
    const selectedStyles = Array.from(document.querySelectorAll('#stylePreferences .tag-item.selected'))
        .map(tag => tag.dataset.style);
    
    // Obtener configuración de notificaciones
    const notifications = {
        matches: document.getElementById('matchNotifications')?.checked || false,
        messages: document.getElementById('messageNotifications')?.checked || false,
        market: document.getElementById('marketNotifications')?.checked || false
    };
    
    // Actualizar datos del usuario
    const updatedData = {
        ...currentUser,
        styles: selectedStyles,
        notifications: notifications
    };
    
    // Guardar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedData));
    
    showSuccessMessage('Preferencias guardadas correctamente');
}

function showSuccessMessage(message) {
    // Crear y mostrar mensaje de éxito
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
}

// Función para eliminar una prenda
function deleteItem(itemId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta prenda?')) {
        // En una aplicación real, esto haría una llamada a la API
        console.log('Eliminando prenda:', itemId);
        showSuccessMessage('Prenda eliminada correctamente');
    }
}

// Función para editar una prenda
function editItem(itemId) {
    // En una aplicación real, esto abriría un modal de edición
    console.log('Editando prenda:', itemId);
    alert('Función de edición en desarrollo');
}
