<?php
$servername = "localhost";
$username = "root";
$password = "shahat 98";
// Create connection
$conn = new mysqli($servername, $username, $password,"mydb");
// Create database
$sql = "CREATE DATABASE if not exists myDB";
$conn->query($sql);
echo $conn->error;
//create loads table
$sql = "CREATE TABLE if not exists loads (
    targets text,
    dates text
    )";
$conn->query($sql);
echo $conn->error;
//create submits table
$sql = "CREATE TABLE if not exists submits (
    targets text,
    dates text
    )";
$conn->query($sql);
echo $conn->error;
//create clicks table
$sql = "CREATE TABLE if not exists clicks (
    chars text,
    dates text
    )";
$conn->query($sql);
echo $conn->error;
if (isset($_POST['loading'])){
    $lod =json_decode($_POST['loading'],true);
   for ($i =0;$i<count($lod["date"]);$i++)
   {
        $strDate="'".strval($lod["date"][$i])."'";
        $strTar= "'".strval($lod["target"][$i])."'";
        $sql = "INSERT INTO loads (targets,dates)
        VALUES ($strTar , $strDate)";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
         }else {
              echo "Error: " . $sql . "<br>" . $conn->error;
             }
   }

}

//
if (isset($_POST['submiting'])){
    $lod =json_decode($_POST['submiting'],true);
   for ($i =0;$i<count($lod["date"]);$i++)
   {
        $strDate="'".strval($lod["date"][$i])."'";
        $strTar= "'".strval($lod["target"][$i])."'";
        $sql = "INSERT INTO submits (targets,dates)
        VALUES ($strTar , $strDate)";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
         }else {
              echo "Error: " . $sql . "<br>" . $conn->error;
             }
   }

}

//

if (isset($_POST['clicking'])){
    $lod =json_decode($_POST['clicking'],true);
   for ($i =0;$i<count($lod["date"]);$i++)
   {
        $strDate="'".strval($lod["date"][$i])."'";
        $strTar= "'".strval($lod["char"][$i])."'";
        $sql = "INSERT INTO clicks (chars,dates)
        VALUES ($strTar , $strDate)";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
         }else {
              echo "Error: " . $sql . "<br>" . $conn->error;
             }
   }
}
$all=array();
$sql = "SELECT targets,dates FROM loads";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $ret=array();
    while($row = $result->fetch_assoc()) {
        array_push($ret,$row);
    }
    array_push($all,$ret);
}

//
$sql = "SELECT targets,dates FROM submits";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $ret=array();
    while($row = $result->fetch_assoc()) {
        array_push($ret,$row);
    }
    array_push($all,$ret);
}
//
$sql = "SELECT chars,dates FROM clicks";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $ret=array();
    while($row = $result->fetch_assoc()) {
        array_push($ret,$row);
    }
    array_push($all,$ret);
}
$all=json_encode($all);
echo $all;
?>