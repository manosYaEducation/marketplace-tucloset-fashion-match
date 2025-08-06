// Simulación de autenticación y gestión de usuarios

// Datos de usuarios simulados
const mockUsers = [
    {
        id: 1,
        email: 'admin@fashionmatch.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'FashionMatch',
        role: 'admin',
        styles: ['elegante', 'minimalista']
    },
    {
        id: 2,
        email: 'maria@email.com',
        password: '123456',
        firstName: 'María',
        lastName: 'González',
        role: 'user',
        styles: ['elegante', 'minimalista', 'casual']
    }
];

// Función para inicializar la autenticación
function initAuth() {
    // Verificar si hay un usuario logueado
    const currentUser = getCurrentUser();
    if (currentUser && isProtectedPage()) {
        updateUIForLoggedUser(currentUser);
    } else if (isProtectedPage()) {
        // Redirigir a login si está en página protegida sin estar logueado
        window.location.href = 'login.html';
    }
}

// Verificar si la página actual requiere autenticación
function isProtectedPage() {
    const protectedPages = ['home.html', 'match.html', 'blog.html', 'market.html', 'profile.html', 'admin.html'];
    const currentPage = window.location.pathname.split('/').pop();
    return protectedPages.includes(currentPage);
}

// Obtener usuario actual del localStorage
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Actualizar UI para usuario logueado
function updateUIForLoggedUser(user) {
    const welcomeElement = document.getElementById('welcomeUser');
    if (welcomeElement) {
        welcomeElement.textContent = `¡Hola, ${user.firstName}!`;
    }
    
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) {
        profileEmail.textContent = user.email;
    }
}

// Función de login
function login(email, password) {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Guardar usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirigir según el rol
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'home.html';
        }
        return true;
    }
    return false;
}

// Función de registro
function register(userData) {
    // Verificar si el email ya existe
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
        return { success: false, message: 'El email ya está registrado' };
    }
    
    // Crear nuevo usuario
    const newUser = {
        id: mockUsers.length + 1,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        role: 'user',
        styles: userData.styles || []
    };
    
    // Agregar a la lista de usuarios (en una app real, esto iría a la base de datos)
    mockUsers.push(newUser);
    
    // Auto-login después del registro
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
}

// Función de logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Event listeners para formularios
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar autenticación
    initAuth();
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (login(email, password)) {
                // Login exitoso - la redirección se maneja en la función login
            } else {
                alert('Email o contraseña incorrectos');
            }
        });
    }
    
    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Obtener estilos seleccionados
            const selectedStyles = Array.from(document.querySelectorAll('.tag-item.selected'))
                .map(tag => tag.dataset.style);
            
            const userData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: password,
                age: document.getElementById('age').value,
                styles: selectedStyles
            };
            
            const result = register(userData);
            if (result.success) {
                alert('¡Registro exitoso! Bienvenido a FashionMatch');
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        });
        
        // Manejo de selección de estilos
        const styleSelector = document.getElementById('styleSelector');
        if (styleSelector) {
            styleSelector.addEventListener('click', function(e) {
                if (e.target.classList.contains('tag-item')) {
                    e.target.classList.toggle('selected');
                }
            });
        }
    }
});

// Función para verificar si el usuario es admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Proteger páginas de admin
if (window.location.pathname.includes('admin.html') && !isAdmin()) {
    window.location.href = 'home.html';
}
