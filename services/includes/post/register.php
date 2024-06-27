<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$role = $data['role'];
$fname = $data['fname'];
$lname = $data['lname'];
$pnumber = $data['pnumber'];
$profile_image = "../../ui/image/default.jpg"; // Placeholder for profile image upload

// Check if username already exists
$username_check_sql = "SELECT * FROM users WHERE username = '$username'";
$username_check_result = $DB->sql_query_run($username_check_sql);

if ($DB->checkRow($username_check_sql)) {
    echo json_encode(array('error' => 'Username already taken'));
    exit();
}

// Insert new user
$sql = "INSERT INTO users (username, first_name, last_name, role, phone_number, email, password, profile_image) VALUES ('$username', '$fname', '$lname', '$role', '$pnumber', '$email', '$password', '$profile_image')";
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
?>