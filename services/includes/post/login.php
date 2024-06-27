<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$username = $data['username'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE username='$username'";

// $r = $conn->query($sql);
$result = $DB->login($sql);

if ($result == TRUE) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
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
        echo json_encode(array('error' => 'Invalid username or password'));
    }
} else {
    echo json_encode(array('error' => 'Invalid username or password'));
}
?>