// Scripts para el dashboard principal

document.addEventListener('DOMContentLoaded', function() {
    // Actualizar estadísticas del usuario
    updateUserStats();
    
    // Cargar actividad reciente
    loadRecentActivity();
});

function updateUserStats() {
    // Simular datos de estadísticas del usuario
    const stats = {
        matches: Math.floor(Math.random() * 50) + 10,
        items: Math.floor(Math.random() * 20) + 5,
        exchanges: Math.floor(Math.random() * 15) + 3,
        followers: Math.floor(Math.random() * 200) + 50
    };
    
    // Actualizar los números en las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length >= 4) {
        statCards[0].textContent = stats.matches;
        statCards[1].textContent = stats.items;
        statCards[2].textContent = stats.exchanges;
        statCards[3].textContent = stats.followers;
    }
}

function loadRecentActivity() {
    // Esta función cargaría la actividad reciente del usuario
    // En una aplicación real, haría una llamada a la API
    console.log('Cargando actividad reciente...');
}

// Función para manejar las acciones rápidas
function handleQuickAction(action) {
    switch(action) {
        case 'match':
            window.location.href = 'match.html';
            break;
        case 'publish':
            window.location.href = 'market.html';
            break;
        case 'community':
            window.location.href = 'blog.html';
            break;
        case 'profile':
            window.location.href = 'profile.html';
            break;
        default:
            console.log('Acción no reconocida:', action);
    }
}
