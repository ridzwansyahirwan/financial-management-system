<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $timeFrame = isset($_GET['timeFrame']) ? $_GET['timeFrame'] : 'day';
    $selectedMonth = isset($_GET['selectedMonth']) ? $_GET['selectedMonth'] : date('m'); // Default to current month

    if ($timeFrame === 'year') {
        $selectedYear = date('Y');
        $sql = "SELECT MONTH(date) as month, SUM(amount) as totalAmount FROM expenses WHERE YEAR(date) = $selectedYear GROUP BY MONTH(date)";
    } else {
        $sql = "SELECT * FROM expenses WHERE MONTH(date) = $selectedMonth";
    }

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $expenseData = array();
        while ($row = $result->fetch_assoc()) {
            $expenseData[] = $row;
        }

        echo json_encode(['expenseData' => $expenseData]);
    } else {
        echo json_encode(['error' => 'No expense data found']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}


$conn->close();
?>
