<?php	
	include('db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");



	$serialized = serialize($array);
		    	
	echo '123';
/*
	mysqli_query($con, "INSERT INTO rewards (
		reward_id,
		reward_chance,
		reward,
		reward_tier
	) VALUES (
		NULL, 
		10,
		$serialized,
		1
	);");
	*/
?>