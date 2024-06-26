<?php
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

$data = json_decode(file_get_contents("php://input"), true);

$task_id = $conn->real_escape_string($data['task_id']);
$status = $conn->real_escape_string($data['status']);

$sql = "UPDATE tasks SET status='$status' WHERE id='$task_id'";

if ($conn->query($sql) === TRUE) {
    
    $task_sql = "SELECT title, user_id FROM tasks WHERE id='$task_id'";
    $result = $conn->query($task_sql);
    $task = $result->fetch_assoc();

    $message = "The status of your task '{$task['title']}' has been updated to '$status'";
    $notif_sql = "INSERT INTO notifications (user_id, message) VALUES ('{$task['user_id']}', '$message')";
    $conn->query($notif_sql);

    echo json_encode(array('success' => 'Task status updated successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $conn->error));
}

$conn->close();
?>