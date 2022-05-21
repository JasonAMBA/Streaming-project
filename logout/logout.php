<?php

session_start();
require_once("../utils/streamingdb.php");

$_SESSION['connected']= false;
unset($_SESSION['id_user']);

echo json_encode(['success' => true]);

?>