<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('error' => 'Connection failed: ' . $conn->connect_error)));
}

$project_id = $_GET['project_id'];
$user_id = $_SESSION['user_id'];

$sql = "SELECT discussions.message, discussions.file_path, users.username,users.id, discussions.created_at, users.profile_image
        FROM discussions 
        JOIN users ON discussions.user_id = users.id 
        WHERE discussions.project_id = '$project_id' 
        ORDER BY discussions.created_at ASC";

$result = $conn->query($sql);

$messages = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

echo json_encode(
    array(
        'messages' => $messages,
        'user_id' => $user_id
    )
);

$conn->close();
?>