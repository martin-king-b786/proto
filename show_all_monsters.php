<?php	
	include('db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");
?>
<table>
	<thead>
		<td>Name</td>
		<td>Health</td>
		<td>Attack</td>
		<td>Defence</td>
		<td>Chance</td>
	</thead>
	<tbody>
<?php
	    $rewards = array();
	    if($get_monsters = mysqli_query($con, "SELECT * FROM monsters WHERE monster_tier = 1 ORDER BY monster_chance")) {
			while ($get_monster = $get_monsters->fetch_assoc()) {
?>
				<tr>
					<td><?php echo $get_monster['monster_name'];?></td>
					<td><?php echo $get_monster['monster_health'];?></td>
					<td><?php echo $get_monster['monster_attack'];?></td>
					<td><?php echo $get_monster['monster_defence'];?></td>
					<td><?php echo $get_monster['monster_chance'];?></td>
				</tr>
<?php
			}
		}
?>
	</tbody>
</table>

<table>
	<thead>
		<td>Name</td>
		<td>Health</td>
		<td>Attack</td>
		<td>Defence</td>
		<td>Chance</td>
	</thead>
	<tbody>
<?php
	    $rewards = array();
	    if($get_monsters = mysqli_query($con, "SELECT * FROM monsters WHERE monster_tier = 2 ORDER BY monster_chance")) {
			while ($get_monster = $get_monsters->fetch_assoc()) {
?>
				<tr>
					<td><?php echo $get_monster['monster_name'];?></td>
					<td><?php echo $get_monster['monster_health'];?></td>
					<td><?php echo $get_monster['monster_attack'];?></td>
					<td><?php echo $get_monster['monster_defence'];?></td>
					<td><?php echo $get_monster['monster_chance'];?></td>
				</tr>
<?php
			}
		}
?>
	</tbody>
</table>