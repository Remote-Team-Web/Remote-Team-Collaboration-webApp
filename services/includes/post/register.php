<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');


$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$profile_image = "../../ui/image/default.jpg"; // Placeholder for profile image upload

$sql = "INSERT INTO users (username, email, password, profile_image) VALUES ('$username', '$email', '$password', '$profile_image')";

$result = $DB->sql_query_run($sql);

if ($result) {
    echo json_encode(
        array(
            'success' => true,
            'message' => 'User registered successfully',
            'type' => 'register'
        )
    );
} else {
    echo json_encode(array('error' => 'Error: Database error'));
}
