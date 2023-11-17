<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT MONTH(date) AS month, category, SUM(amount) AS total_amount 
            FROM budget 
            WHERE YEAR(date) = '2023' 
            GROUP BY MONTH(date), category";

    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            $expenses = array();
            while ($row = $result->fetch_assoc()) {
                $expenses[] = $row;
            }
            echo json_encode($expenses);
        } else {
            echo json_encode(["message" => "No expenses found for 2023"]);
        }
    } else {
        echo json_encode(["error" => "Failed to fetch expenses: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
