<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 3600");
    exit();
}

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $expenseId = $_GET['id'];
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (isset($requestData['name']) && isset($requestData['amount'])) {
        $updatedName = $requestData['name'];
        $updatedAmount = $requestData['amount'];
        
        $stmt = $conn->prepare("UPDATE expenses SET name = ?, amount = ? WHERE id = ?");
        $stmt->bind_param("sdi", $updatedName, $updatedAmount, $expenseId);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Name and amount updated successfully"]);
        } else {
            echo json_encode(["error" => "Failed to update name and amount"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["error" => "Name and amount fields are required"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
