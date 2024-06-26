<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');


$user_id = $_SESSION['user_id'];

$sql = "SELECT projects.id, projects.name, projects.description, projects.created_at FROM projects 
        WHERE projects.user_id = '$user_id'";

$projects = $DB->get_data($sql);


echo json_encode(array('projects' => $projects));
