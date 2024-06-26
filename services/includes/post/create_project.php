<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');


$project_name = $data['name'];
$project_description = $data['description'];
$created_by = $_SESSION['user_id'];
$users = $data['users'];

$sql = "INSERT INTO projects (name, description, user_id) 
VALUES ('$project_name', '$project_description', '$created_by')";

$result = $DB->sql_query_run($sql);

if ($result) {
    foreach ($users as $uid) {
        $user_id = $uid;
        if ($created_by == $user_id) {
            continue;
        }
        $sql = "INSERT INTO project_users (user_id, role) VALUES ('$user_id','member')";
        $DB->run_sql($sql);
    }

    echo json_encode(
        array(
            'success' => true,
            'message' => 'Project created successfully',
            'type' => 'create_project'
        )
    );
} else {
    echo json_encode(array('error' => 'Error to Connect to the Database'));
}
