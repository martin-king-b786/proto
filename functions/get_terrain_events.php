<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

    $terrain_id = intval($_POST['terrain_id']);
	$args = json_decode($_POST['args']);

	$events = array();
    if($get_terrain_events = mysqli_query($con, "SELECT * FROM terrain_event WHERE terrain_id = $terrain_id")) {
		while ($terrain_event = $get_terrain_events->fetch_assoc()) {
			$event_id = $terrain_event['event_id'];
			$event_chance = $terrain_event['event_chance'];
			$events[$event_id] = $event_chance;
		}
	}

	foreach($args as $key => $value){
		if($get_event_modifiers = mysqli_query($con, "SELECT * FROM event_modifiers WHERE event_trigger = '$key'")) {
			while ($event_modifier = $get_event_modifiers->fetch_assoc()) {
				$effectName = $event_modifier['effect_name'];
				$effect = $event_modifier['effect'];
				if($effectName === $value) {
					$eventsModifierEventId = $event_modifier['event_id'];
					if($effect){
						$origChance = $events[$eventsModifierEventId];
						$newChance = $origChance + $effect;
						$events[$eventsModifierEventId] = $newChance;
					}
					else {
						$events[$eventsModifierEventId] = 0;
					}
				}
			}
		}
	}
	$probability = array();
	$remaining = 100;

	foreach($events as $eventId => $eventChance) {
		for($i = 0; $i < $eventChance; $i++) {
			array_push($probability, $eventId);
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
		$chosen_event = $chosen_prob;
		echo $chosen_event;
	}
	
?>