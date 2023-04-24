<?php

header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';

class Product {
  public $sku;
  public $name;
  public $price;

  public function __construct($sku, $name, $price) {
    $this->sku = $sku;
    $this->name = $name;
    $this->price = $price;
  }
}

class DVD extends Product {
  public $size;

  public function __construct($sku, $name, $price, $size) {
    parent::__construct($sku, $name, $price);
    $this->size = $size;
  }
}

class Book extends Product {
  public $weight;

  public function __construct($sku, $name, $price, $weight) {
    parent::__construct($sku, $name, $price);
    $this->weight = $weight;
  }
}

class Furniture extends Product {
  public $height;
  public $width;
  public $length;

  public function __construct($sku, $name, $price, $height, $width, $length) {
    parent::__construct($sku, $name, $price);
    $this->height = $height;
    $this->width = $width;
    $this->length = $length;
  }
}

class ProductController {
  private $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function getAllProducts() {
    $sql = "SELECT * FROM products";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getProductById($id) {
    $sql = "SELECT * FROM products WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function addProduct($product) {
    $sql = "INSERT INTO products(id, sku, name, price, size, height, width, length, weight) VALUES(null, :sku, :name, :price, :size, :height, :width, :length, :weight)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':sku', $product->sku);
    $stmt->bindParam(':name', $product->name);
    $stmt->bindParam(':price', $product->price);
    $stmt->bindParam(':size', $product->size);
    $stmt->bindParam(':height', $product->height);
    $stmt->bindParam(':width', $product->width);
    $stmt->bindParam(':length', $product->length);
    $stmt->bindParam(':weight', $product->weight);
    return $stmt->execute();
  }

  public function deleteProduct($id) {
    $sql = "DELETE FROM products WHERE id = :id";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    return $stmt->execute();
  }
}

$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
$productController = new ProductController($conn);

switch ($method) {
  case "GET":
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[3]) && is_numeric($path[3])) {
      $products = $productController->getProductById($path[3]);
    } else {
      $products = $productController->getAllProducts();
    }
    echo json_encode($products);
    break;

  case "POST":
    $product = json_decode(file_get_contents('php://input'));
    if ($productController->addProduct($product)) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
      $response = ['status' => 0, 'message' => 'Failed to create record!'];
    }
    echo json_encode($response);
    break;

  case "DELETE":
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if ($productController->deleteProduct($path[3])) {
      $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
    } else {
      $response = ['status' => 0, 'message' => 'Failed to delete record.'];
    }
    echo json_encode($response);
    break;
}