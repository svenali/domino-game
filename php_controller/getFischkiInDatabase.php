<?php
include "../db/database_login.php";

session_start();

$body = file_get_contents('php://input');
$data = json_decode($body);

//var_dump($data);

$select = "SELECT picture FROM set_of_objects WHERE set_id=".$data->set_id;

//echo $select;

$result = $conn->query($select);

$answer = array();

while ($d = $result->fetch_assoc()) {
    $answer[] = $d["picture"];
}

header('Content-Type: application/json');
echo json_encode($answer);
?>