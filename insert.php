<?php	
	include('db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

/*
			$array = array(
				6,
				6,
				array(
					2,
					0,
					0,
					2
				),
				array(
					2,
					0,
					0,
					2
				),
				array(
					2,
					0,
					0,
					2
				),
				array(
					2,
					0,
					0,
					2
				),
				array(
					2,
					0,
					0,
					2
				),
				array(
					2,
					0,
					0,
					2
				),
				6,
				6,
				"width" => 6
			);

			$serialized = serialize($array);
		    $start = array(
		    	'start_row' => '8',
		    	'start_cell' => '1'
	    	);
	    	$end = array(
		    	'end_row' => '1',
		    	'end_cell' => '6'
	    	);
	    	$start = serialize($start);
	    	$end = serialize($end);
*/

	    	$data = json_decode(stripslashes($_POST['jsonArray']));

		    foreach($data as $cell => $value){

		    	$name = $cell;
		    	$row = substr(
		    		$cell, 
		    		strpos($cell,'-') + 1,
		    		(
		    			strpos($cell,'/') - 1 - strpos($cell,'-')
	    			)
	    		);
		    	$cell = substr(
		    		$cell, 
		    		strpos($cell,'/') + 1
	    		);
		    	mysqli_query($con, "INSERT INTO map_terrain (
					map_terrain_id,
					map_id,
					terrain_id,
					map_row,
					map_cell
				) VALUES (
					NULL, 
					2,
					$value,
					$row,
					$cell
				);");
		    }

?>