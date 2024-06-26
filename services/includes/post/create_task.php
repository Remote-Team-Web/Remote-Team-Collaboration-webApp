<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');


$title = $data['title'];
$description = $data['description'];
$due_date = $data['due_date'];
$project_id = $data['project_id'];
$user_id = $data['user_id']; // ID of the user to whom the task is assigned


$sql = "INSERT INTO tasks (title, description, status, due_date, project_id, user_id) 
    VALUES ('$title', '$description', 'backlog', '$due_date', '$project_id', '$user_id')";
$result = $DB->sql_query_run($sql);
if ($result) {

    // Add notification for the assigned user
    $message = "You have been assigned a new task: $title";
    $notif_sql = "INSERT INTO notifications (user_id, message) VALUES ('$user_id', '$message')";
    $DB->run_sql($notif_sql);

    echo json_encode(
        array(
            'success' => true,
            'projectId' => $project_id,
            'message' => 'Task created successfully',
            'type' => 'create_task'
        )
    );
} else {
    echo json_encode(array('error' => 'Error to connect to Database '));
}
