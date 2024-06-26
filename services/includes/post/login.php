<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email='$email'";

// $r = $conn->query($sql);
$result = $DB->login($sql);

if ($result == TRUE) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $user_data = $user['id'];
        $user_str = json_encode($user);
        echo json_encode(
            array(
                'success' => true,
                'message' => 'Login successful',
                'type' => 'login',
                'user' => $user_str
            )
        );
    } else {
        echo json_encode(array('error' => 'Invalid email or password'));
    }
} else {
    echo json_encode(array('error' => 'Invalid email or password'));
}
?>