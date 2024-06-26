<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');


$project_id = $data['project_id'];
$user_id = $data['user_id'];

if ($_SESSION['user_id'] != $user_id) {
    $sql = "SELECT * FROM project_users WHERE project_id = '$project_id' AND user_id = '$user_id'";
    $check = $DB->check($sql);
    if ($check) {
        $sql = "INSERT INTO project_users (project_id, user_id, role) VALUES ('$project_id', '$user_id', 'member')";
        $result = $DB->sql_query_run($sql);
        if ($result === TRUE) {
            echo json_encode(
                array(
                    'success' => true,
                    'type' => "invite_user",
                    'message' => "User invited successfully!"
                )
            );
        } else {
            echo json_encode(array('error' => 'Invalid User!'));
        }

    } else {
        $sql = "SELECT * FROM project_users WHERE project_id = '$project_id' AND user_id = '$user_id' and status = 'declined'";
        $check = $DB->check($sql);
        if ($check) {
            echo json_encode(
                array(
                    'success' => true,
                    'type' => "invite_user",
                    'message' => 'User is already invited'
                )
            );
        } else {
            $sql = "UPDATE project_users SET status='pending' WHERE project_id='$project_id' AND user_id='$user_id'";
            $result = $DB->sql_query_run($sql);
            if ($result === TRUE) {
                echo json_encode(
                    array(
                        'success' => true,
                        'type' => "invite_user",
                        'message' => 'Re-Invitaion Sended!'
                    )
                );
            }
        }
    }


} else {
    echo json_encode(
        array(
            'success' => true,
            'type' => "invite_user",
            'message' => 'Project Manager Cannot be Invited'
        )
    );
}