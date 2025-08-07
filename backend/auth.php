<?php
// Scripts para la gestión de usuarios y autenticación backend
// En una aplicación real, esto se conectaría a una base de datos

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Lista de usuarios simulados para la maqueta
$users = [
    [
        'id' => 1,
        'email' => 'admin@fashionmatch.com',
        'password' => password_hash('admin123', PASSWORD_DEFAULT),
        'firstName' => 'Admin',
        'lastName' => 'FashionMatch',
        'role' => 'admin',
        'styles' => ['elegante', 'minimalista']
    ],
    [
        'id' => 2,
        'email' => 'maria@email.com',
        'password' => password_hash('123456', PASSWORD_DEFAULT),
        'firstName' => 'María',
        'lastName' => 'González',
        'role' => 'user',
        'styles' => ['elegante', 'minimalista', 'casual']
    ]
];

// Función para verificar las credenciales del usuario
function authenticateUser($email, $password) {
    global $users;
    
    foreach ($users as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            // No devolver la contraseña por seguridad
            unset($user['password']);
            return $user;
        }
    }
    
    return false;
}

// Función para registrar nuevos usuarios
function registerUser($userData) {
    global $users;
    
    // Verificar si el email ya existe en el sistema
    foreach ($users as $user) {
        if ($user['email'] === $userData['email']) {
            return ['success' => false, 'message' => 'El email ya está registrado'];
        }
    }
    
    // Crear nuevo usuario con los datos proporcionados
    $newUser = [
        'id' => count($users) + 1,
        'email' => $userData['email'],
        'password' => password_hash($userData['password'], PASSWORD_DEFAULT),
        'firstName' => $userData['firstName'],
        'lastName' => $userData['lastName'],
        'age' => $userData['age'],
        'role' => 'user',
        'styles' => $userData['styles'] ?? []
    ];
    
    // En una aplicación real, esto se guardaría en la base de datos
    $users[] = $newUser;
    
    // No devolver la contraseña por seguridad
    unset($newUser['password']);
    
    return ['success' => true, 'user' => $newUser];
}

// Manejar diferentes tipos de peticiones HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['action'])) {
        switch ($input['action']) {
            case 'login':
                // Procesar solicitud de inicio de sesión
                $user = authenticateUser($input['email'], $input['password']);
                if ($user) {
                    echo json_encode(['success' => true, 'user' => $user]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
                }
                break;
                
            case 'register':
                // Procesar solicitud de registro
                $result = registerUser($input);
                echo json_encode($result);
                break;
                
            default:
                echo json_encode(['success' => false, 'message' => 'Acción no válida']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Acción requerida']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
