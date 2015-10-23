<?php	
			include('header.php');
?>
		<div id="content">
			<div id="loading">
				<h1>Loading</h1>
			</div>
			<div id="dead">
				<h2>Oh Dear, you're dead.</h2>
				<p>If you feel like playing again, you can reset the map with the button below.</p>
				<input id="resetMap" type="submit" value="Restart Level" data-button="restartTotal"/>
			</div>
			<div id="complete">
				<h2>Congratulations! You completed this level!</h2>
				<input id="resetMap" type="submit" value="Restart Level" data-button="restartTotal"/>
				<input id="resetMapwItems" type="submit" value="Restart Level with items" data-button="restart"/>
				<input id="NextMap" type="submit" value="Next Level" data-button="next"/>
			</div>
			<div id="player">
				<div class="health bar"></div>
				<div class="attack bar"></div>
				<div class="defence bar"></div>
				<div class="movement bar"></div>
				<div class="menu">
					<div class="button" data-button="equipment">Equipment</div>
					<div class="button" data-button="restartTotal">Restart Level</div>
					<div class="equipment">
						<div class="equip_cont">
							<div class="equip_items">
								<div id="equip_helmet" class="item"></div>
								<div id="equip_armour" class="item"></div>
								<div id="equip_weapon" class="item"></div>
								<div id="equip_shield" class="item"></div>
							</div>
							<div class="equip_stats">

							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="proto-map">
<?php
			if($get_map = mysqli_query($con, "SELECT * FROM map ORDER BY map_id LIMIT 1 ")) {
		        while ($map = $get_map->fetch_assoc()) {
		        	$map_id = $map['map_id'];
?>
					<input type="hidden" id="currentlevelid" value="<?php echo $map_id;?>"/>
<?php
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
										for($cs=0; $cs<=$cell_section; $cs++){
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
				        								while ($terrain_tile = $get_terrain_tile->fetch_assoc()) {
				        									$terrain_type_class = strtolower($terrain_tile['terrain_type']);
?>
															<div class="box <?php echo $additional_class.' '.$terrain_type_class;?>" data-map-row="<?php echo $i+1;?>" data-map-cell="<?php echo $cell_no;?>" data-map-cell-vertical="<?php echo $current_count;?>" data-terrain="<?php echo $terrain_id;?>">
															</div>
<?php
														}
													}
												}
											}

											$additional_class = '';
											$current_count++;
											$cell_no++;
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
?>
			</div>
		</div>
		
		<footer>
<?php	
			include('/footer.php');
?>
		</footer>
	</body>