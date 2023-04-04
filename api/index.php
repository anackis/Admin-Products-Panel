<?php

header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

// echo "<script>console.log('Testing' );</script>";
// echo "Testing";

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
// var_dump($conn);

// $user = print_r(file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
  case "GET":
    $sql = "SELECT * FROM products";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($path[3]) && is_numeric($path[3])) {
      $sql .= " WHERE id = :id";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':id', $path[3]);
      $stmt->execute();
      $products = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    echo json_encode($products);
    break;

  case "POST": 


    $product = json_decode( file_get_contents('php://input') );
    $sql = "INSERT INTO products(id, sku, name, price, size, height, width, length, weight) VALUES(null, :sku, :name, :price, :size, :height, :width, :length, :weight)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':sku', $product->sku);
    $stmt->bindParam(':name', $product->name);
    $stmt->bindParam(':price', $product->price);
    $stmt->bindParam(':size', $product->size);
    $stmt->bindParam(':height', $product->height);
    $stmt->bindParam(':width', $product->width);
    $stmt->bindParam(':length', $product->length);
    $stmt->bindParam(':weight', $product->weight);
    if ($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
      $response = ['status' => 0, 'message' => 'Failed to created record!'];
    }
    break;

  case "DELETE":
    $sql = "DELETE FROM products WHERE id = :id";
    $path = explode('/', $_SERVER['REQUEST_URI']);

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $path[3]);

    if($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to delete record.'];
    }
    echo json_encode($response);
    break;
}

