<?php	
	include('db-details.php');
	$mysqli = new mysqli("localhost","$u","$p","$db");
    $con = mysqli_connect("localhost","$u","$p","$db");

    $array = array(
    	'name' => 'Spooky Scary Sallet',
    	'type' => 'helmet',
    	'stats' => array(
    		'health' => -5,
    		'attack' => 0,
    		'defence' => 6,
    		'move' => 2
		)
	);
    $array['image'] = strtolower(str_replace(' ', '_', $array['name'])).'.png';
	$serialized = serialize($array);
        	
	if(!mysqli_query($con, "INSERT INTO rewards (
		reward_id,
		reward_chance,
		reward,
		reward_tier
	) VALUES (
		NULL, 
		1,
		'$serialized',
		2
	);")){
		echo $con->error;
	}
	
	;
?>