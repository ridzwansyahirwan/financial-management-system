<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $currentYear = date('Y');

    $sql = "SELECT MONTH(date) as month, SUM(amount) as totalAmount FROM budget WHERE YEAR(date) = $currentYear GROUP BY MONTH(date)";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $budgetData = array();
        while ($row = $result->fetch_assoc()) {
            $budgetData[] = $row;
        }

        echo json_encode(['budgetData' => $budgetData]);
    } else {
        echo json_encode(['error' => 'No budget data found for the current year']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$conn->close();
?>
