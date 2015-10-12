<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

    $event_id = $_POST['event_id'];
    $event_id = intval($event_id);
    $function = '';

    if($get_event_functions = mysqli_query($con, "SELECT * FROM event_functions WHERE event_id = $event_id")) {
		while ($event_function = $get_event_functions->fetch_assoc()) {
			$function_id = $event_function['function_id'];
			$function = $function_id;
		}
	}

	echo $function;
	
?>