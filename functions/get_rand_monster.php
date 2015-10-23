<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

	$monster_tier = $_POST['monster_tier'];

    $monsters = array();
    if($get_monsters = mysqli_query($con, "SELECT * FROM monsters WHERE monster_tier = $monster_tier")) {
		while ($get_monster = $get_monsters->fetch_assoc()) {
			$monster_id = $get_monster['monster_id'];
			$monster_name = $get_monster['monster_name'];
			$monster_image = $get_monster['monster_image'];
			$monster_health = $get_monster['monster_health'];
			$monster_defence = $get_monster['monster_defence'];
			$monster_attack = $get_monster['monster_attack'];
			$monster_chance = $get_monster['monster_chance'];

			$monsters[$monster_id] = array(
				'monster_id' => $monster_id,
				'monster_name' => $monster_name,
				'monster_image' => $monster_image,
				'monster_health' => $monster_health,
				'monster_defence' => $monster_defence,
				'monster_attack' => $monster_attack,
				'monster_chance' => $monster_chance
			);

		}
	}

	$probability = array();
	$remaining = 100;

	foreach($monsters as $monster) {
		for($i = 0; $i < $monster['monster_chance']; $i++) {
			array_push($probability, $monster['monster_id']);
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
		$chosen_monster = $monsters[$chosen_prob];
		echo json_encode($chosen_monster);
	}
?>