<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['date'], $_POST['category'], $_POST['amount'])) {
        $month = $_POST['date'];
        $year = date("Y"); 
        $date = $year . "-" . $month . "-01"; 

        $category = $_POST['category'];
        $amount = $_POST['amount'];

        $stmt = $conn->prepare("INSERT INTO budget (date, category, amount) VALUES (?, ?, ?)");
        $stmt->bind_param("ssd", $date, $category, $amount);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Insert data successful"]);
        } else {
            echo json_encode(["error" => "Error inserting data"]);
        }
    } else {
        echo json_encode(["error" => "Missing required fields"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>