<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Resource.php';

$database = new Database();
$db = $database->getConnection();

$resource = new Resource($db);

if(isset($_FILES['file'])) {
    $target_dir = "../uploads/";
    $file_extension = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));
    $new_filename = uniqid() . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;

    $allowed_types = array('pdf', 'jpg', 'jpeg', 'png');
    if(!in_array($file_extension, $allowed_types)) {
        http_response_code(400);
        echo json_encode(array("message" => "Sorry, only PDF, JPG, JPEG & PNG files are allowed."));
        exit();
    }

    if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $resource->title = $_POST['title'];
        $resource->description = $_POST['description'];
        $resource->file_url = $new_filename;
        $resource->type = $file_extension;
        $resource->user_id = $_POST['user_id'];

        if($resource->create()) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "Resource was uploaded successfully.",
                "file_url" => $new_filename
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to upload resource."));
        }
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Sorry, there was an error uploading your file."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "No file was uploaded."));
}