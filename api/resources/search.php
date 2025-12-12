<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Resource.php';

$database = new Database();
$db = $database->getConnection();

$resource = new Resource($db);

$keywords = isset($_GET["q"]) ? $_GET["q"] : "";

$stmt = $resource->search($keywords);
$num = $stmt->rowCount();

if($num > 0) {
    $resources_arr = array();
    $resources_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $resource_item = array(
            "id" => $id,
            "title" => $title,
            "description" => $description,
            "file_url" => $file_url,
            "type" => $type,
            "user_id" => $user_id,
            "created_at" => $created_at
        );

        array_push($resources_arr["records"], $resource_item);
    }

    http_response_code(200);
    echo json_encode($resources_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No resources found."));
}