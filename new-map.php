<?php	
			include('header.php');
?>
		<div id="content">
			<form method="post" id="form">
<?php
			if($get_map = mysqli_query($con, "SELECT * FROM map where map_id = 2")) {
		        while ($map = $get_map->fetch_assoc()) {
		        	$get_map_structure = $map['map_structure'];
		        	$map_structure = unserialize($get_map_structure);

		        	$map_start = unserialize($map['map_start']);
		        	$map_end = unserialize($map['map_end']);

		        	$additional_class = '';

					$rows = count($map_structure) - 1;

					for($i=0; $i<$rows; $i++){
?>
						<div class="row" data-map-row="<?php echo $i+1;?>">
<?php
							$row_cells = $map_structure[$i];
							if(is_array($row_cells)){
								$current_count = 0;
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

											if($i+1 === intval($map_start['start_row']) && $current_count === intval($map_start['start_cell'])) {
												$additional_class .= 'start ';
												$additional_class .= 'current';
											}
											if($i+1 === intval($map_end['end_row']) && $current_count === intval($map_end['end_cell'])) {
												$additional_class .= 'end ';
											}
?>
											<div class="box <?php echo $additional_class;?>" data-map-row="<?php echo $i+1;?>" data-map-cell="<?php echo $current_count;?>">
												<?php echo $current_count;?>
												<select name="terrain_tile-<?php echo ($i+1).'/'.$current_count;?>">
<?php
													if($get_terrain = mysqli_query($con, "SELECT * FROM terrain_tiles;")) {
		        										while ($terrain_tile = $get_terrain->fetch_assoc()) {
?>
															<option value="<?php echo $terrain_tile['terrain_id'];?>"><?php echo $terrain_tile['terrain_type'];?></option>
<?php
		        										}
		        									}
?>
												</select>
											</div>
<?php
											$additional_class = '';
										}
									}
								}
							}
							else {
								for($r=0; $r<$row_cells; $r++){
									if($i+1 === intval($map_start['start_row']) && $r === intval($map_start['start_cell'])) {
										$additional_class .= 'start ';
										$additional_class .= 'current';
									}
									if($i+1 === intval($map_end['end_row']) && $r+1 === intval($map_end['end_cell'])) {
										$additional_class .= 'end ';
									}
?>
									<div class="box <?php echo $additional_class;?>" data-map-row="<?php echo $i+1;?>" data-map-cell="<?php echo $r+1;?>">
										<?php echo $r+1;?>
										<select name="terrain_tile-<?php echo ($i+1).'/'.($r+1);?>">
<?php
											if($get_terrain = mysqli_query($con, "SELECT * FROM terrain_tiles;")) {
        										while ($terrain_tile = $get_terrain->fetch_assoc()) {
?>
													<option value="<?php echo $terrain_tile['terrain_id'];?>"><?php echo $terrain_tile['terrain_type'];?></option>
<?php
        										}
        									}
?>
										</select>
									</div>
<?php
									$additional_class = '';
								}
							}
?>
						</div>
<?php
					}
		        }
		    }
/*
			$array = array(
				13,
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				array(
					3,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					3
				),
				"width" => 19
			);

			$serialized = serialize($array);
		    $start = array(
		    	'start_row' => '8',
		    	'start_cell' => '1'
	    	);
	    	$end = array(
		    	'end_row' => '1',
		    	'end_cell' => '19'
	    	);
	    	$start = serialize($start);
	    	$end = serialize($end);

			mysqli_query($con, "INSERT INTO map (
				map_id,
				map_structure,
				map_start,
				map_end
			) VALUES (
				NULL, 
				'$serialized',
				'$start',
				'$end'
			);");
*/
?>
			<input type="submit"/>
		</form>
		</div>
		
		<footer>
<?php	
			include('/footer.php');
?>
		</footer>
	</body>