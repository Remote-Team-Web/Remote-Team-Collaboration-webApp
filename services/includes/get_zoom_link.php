<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('error' => 'Connection failed: ' . $conn->connect_error)));
}

$project_id = $_GET['project_id'];
$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM zoom_links WHERE project_id='$project_id' and user_id='$user_id'";
$result = $conn->query($sql);

$link = $result->fetch_assoc();

$response = array(
    'link' => $link
);


echo json_encode($response);

$conn->close();
?>