<?php
require_once ("classes/database.php");

$DB = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    $type = $data['type'];

    if ($type == "login") {
        include ("includes/post/login.php");
    } else if ($type == "register") {
        include ("includes/post/register.php");
    } else if ($type == "create_project") {
        include ("includes/post/create_project.php");
    } else if ($type == "create_task") {
        include ("includes/post/create_task.php");
    } else if ($type == "zoom_link") {
        include ("includes/post/create_zoomlink.php");
    } else if ($type == "invite_user") {
        include ("includes/post/invite_user.php");
    } else if ($type == "respond_invitation") {
        include ("includes/post/respond_invitation.php");
    } else if ($type == "update_project") {
        include ("includes/post/update_project.php");
    } else if ($type == "update_task") {
        include ("includes/post/update_task_status.php");
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET["type"])) {
        if ($_GET["type"] == "project_list") {
            include ("includes/get/get_projects.php");
        } else if ($_GET["type"] == "get_workon_projects") {
            include ("includes/get/work_on/get_workon_projects.php");
        } else if ($_GET["type"] == "invited_projects") {
            include ("includes/get/invited_projects.php");
        } else if ($_GET["type"] == "get_user_message") {
            include ("includes/get/get_user_message.php");
        } else if ($_GET["type"] == "get_users") {
            include ("includes/get/get_user_details.php");
        }
    }

    // if (isset($_GET["project_id"])) {

    //     include ("includes/get/get_project_details.php");
    // }
    if (isset($_GET["project_id"])) {

        include ("includes/get/fetch_messages.php");
    }

}


