<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');


$title = $data['title'];
$project_id = $data['project_id'];
$user_id = $_SESSION['user_id']; // Ensure the session is started and user is authenticated


$check_sql = "SELECT * FROM zoom_links WHERE project_id = '$project_id'";
$result = $DB->sql_query_run($check_sql);

if ($DB->checkRow($check_sql)) {
    $update_sql = "UPDATE zoom_links SET title = '$title', user_id = '$user_id' WHERE project_id = '$project_id'";
    $update_result = $DB->sql_query_run($update_sql);
    if ($update_result) {
        echo json_encode(
            array(
                'success' => true,
                'message' => 'Link updated successfully',
                'type' => 'zoom_link'
            )
        );
    } else {
        echo json_encode(array('error' => 'Error updating the link in the database'));
    }
} else {
    $insert_sql = "INSERT INTO zoom_links (project_id, title, user_id) VALUES ('$project_id', '$title', '$user_id')";
    $insert_result = $DB->sql_query_run($insert_sql);
    if ($insert_result) {
        echo json_encode(
            array(
                'success' => true,
                'message' => 'Link created successfully',
                'type' => 'zoom_link'
            )
        );
    } else {
        echo json_encode(array('error' => 'Error inserting the link into the database'));
    }
}
?>