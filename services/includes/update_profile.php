<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(array('error' => 'Connection failed: ' . $conn->connect_error));
    exit();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(array('error' => 'User not logged in'));
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $conn->real_escape_string($_POST['username']);
$email = $conn->real_escape_string($_POST['email']);
$profile_image = isset($_FILES['profile_image']) ? $_FILES['profile_image'] : null;

if ($profile_image && $profile_image['error'] === UPLOAD_ERR_OK) {
    $target_dir = "../../ui/image/uploads/";
    $target_file = $target_dir . basename($profile_image["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file is an actual image
    $check = getimagesize($profile_image["tmp_name"]);
    if ($check !== false) {
        if (move_uploaded_file($profile_image["tmp_name"], $target_file)) {
            // Update user profile with new image path
            $sql = "UPDATE users SET username='$username', email='$email', profile_image='$target_file' WHERE id='$user_id'";
        } else {
            echo json_encode(array('error' => 'Sorry, there was an error uploading your file.'));
            exit();
        }
    } else {
        echo json_encode(array('error' => 'File is not an image.'));
        exit();
    }
} elseif ($profile_image && $profile_image['error'] !== UPLOAD_ERR_NO_FILE) {
    echo json_encode(array('error' => 'File upload error.'));
    exit();
} else {
    // Update user profile without changing image
    $sql = "UPDATE users SET username='$username', email='$email' WHERE id='$user_id'";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => 'Profile updated successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $conn->error));
}

$conn->close();
?>