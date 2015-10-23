<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

	$reward_tier = $_POST['reward_tier'];

    $rewards = array();
    if($get_rewards = mysqli_query($con, "SELECT * FROM rewards WHERE reward_tier = $reward_tier")) {
		while ($get_reward = $get_rewards->fetch_assoc()) {
			$reward_id = $get_reward['reward_id'];
			$reward = unserialize($get_reward['reward']);
			
			$reward_chance = $get_reward['reward_chance'];

			$rewards[$reward_id] = array(
				'reward_id' => $reward_id,
				'reward' => $reward,
				'reward_chance' => $reward_chance
			);

		}
	}

	$probability = array();
	$remaining = 100;

	foreach($rewards as $reward) {
		for($i = 0; $i < $reward['reward_chance']; $i++) {
			array_push($probability, $reward['reward_id']);
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
		$chosen_reward = $rewards[$chosen_prob-1];
		echo json_encode($chosen_reward);
	}
?>