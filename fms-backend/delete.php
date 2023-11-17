<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $expenseId = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM expenses WHERE id = ?");
    $stmt->bind_param("i", $expenseId);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Expense deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete expense"]);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>