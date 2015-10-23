<?php	
	include('db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");


    $array(
    	'name' => 'Unknown Potion',
    	'type' => 'modifier',
    	'stats' => array(
    		'health' => -1,
    		'attack' => 0,
    		'defence' => 0,
    		'move' => 1
		),
		'image' => 'unknown_potion.png'
	);

	$serialized = serialize($array);
		    	
	mysqli_query($con, "INSERT INTO rewards (
		reward_id,
		reward_chance,
		reward,
		reward_tier
	) VALUES (
		NULL, 
		1,
		$serialized,
		1
	);");

	echo '321';
?>