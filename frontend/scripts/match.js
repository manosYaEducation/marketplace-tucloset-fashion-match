// Scripts para la funcionalidad de match tipo Tinder

// Datos simulados de usuarios para match
const mockProfiles = [
    {
        id: 1,
        name: 'María González',
        age: 25,
        styles: ['Elegante', 'Minimalista', 'Casual'],
        bio: 'Amante de la moda sostenible y los looks minimalistas. Siempre buscando piezas únicas para mi guardarropa.',
        image: '/placeholder.svg?height=400&width=300'
    },
    {
        id: 2,
        name: 'Ana Martín',
        age: 28,
        styles: ['Bohemio', 'Vintage', 'Casual'],
        bio: 'Coleccionista de piezas vintage y amante del estilo bohemio. Me encanta mezclar épocas y crear looks únicos.',
        image: '/placeholder.svg?height=400&width=300'
    },
    {
        id: 3,
        name: 'Laura Pérez',
        age: 23,
        styles: ['Streetwear', 'Deportivo', 'Casual'],
        bio: 'Fanática del streetwear y la moda urbana. Siempre al día con las últimas tendencias de la calle.',
        image: '/placeholder.svg?height=400&width=300'
    },
    {
        id: 4,
        name: 'Carmen Silva',
        age: 30,
        styles: ['Elegante', 'Romántico', 'Vintage'],
        bio: 'Ejecutiva de día, romántica de noche. Me encanta la moda clásica con toques modernos.',
        image: '/placeholder.svg?height=400&width=300'
    }
];

let currentProfileIndex = 0;
let likedProfiles = [];
let passedProfiles = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCurrentProfile();
    
    // Event listeners para los botones de match
    const rejectBtn = document.querySelector('.match-btn.reject');
    const likeBtn = document.querySelector('.match-btn.like');
    
    if (rejectBtn) rejectBtn.addEventListener('click', rejectMatch);
    if (likeBtn) likeBtn.addEventListener('click', likeMatch);
    
    // Soporte para gestos de swipe (simplificado)
    let startX = 0;
    let currentX = 0;
    let cardBeingDragged = false;
    
    const matchCard = document.getElementById('currentCard');
    if (matchCard) {
        matchCard.addEventListener('touchstart', handleTouchStart, { passive: true });
        matchCard.addEventListener('touchmove', handleTouchMove, { passive: true });
        matchCard.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // También para mouse
        matchCard.addEventListener('mousedown', handleMouseStart);
        matchCard.addEventListener('mousemove', handleMouseMove);
        matchCard.addEventListener('mouseup', handleMouseEnd);
    }
});

function loadCurrentProfile() {
    if (currentProfileIndex >= mockProfiles.length) {
        showNoMoreProfiles();
        return;
    }
    
    const profile = mockProfiles[currentProfileIndex];
    
    // Actualizar la información del perfil
    document.getElementById('userName').textContent = profile.name;
    document.getElementById('userAge').textContent = `${profile.age} años`;
    document.getElementById('userBio').textContent = profile.bio;
    
    // Actualizar estilos
    const stylesContainer = document.getElementById('userStyles');
    stylesContainer.innerHTML = '';
    profile.styles.forEach(style => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary me-1';
        badge.textContent = style;
        stylesContainer.appendChild(badge);
    });
    
    // Actualizar imagen
    const profileImage = document.querySelector('#currentCard img');
    if (profileImage) {
        profileImage.src = profile.image;
        profileImage.alt = profile.name;
    }
}

function rejectMatch() {
    const profile = mockProfiles[currentProfileIndex];
    passedProfiles.push(profile);
    
    // Animación de rechazo
    animateCardExit('left');
    
    setTimeout(() => {
        nextProfile();
    }, 300);
}

function likeMatch() {
    const profile = mockProfiles[currentProfileIndex];
    likedProfiles.push(profile);
    
    // Simular match (30% de probabilidad)
    const isMatch = Math.random() < 0.3;
    
    // Animación de like
    animateCardExit('right');
    
    setTimeout(() => {
        if (isMatch) {
            showMatchModal(profile);
        }
        nextProfile();
    }, 300);
}

function nextProfile() {
    currentProfileIndex++;
    
    // Reset de la posición de la tarjeta
    const matchCard = document.getElementById('currentCard');
    if (matchCard) {
        matchCard.style.transform = '';
        matchCard.style.opacity = '';
    }
    
    loadCurrentProfile();
}

function animateCardExit(direction) {
    const matchCard = document.getElementById('currentCard');
    if (!matchCard) return;
    
    const translateX = direction === 'left' ? '-100%' : '100%';
    matchCard.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    matchCard.style.transform = `translateX(${translateX}) rotate(${direction === 'left' ? '-' : ''}15deg)`;
    matchCard.style.opacity = '0';
}

function showMatchModal(profile) {
    const modal = document.getElementById('matchModal');
    const matchName = document.getElementById('matchName');
    
    if (matchName) {
        matchName.textContent = profile.name;
    }
    
    if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}

function showNoMoreProfiles() {
    const matchCard = document.getElementById('currentCard');
    if (matchCard) {
        matchCard.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center h-100 p-4 text-center">
                <i class="fas fa-heart fa-4x text-primary mb-3"></i>
                <h4 class="fw-bold mb-3">¡No hay más perfiles!</h4>
                <p class="text-muted mb-4">Has visto todos los perfiles disponibles por ahora. Vuelve más tarde para ver nuevos usuarios.</p>
                <button class="btn btn-primary" onclick="window.location.reload()">
                    <i class="fas fa-refresh me-2"></i>Reiniciar
                </button>
            </div>
        `;
    }
}

// Funciones para manejo de gestos táctiles
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    cardBeingDragged = true;
}

function handleTouchMove(e) {
    if (!cardBeingDragged) return;
    
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const matchCard = document.getElementById('currentCard');
    
    if (matchCard) {
        const rotation = diffX * 0.1;
        const opacity = 1 - Math.abs(diffX) / 300;
        matchCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
        matchCard.style.opacity = Math.max(opacity, 0.3);
    }
}

function handleTouchEnd(e) {
    if (!cardBeingDragged) return;
    
    const diffX = currentX - startX;
    const threshold = 100;
    
    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            likeMatch();
        } else {
            rejectMatch();
        }
    } else {
        // Volver a la posición original
        const matchCard = document.getElementById('currentCard');
        if (matchCard) {
            matchCard.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
            matchCard.style.transform = '';
            matchCard.style.opacity = '';
        }
    }
    
    cardBeingDragged = false;
    startX = 0;
    currentX = 0;
}

// Funciones para manejo de mouse (similar a touch)
function handleMouseStart(e) {
    startX = e.clientX;
    cardBeingDragged = true;
}

function handleMouseMove(e) {
    if (!cardBeingDragged) return;
    
    currentX = e.clientX;
    const diffX = currentX - startX;
    const matchCard = document.getElementById('currentCard');
    
    if (matchCard) {
        const rotation = diffX * 0.1;
        const opacity = 1 - Math.abs(diffX) / 300;
        matchCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
        matchCard.style.opacity = Math.max(opacity, 0.3);
    }
}

function handleMouseEnd(e) {
    handleTouchEnd(e);
}
