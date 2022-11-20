<?php
define('DBSERVER', 'localhost:3306'); // Database server
define('DBUSERNAME', 'root'); // Database username
define('DBPASSWORD', 'av09900990'); // Database password
define('DBNAME', 'sota'); // Database name

/* connect to MySQL database */
$db = mysqli_connect(DBSERVER, DBUSERNAME, DBPASSWORD, DBNAME);

// Check db connection
if($db === false){
    die("Error: connection error. " . mysqli_connect_error());
}
?>