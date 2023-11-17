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
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id']) || !isset($data['date']) || !isset($data['name']) || !isset($data['category']) || !isset($data['amount'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }

    $expenseId = $data['id'];
    $updatedDate = $data['date'];
    $updatedName = $data['name'];
    $updatedCategory = $data['category'];
    $updatedAmount = $data['amount'];

    $stmt = $conn->prepare("UPDATE expenses SET date = ?, name = ?, category = ?, amount = ? WHERE id = ?");
    $stmt->bind_param("sssdi", $updatedDate, $updatedName, $updatedCategory, $updatedAmount, $expenseId);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Expense updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update expense"]);
    }
    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
