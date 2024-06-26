<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$project_id = $data['project_id'];
$name = $data['name'];
$description = $data['description'];

$sql = "UPDATE projects SET name='$name', description='$description' WHERE id='$project_id'";
$result = $DB->sql_query_run($sql);

if ($result === TRUE) {
    echo json_encode(
        array(
            'success' => true,
            'message' => 'Project updated successfully!',
            'type' => 'update_project'
        )
    );
} else {
    echo json_encode(array('error' => 'Error to connect to the database '));
}
