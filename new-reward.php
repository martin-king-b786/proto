<?php	
	include('db-details.php');
	$mysqli = new mysqli("localhost","$u","$p","$db");
    $con = mysqli_connect("localhost","$u","$p","$db");

	$array = array(
		"name" => "Genuine Suit of Armour?",
		"type" => "armour",
		"stats" => array(
			"health" => '4',
			"defence" => '0',
			"attack" => '0',
			"move" => '0'
		)
	);

	$serialized = serialize($array);
        	
	if(!mysqli_query($con, "INSERT INTO rewards (
		reward_id,
		reward_chance,
		reward,
		reward_tier
	) VALUES (
		NULL, 
		2,
		'$serialized',
		1
	);")){
		echo $con->error;
	}
	
	;
?>