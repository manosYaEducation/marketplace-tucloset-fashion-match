<?php
// Gestión del marketplace - simulación
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Datos simulados de productos
$products = [
    [
        'id' => 1,
        'name' => 'Vestido Elegante Negro',
        'category' => 'vestidos',
        'size' => 'M',
        'condition' => 'como-nuevo',
        'price' => 45.00,
        'type' => 'intercambio',
        'description' => 'Hermoso vestido negro, perfecto para ocasiones especiales. Solo usado una vez.',
        'userId' => 1,
        'userName' => 'María González',
        'images' => ['/placeholder.svg?height=300&width=250'],
        'createdAt' => '2024-01-20',
        'views' => 156,
        'likes' => 23
    ],
    [
        'id' => 2,
        'name' => 'Camisa Casual Azul',
        'category' => 'camisas',
        'size' => 'S',
        'condition' => 'bueno',
        'price' => 25.00,
        'type' => 'venta',
        'description' => 'Camisa casual perfecta para el día a día. Muy cómoda y versátil.',
        'userId' => 2,
        'userName' => 'Ana Martín',
        'images' => ['/placeholder.svg?height=300&width=250'],
        'createdAt' => '2024-01-22',
        'views' => 89,
        'likes' => 12
    ],
    [
        'id' => 3,
        'name' => 'Chaqueta Vintage',
        'category' => 'chaquetas',
        'size' => 'L',
        'condition' => 'vintage',
        'price' => 60.00,
        'type' => 'intercambio',
        'description' => 'Chaqueta vintage auténtica de los años 80. Pieza única y muy especial.',
        'userId' => 3,
        'userName' => 'Laura Pérez',
        'images' => ['/placeholder.svg?height=300&width=250'],
        'createdAt' => '2024-01-25',
        'views' => 234,
        'likes' => 45
    ]
];

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener producto específico
            $productId = intval($_GET['id']);
            $product = array_filter($products, function($p) use ($productId) {
                return $p['id'] === $productId;
            });
            
            if ($product) {
                echo json_encode(['success' => true, 'product' => array_values($product)[0]]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
            }
        } else {
            // Obtener todos los productos con filtros opcionales
            $filteredProducts = $products;
            
            // Aplicar filtros si existen
            if (isset($_GET['category']) && $_GET['category'] !== '') {
                $category = $_GET['category'];
                $filteredProducts = array_filter($filteredProducts, function($p) use ($category) {
                    return $p['category'] === $category;
                });
            }
            
            if (isset($_GET['size']) && $_GET['size'] !== '') {
                $size = $_GET['size'];
                $filteredProducts = array_filter($filteredProducts, function($p) use ($size) {
                    return $p['size'] === $size;
                });
            }
            
            if (isset($_GET['type']) && $_GET['type'] !== '') {
                $type = $_GET['type'];
                $filteredProducts = array_filter($filteredProducts, function($p) use ($type) {
                    return $p['type'] === $type;
                });
            }
            
            echo json_encode(['success' => true, 'products' => array_values($filteredProducts)]);
        }
        break;
        
    case 'POST':
        // Crear nuevo producto
        $input = json_decode(file_get_contents('php://input'), true);
        
        $newProduct = [
            'id' => count($products) + 1,
            'name' => $input['name'],
            'category' => $input['category'],
            'size' => $input['size'],
            'condition' => $input['condition'],
            'price' => floatval($input['price']),
            'type' => $input['type'],
            'description' => $input['description'],
            'userId' => $input['userId'],
            'userName' => $input['userName'],
            'images' => $input['images'] ?? [],
            'createdAt' => date('Y-m-d'),
            'views' => 0,
            'likes' => 0
        ];
        
        $products[] = $newProduct;
        
        echo json_encode(['success' => true, 'product' => $newProduct]);
        break;
        
    case 'PUT':
        // Actualizar producto
        $input = json_decode(file_get_contents('php://input'), true);
        $productId = intval($input['id']);
        
        foreach ($products as &$product) {
            if ($product['id'] === $productId) {
                $product = array_merge($product, $input);
                echo json_encode(['success' => true, 'product' => $product]);
                exit;
            }
        }
        
        echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
        break;
        
    case 'DELETE':
        // Eliminar producto
        $input = json_decode(file_get_contents('php://input'), true);
        $productId = intval($input['id']);
        
        $products = array_filter($products, function($p) use ($productId) {
            return $p['id'] !== $productId;
        });
        
        echo json_encode(['success' => true, 'message' => 'Producto eliminado']);
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
