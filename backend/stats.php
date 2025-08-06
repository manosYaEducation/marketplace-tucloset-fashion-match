<?php
// Estadísticas de la plataforma - simulación
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Datos simulados de estadísticas
$stats = [
    'general' => [
        'totalUsers' => 1247,
        'totalMatches' => 3456,
        'totalItems' => 892,
        'totalTransactions' => 567,
        'activeUsers' => 234,
        'newUsersToday' => 12,
        'matchesToday' => 45,
        'transactionsToday' => 8
    ],
    'userGrowth' => [
        ['month' => 'Enero', 'users' => 156],
        ['month' => 'Febrero', 'users' => 234],
        ['month' => 'Marzo', 'users' => 312],
        ['month' => 'Abril', 'users' => 445],
        ['month' => 'Mayo', 'users' => 678],
        ['month' => 'Junio', 'users' => 892]
    ],
    'categories' => [
        ['name' => 'Vestidos', 'percentage' => 35, 'count' => 312],
        ['name' => 'Camisas', 'percentage' => 28, 'count' => 250],
        ['name' => 'Pantalones', 'percentage' => 22, 'count' => 196],
        ['name' => 'Zapatos', 'percentage' => 15, 'count' => 134]
    ],
    'styles' => [
        ['name' => 'Casual', 'users' => 456],
        ['name' => 'Elegante', 'users' => 389],
        ['name' => 'Vintage', 'users' => 234],
        ['name' => 'Minimalista', 'users' => 198],
        ['name' => 'Bohemio', 'users' => 167],
        ['name' => 'Streetwear', 'users' => 145]
    ],
    'recentActivity' => [
        [
            'type' => 'user_registered',
            'message' => 'Nuevo usuario registrado',
            'details' => 'Ana Martín se unió a la plataforma',
            'timestamp' => '2024-01-28 14:30:00'
        ],
        [
            'type' => 'match',
            'message' => 'Match realizado',
            'details' => 'María y Carmen hicieron match',
            'timestamp' => '2024-01-28 13:45:00'
        ],
        [
            'type' => 'item_published',
            'message' => 'Nueva prenda publicada',
            'details' => 'Laura publicó un vestido vintage',
            'timestamp' => '2024-01-28 12:20:00'
        ],
        [
            'type' => 'transaction',
            'message' => 'Intercambio completado',
            'details' => 'Sofia y Elena completaron un intercambio',
            'timestamp' => '2024-01-28 11:15:00'
        ]
    ],
    'reports' => [
        [
            'type' => 'inappropriate_content',
            'message' => 'Contenido inapropiado',
            'details' => 'Publicación reportada por usuario',
            'status' => 'pending',
            'timestamp' => '2024-01-28 10:30:00'
        ],
        [
            'type' => 'suspicious_user',
            'message' => 'Usuario sospechoso',
            'details' => 'Múltiples reportes del mismo usuario',
            'status' => 'pending',
            'timestamp' => '2024-01-28 09:45:00'
        ],
        [
            'type' => 'user_query',
            'message' => 'Consulta de usuario',
            'details' => 'Problema con transacción',
            'status' => 'pending',
            'timestamp' => '2024-01-28 08:20:00'
        ]
    ]
];

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['type'])) {
        $type = $_GET['type'];
        if (isset($stats[$type])) {
            echo json_encode(['success' => true, 'data' => $stats[$type]]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Tipo de estadística no encontrado']);
        }
    } else {
        // Devolver todas las estadísticas
        echo json_encode(['success' => true, 'data' => $stats]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
