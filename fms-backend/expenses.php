<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM expenses";
    $result = $conn->query($sql);

    if ($result) {
        $expenses = array();
        while ($row = $result->fetch_assoc()) {
            $expenses[] = $row;
        }

        echo json_encode($expenses);
    } else {
        echo json_encode(["error" => "Failed to fetch expenses"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>