<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "fms_db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Do not close the connection here

// You may optionally print the success message, but it's not necessary
// echo "Connected successfully";
// Do not close the connection here
?>
