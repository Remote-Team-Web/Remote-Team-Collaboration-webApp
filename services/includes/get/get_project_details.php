<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');


$project_id = $_GET['project_id'];

$sql = "SELECT * FROM projects WHERE id='$project_id'";

$project = $DB->run_sql($sql)->fetch_assoc();

$sql = "SELECT * FROM tasks WHERE project_id='$project_id'";

$tasks = array();
while ($task = $DB->run_sql($sql)->fetch_assoc()) {
    $tasks[] = $task;
}

$sql = "SELECT users.id, users.username, project_users.role 
        FROM users 
        JOIN project_users ON users.id = project_users.user_id 
        WHERE project_users.project_id='$project_id' AND project_users.status = 'accepted'";

$users = array();
while ($user = $DB->run_sql($sql)->fetch_assoc()) {
    $users[] = $user;
}

$response = array(
    'project' => $project,
    'tasks' => $tasks,
    'users' => $users
);

echo json_encode($response);
