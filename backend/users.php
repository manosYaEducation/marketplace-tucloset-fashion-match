<?php
// Gestión de usuarios - simulación
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Datos simulados de usuarios
$users = [
    [
        'id' => 1,
        'firstName' => 'María',
        'lastName' => 'González',
        'email' => 'maria@email.com',
        'age' => 25,
        'location' => 'Madrid, España',
        'styles' => ['elegante', 'minimalista', 'casual'],
        'stats' => [
            'matches' => 24,
            'items' => 12,
            'exchanges' => 8,
            'followers' => 156,
            'following' => 89,
            'rating' => 4.8
        ],
        'joinDate' => '2024-01-15'
    ],
    [
        'id' => 2,
        'firstName' => 'Ana',
        'lastName' => 'Martín',
        'email' => 'ana@email.com',
        'age' => 28,
        'location' => 'Barcelona, España',
        'styles' => ['bohemio', 'vintage', 'casual'],
        'stats' => [
            'matches' => 18,
            'items' => 15,
            'exchanges' => 12,
            'followers' => 203,
            'following' => 145,
            'rating' => 4.9
        ],
        'joinDate' => '2024-02-03'
    ],
    [
        'id' => 3,
        'firstName' => 'Laura',
        'lastName' => 'Pérez',
        'email' => 'laura@email.com',
        'age' => 23,
        'location' => 'Valencia, España',
        'styles' => ['streetwear', 'deportivo', 'casual'],
        'stats' => [
            'matches' => 31,
            'items' => 9,
            'exchanges' => 5,
            'followers' => 98,
            'following' => 67,
            'rating' => 4.7
        ],
        'joinDate' => '2024-03-10'
    ]
];

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener usuario específico
            $userId = intval($_GET['id']);
            $user = array_filter($users, function($u) use ($userId) {
                return $u['id'] === $userId;
            });
            
            if ($user) {
                echo json_encode(['success' => true, 'user' => array_values($user)[0]]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
            }
        } else {
            // Obtener todos los usuarios
            echo json_encode(['success' => true, 'users' => $users]);
        }
        break;
        
    case 'POST':
        // Crear nuevo usuario (ya manejado en auth.php)
        echo json_encode(['success' => false, 'message' => 'Usar auth.php para registro']);
        break;
        
    case 'PUT':
        // Actualizar usuario
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = intval($input['id']);
        
        // Buscar y actualizar usuario
        foreach ($users as &$user) {
            if ($user['id'] === $userId) {
                $user = array_merge($user, $input);
                echo json_encode(['success' => true, 'user' => $user]);
                exit;
            }
        }
        
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
        break;
        
    case 'DELETE':
        // Eliminar usuario
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = intval($input['id']);
        
        $users = array_filter($users, function($u) use ($userId) {
            return $u['id'] !== $userId;
        });
        
        echo json_encode(['success' => true, 'message' => 'Usuario eliminado']);
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
