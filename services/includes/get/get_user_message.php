<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');


$user_id = $_SESSION['user_id'];


$sql = "SELECT notifications.message, notifications.created_at 
        FROM notifications WHERE user_id = '$user_id' AND is_read = '0'";


$result = $DB->get_invitaion($sql);
if (is_array($result)) {
    $message = $result[0];
    $total = $result[1];
    echo json_encode(
        array(
            'messages' => $message,
            'unseen' => $total
        )
    );
} else {
    echo json_encode(array('error' => 'No Notification here'));
}

