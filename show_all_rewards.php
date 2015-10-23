<?php	
	include('db-details.php');
	$mysqli= new mysqli("localhost","$u","$p","$db");
    $con=mysqli_connect("localhost","$u","$p","$db");
?>
<table>
	<thead>
		<td>Chance</td>
		<td>Name</td>
		<td>Health</td>
		<td>Attack</td>
		<td>Defence</td>
		<td>Move</td>
	</thead>
	<tbody>
<?php
	    $rewards = array();
	    if($get_rewards = mysqli_query($con, "SELECT * FROM rewards WHERE reward_tier = 1 ORDER BY reward_chance")) {
			while ($get_reward = $get_rewards->fetch_assoc()) {
				$reward = unserialize($get_reward['reward']);
?>
				<tr>
					<td><?php echo $get_reward['reward_chance'];?></td>
					<td><?php echo $reward['name'];?></td>
					<td><?php echo $reward['stats']['health'];?></td>
					<td><?php echo $reward['stats']['attack'];?></td>
					<td><?php echo $reward['stats']['defence'];?></td>
					<td><?php echo $reward['stats']['move'];?></td>
				</tr>
<?php
			}
		}
?>
	</tbody>
</table>

<table>
	<thead>
		<td>Chance</td>
		<td>Name</td>
		<td>Health</td>
		<td>Attack</td>
		<td>Defence</td>
		<td>Move</td>
	</thead>
	<tbody>
<?php
	    $rewards = array();
	    if($get_rewards = mysqli_query($con, "SELECT * FROM rewards WHERE reward_tier = 2 ORDER BY reward_chance")) {
			while ($get_reward = $get_rewards->fetch_assoc()) {
				$reward = unserialize($get_reward['reward']);
?>
				<tr>
					<td><?php echo $get_reward['reward_chance'];?></td>
					<td><?php echo $reward['name'];?></td>
					<td><?php echo $reward['stats']['health'];?></td>
					<td><?php echo $reward['stats']['attack'];?></td>
					<td><?php echo $reward['stats']['defence'];?></td>
					<td><?php echo $reward['stats']['move'];?></td>
				</tr>
<?php
			}
		}
?>
	</tbody>
</table>