<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");
    $terrain_id = $_POST['terrain_id'];

    $terrain_id = intval($terrain_id);
    $events = array();
    if($get_terrain_events = mysqli_query($con, "SELECT * FROM terrain_event WHERE terrain_id = $terrain_id")) {
		while ($terrain_event = $get_terrain_events->fetch_assoc()) {
			$event_id = $terrain_event['event_id'];
			$event_chance = $terrain_event['event_chance'];

			array_push($events, array(
				'event_id' => $event_id,
				'event_chance' => $event_chance
			));

		}
	}

	$probability = array();
	$remaining = 100;

	foreach($events as $event) {
		for($i = 0; $i < $event['event_chance']; $i++) {
			array_push($probability, $event['event_id']);
			$remaining--;
		}
	}
	for($i = 0; $i < $remaining; $i++) {
		array_push($probability, '0');
	}
	$rand = rand(1,count($probability))-1;
	$chosen_prob = $probability[$rand];
	if($chosen_prob == 0){
		echo '0';
	}

	else {
		$chosen_event = $events[$chosen_prob-1];

		echo $chosen_event['event_id'];
	}
?>