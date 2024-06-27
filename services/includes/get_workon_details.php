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

$sql = "SELECT * FROM projects WHERE id='$project_id'";
$project_result = $conn->query($sql);

$project = $project_result->fetch_assoc();

$sql = "SELECT * FROM tasks WHERE user_id='$user_id' AND project_id = '$project_id'";
$tasks_result = $conn->query($sql);

$tasks = array();
while ($task = $tasks_result->fetch_assoc()) {
    $tasks[] = $task;
}

$sql = "SELECT users.id, users.username, users.role,users.profile_image 
        FROM users 
        JOIN project_users ON users.id = project_users.user_id 
        WHERE project_users.project_id='$project_id' AND project_users.status = 'accepted'";
$users_result = $conn->query($sql);

$users = array();
while ($user = $users_result->fetch_assoc()) {
    $users[] = $user;
}

$response = array(
    'project' => $project,
    'tasks' => $tasks,
    'users' => $users
);

echo json_encode($response);

$conn->close();
?>