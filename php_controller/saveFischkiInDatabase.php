<?php
include "../db/database_login.php";

session_start();

$body = file_get_contents('php://input');
$data = json_decode($body);

//echo print_r($data);

$category_name = $data[0];
$category_name_en = $data[1];
$category_name_de = $data[2];

$insert_into = "INSERT INTO bank_of_sets(name_of_the_set, name_of_the_set_de, name_of_the_set_en, member_id, access) VALUES('";
$insert_into .= $category_name."','".$category_name_de."','".$category_name_en."','1','0');";

$conn->query($insert_into);

$set_id = $conn->insert_id;

for ($i=3; $i < 10; $i++) {
    $objects = $data[$i];
    $insert_into = "INSERT INTO set_of_objects(set_id, text, text_de, text_en, picture) VALUES('";
    $insert_into .= $set_id."','".$objects->{"description"}."','".$objects->{"description_de"}."','";
    $insert_into .= $objects->{"description_en"}."','".$objects->{"picture"}."');";

    //echo $insert_into."<br/>";
    $conn->query($insert_into);
}

header('Content-Type: application/json');
echo json_encode($category_name);
?>