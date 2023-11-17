<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['date'], $_POST['name'], $_POST['category'], $_POST['amount'])) {
        $date = $_POST['date'];
        $name = $_POST['name'];
        $category = $_POST['category'];
        $amount = $_POST['amount'];
        
        $stmt = $conn->prepare("INSERT INTO expenses (date, name, category, amount) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssd", $date, $name, $category, $amount);

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