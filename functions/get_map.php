<?php	
	include('../db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");

    $Currmap_id = $_POST['map_id'];
    $next = $_POST['next_map'];
    $Currmap_id = intval($Currmap_id);

    $returnhtml = '';
    if($next === 'next'){
	    $get_next_map = mysqli_query($con, "SELECT * FROM map WHERE map_id > $Currmap_id ORDER BY map_id LIMIT 1");
	}
	else if($next === 'reset'){
		$get_next_map = mysqli_query($con, "SELECT * FROM map WHERE map_id = $Currmap_id");
	}

    if($get_next_map) {
		while ($get_next_map_data = $get_next_map->fetch_assoc()) {
			$map_id = $get_next_map_data['map_id'];
?>
			<input type="hidden" id="currentlevelid" value="<?php echo $map_id;?>"/>
<?php
        	$get_map_structure = $get_next_map_data['map_structure'];
        	$map_structure = unserialize($get_map_structure);

        	$map_start = unserialize($get_next_map_data['map_start']);
        	$map_end = unserialize($get_next_map_data['map_end']);

        	$additional_class = '';

			$rows = count($map_structure) - 1;

			for($i=0; $i<$rows; $i++){
?>
				<div class="row" data-map-row="<?php echo $i+1;?>">
<?php
							$row_cells = $map_structure[$i];
							if(is_array($row_cells)){
								$current_count = 0;
								$cell_no = 0;
								$cell_divides = count($row_cells);
								for($cd=0; $cd<$cell_divides; $cd++){
									$cell_section = $map_structure[$i][$cd];
									if($cell_section === 0) {
										$current_count++;
										$cell_section_cells = 1
?>
										<div class="box disabled">
										</div>
<?php
									}
									else {
										for($cs=0; $cs<$cell_section; $cs++){
											$current_count++;
											$curr_row = $i+1;
											if($i+1 === intval($map_start['start_row']) && $current_count === intval($map_start['start_cell'])) {
												$additional_class .= 'start ';
												$additional_class .= 'current';
											}
											if($i+1 === intval($map_end['end_row']) && $current_count === intval($map_end['end_cell'])) {
												$additional_class .= 'end ';
											}
											
											if($get_terrain = mysqli_query($con, "SELECT * FROM map_terrain WHERE map_id = $map_id AND map_row = $curr_row AND map_cell = $current_count;")) {
				        						while ($terrain = $get_terrain->fetch_assoc()) {
			        								$terrain_id = $terrain['terrain_id'];
			        								$map_terrain_id = $terrain['map_terrain_id'];
			        								if($get_terrain_tile = mysqli_query($con, "SELECT * FROM terrain_tiles WHERE terrain_id = $terrain_id")) {
			        									$cell_no++;
				        								while ($terrain_tile = $get_terrain_tile->fetch_assoc()) {
				        									$terrain_type_class = strtolower($terrain_tile['terrain_type']);
?>
															<div 
																class="box <?php echo $additional_class.' '.$terrain_type_class;?>" 
																data-map-row="<?php echo $i+1;?>" 
																data-map-cell="<?php echo $cell_no;?>" 
																data-map-cell-vertical="<?php echo $current_count;?>" 
																data-terrain="<?php echo $terrain_id;?>"
															>
															</div>
<?php
														}
													}
												}
											}
											$additional_class = '';
										}
									}
								}
							}
							else {
								for($r=0; $r<$row_cells; $r++){
									$curr_row = $i + 1;
									$curr_cell = $r + 1;
									if($i+1 === intval($map_start['start_row']) && $r === intval($map_start['start_cell'])) {
										$additional_class .= 'start ';
										$additional_class .= 'current';
									}
									if($i+1 === intval($map_end['end_row']) && $r+1 === intval($map_end['end_cell'])) {
										$additional_class .= 'end ';
									}
									if($get_terrain = mysqli_query($con, "SELECT * FROM map_terrain WHERE map_id = $map_id AND map_row = $curr_row AND map_cell = $curr_cell;")) {
		        						while ($terrain = $get_terrain->fetch_assoc()) {
	        								$terrain_id = $terrain['terrain_id'];
	        								if($get_terrain_tile = mysqli_query($con, "SELECT * FROM terrain_tiles WHERE terrain_id = $terrain_id")) {
		        								while ($terrain_tile = $get_terrain_tile->fetch_assoc()) {
		        									$terrain_type = $terrain_tile['terrain_type'];

		        									$terrain_type_class = strtolower($terrain_tile['terrain_type']);
?>
													<div class="box <?php echo $additional_class.' '.$terrain_type_class;?>" data-map-row="<?php echo $i+1;?>" data-map-cell="<?php echo $r+1;?>" data-map-cell-vertical="<?php echo $r+1;?>" data-terrain="<?php echo $terrain_id;?>">
													</div>
<?php
												}
											}
										}
									}
									$additional_class = '';
								}
							}
?>
						</div>
<?php
			}
		}
	}

	else {
		echo 'finished';
	}
?>