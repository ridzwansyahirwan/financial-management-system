<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email'], $_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $hashedPassword = $user['password'];

            // Verify the entered password against the stored hash
            if (password_verify($password, $hashedPassword)) {
                echo json_encode(["message" => "Login successful"]);
            } else {
                echo json_encode(["error" => "Invalid password"]);
            }
        } else {
            echo json_encode(["error" => "Invalid email"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Missing required fields", "post_data" => $_POST]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
