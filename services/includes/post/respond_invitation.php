<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');


$project_id = $data['project_id'];
$user_id = $_SESSION['user_id'];
$status = $data['status'];

$sql = "UPDATE project_users SET status='$status' WHERE project_id='$project_id' AND user_id='$user_id'";
$result = $DB->sql_query_run($sql);
if ($result === TRUE) {
    echo json_encode(
        array(
            'success' => true,
            'type' => 'respond_invitation',
            'message' => 'Response submitted successfully!'
        )
    );
} else {
    echo json_encode(array('error' => 'Error to connect to the Database '));
}
