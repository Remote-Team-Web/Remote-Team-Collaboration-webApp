<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');


$user_id = $_SESSION['user_id'];

$sql = "SELECT projects.id, projects.name, projects.description, projects.created_at
        FROM projects 
        JOIN project_users ON projects.id = project_users.project_id 
        WHERE project_users.user_id = '$user_id' AND project_users.status = 'accepted'";


$projects = $DB->get_data($sql);


echo json_encode(array('projects' => $projects));
