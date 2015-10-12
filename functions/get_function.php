<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

    $function = $_POST['function_id'];

    if($get_functions = mysqli_query($con, "SELECT * FROM functions WHERE function_id = $function")) {
		while ($get_function = $get_functions->fetch_assoc()) {
			$function_name = $get_function['function_name'];
			echo $function_name;
		}
	}
?>