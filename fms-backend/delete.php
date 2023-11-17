<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 3600");
    exit();
}

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $expenseId = $_GET['id'];
    
    $stmt = $conn->prepare("DELETE FROM expenses WHERE id = ?");
    $stmt->bind_param("i", $expenseId);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Expense deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete expense"]);
    }
    $stmt->close();
} else {
    http_response_code(405); 
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
