<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('error' => 'Connection failed: ' . $conn->connect_error)));
}

$user_id = $_SESSION['user_id'];
$project_id = $_POST['project_id'];
$message = isset($_POST['message']) ? $_POST['message'] : '';
$file_path = null;

if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
    $target_dir = "../../ui/image/uploads/";
    $file_name = basename($_FILES["file"]["name"]);
    $target_file = $target_dir . time() . "_" . $file_name;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $file_path = $target_file;
    } else {
        echo json_encode(array('error' => 'File upload failed'));
        exit();
    }
}

$message = $conn->real_escape_string($message);
$sql = "INSERT INTO discussions (project_id, user_id, message, file_path) VALUES ('$project_id', '$user_id', '$message', '$file_path')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => 'Message and file sent'));
} else {
    echo json_encode(array('error' => 'Error: ' . $conn->error));
}

$conn->close();
?>