<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $timeFrame = isset($_GET['timeFrame']) ? $_GET['timeFrame'] : 'day';

    if ($timeFrame === 'day') {
        $sql = "SELECT SUM(amount) as totalExpense FROM expenses WHERE DATE(date) = CURDATE()";
    } elseif ($timeFrame === 'month') {
        $selectedMonth = isset($_GET['selectedMonth']) ? $_GET['selectedMonth'] : date('m'); 
        $sql = "SELECT SUM(amount) as totalExpense FROM expenses WHERE MONTH(date) = $selectedMonth";
    } elseif ($timeFrame === 'year') {
        $sql = "SELECT SUM(amount) as totalExpense FROM expenses WHERE YEAR(date) = YEAR(CURDATE())";
    } else {
        echo json_encode(['error' => 'Invalid time frame']);
        exit;
    }

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $totalExpense = $row['totalExpense'];
    
        echo json_encode(['totalExpense' => $totalExpense]);
    } else {
        echo json_encode(['totalExpense' => 0]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}



$conn->close();
?>