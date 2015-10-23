var Class = function(methods) {
	var klass = function() {    
        this.initialize.apply(this, arguments);          
    };  
    
    for (var property in methods) { 
       klass.prototype[property] = methods[property];
    }
          
    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};      
    
    return klass;  
}

function characterStats(char){
    this.character = char;

    this.getStat = function(stat) {
    	var statChar = this.character;
		var base = statChar.baseStats[stat];
		var modifiers = statChar.modifiers[stat];
		var equipment = 0;
		var equipment_count = countObject(statChar.equipment);
		var equipment_array = Object.keys(statChar.equipment);
		for(i=0;i<equipment_count;i++){
			var equipment_type = equipment_array[i];
			equipment = equipment + statChar.equipment[equipment_type][stat];
		}
		
		var total = base + modifiers + equipment;
		return total;
	}
};


$ = jQuery;

function countObject(providedObject) {
	var count = 0;
	for (var k in providedObject) {
	    if (providedObject.hasOwnProperty(k)) {
	       ++count;
	    }
	}
	return count;
}

function charImg(character){
	jQuery('#char-img').remove();	
	jQuery('.box.current').html(''+
		'<div id="char-img">'+
			'<img src="./images/char.png"/>'+
			'<img class="char_overlay helmet" src="./images/char_overlay/'+character.equipment.helmet.image+'"/>'+
			'<img class="char_overlay armour" src="./images/char_overlay/'+character.equipment.armour.image+'"/>'+
			'<img class="char_overlay weapon" src="./images/char_overlay/'+character.equipment.weapon.image+'"/>'+
			'<img class="char_overlay shield" src="./images/char_overlay/'+character.equipment.shield.image+'"/>'+
		'</div>'+
	'');
}

function randomAdjacentTile(){
	var current_row = jQuery('.box.current').attr('data-map-row');
	var current_cell = jQuery('.box.current').attr('data-map-cell');
	var current_cell_vert = jQuery('.box.current').attr('data-map-cell-vertical');


	var current_row_up = parseInt(current_row) + 1;
	var current_row_down = parseInt(current_row) - 1;

	var current_cell_up = parseInt(current_cell) + 1;
	var current_cell_down = parseInt(current_cell) - 1;

	var current_cell_vert_up = parseInt(current_cell_vert) + 1;
	var current_cell_vert_down = parseInt(current_cell_vert) - 1;

	var adjacentCells = [
		{
			curr_row: current_row_down,
			curr_cell: current_cell,
			curr_cell_vert: current_cell_vert
		},
		{
			curr_row: current_row,
			curr_cell: current_cell_up,
			curr_cell_vert: current_cell_vert_up
		},
		{
			curr_row: current_row_up,
			curr_cell: current_cell,
			curr_cell_vert: current_cell_vert
		},
		{
			curr_row: current_row,
			curr_cell: current_cell_down,
			curr_cell_vert: current_cell_vert_down
		}
	];

	for(i = 0; i < adjacentCells.length; i++) {
		var findThisCell = jQuery('.box[data-map-row="'+adjacentCells[i].curr_row+'"][data-map-cell="'+adjacentCells[i].curr_cell+'"][data-map-cell-vertical="'+adjacentCells[i].curr_cell_vert+'"]')
		if(!findThisCell.length){
			adjacentCells.splice(i,1);
		}
	}

	var selCell = Math.floor(Math.random() * adjacentCells.length);

	var selectedCell = adjacentCells[selCell];

	return selectedCell;
}


function initializePlayer(character){
	var playerChar = character;
	var playerCharStats = new characterStats(playerChar);
	var allCharStats = {
		health: playerCharStats.getStat('health'),
		attack: playerCharStats.getStat('attack'),
		defence: playerCharStats.getStat('defence'),
		movement: playerCharStats.getStat('move')
	}

	var allCharStats_array = Object.keys(allCharStats);

	for(i=0;i<countObject(allCharStats);i++){
		var thisStat = allCharStats_array[i];
		var thisStatVal = allCharStats[thisStat];
		jQuery('#player > div.'+thisStat).html('');
		for(r=0;r<thisStatVal;r++){
			jQuery('#player > div.'+thisStat).append('<div></div>');
		}
	}

	var playerCharHealth = playerChar.modifiers.health;
	var playerCharAttack = playerChar.modifiers.attack;
	var playerCharDefence = playerChar.modifiers.defence;
	var playerCharMovement = playerChar.modifiers.move;


	var equipment_count = countObject(playerChar.equipment);
	var equipment_array = Object.keys(playerChar.equipment);
	for(i=0;i<equipment_count;i++){
		var equipment_type = equipment_array[i];

		var equipment_name = playerChar.equipment[equipment_type].name;
		var equipment_type = equipment_array[i];
		var equipment_health = playerChar.equipment[equipment_type].health;
		var equipment_attack = playerChar.equipment[equipment_type].attack;
		var equipment_defence = playerChar.equipment[equipment_type].defence;
		var equipment_move = playerChar.equipment[equipment_type].move;
		var equipment_image = playerChar.equipment[equipment_type].image;

		jQuery('div#player .equipment .equip_items #equip_'+equipment_type).html('<img src="images/items/'+equipment_image+'"/>');
		if(jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+equipment_type+'"]').length){
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+equipment_type+'"] h5').html(equipment_name);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+equipment_type+'"] .health .value').html(equipment_health);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+equipment_type+'"] .attack .value').html(equipment_attack);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+equipment_type+'"] .defence .value').html(equipment_defence);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+equipment_type+'"] .move .value').html(equipment_move);
		}
		else {
			jQuery('div#player .equipment .equip_stats').append(''+
				'<div data-equipment="equip_'+equipment_type+'">'+
					'<h5>'+equipment_name+'</h5>'+
					'<div class="health">Health:<span class="value">'+equipment_health+'</span></div>'+
					'<div class="attack">Attack:<span class="value">'+equipment_attack+'</span></div>'+
					'<div class="defence">Defence:<span class="value">'+equipment_defence+'</span></div>'+
					'<div class="move">Move:<span class="value">'+equipment_move+'</span></div>'+
				'</div>'
			);
		}
	}
	charImg(character);
}

function move(tile_row, tile_cell, tile_cell_vert, movement, character){
	
	var current_row = jQuery('.box.current').attr('data-map-row');
	var current_cell = jQuery('.box.current').attr('data-map-cell');
	var current_cell_vert = jQuery('.box.current').attr('data-map-cell-vertical');

	var diff_row = Math.abs(current_row - tile_row);
	var diff_cell = Math.abs(current_cell - tile_cell);
	var diff_cell_vert = Math.abs(current_cell_vert - tile_cell_vert);

	var total_diff =  Math.abs(diff_row + diff_cell);
	var total_diff_vert = Math.abs(diff_row + diff_cell_vert);
	var newCell = jQuery('.box[data-map-row="'+tile_row+'"][data-map-cell="'+tile_cell+'"][data-map-cell-vertical="'+tile_cell_vert+'"]');

	var rowDiff = current_row - tile_row;
	var cellDiff = current_cell - tile_cell;

	if(!jQuery(newCell).hasClass('water') && !jQuery(newCell).hasClass('lava')) {
		if(total_diff <= movement && total_diff 
			|| total_diff_vert <= movement && total_diff_vert
		){

			var rowDiff = current_row - tile_row;
			var cellDiff = current_cell - tile_cell;

			var cellDir = 0;
			if(rowDiff > 0){
				cellDir = 1;
			}
			else if(rowDiff < 0){
				cellDir = 3;
			}
			else if(cellDiff > 0){
				cellDir = 4;
			}
			else if(cellDiff < 0){
				cellDir = 2;
			}

			var dirClass = 'rot_'+((cellDir-1) * 90);
			var newBox = jQuery('.box[data-map-row="'+tile_row+'"][data-map-cell="'+tile_cell+'"]');

			jQuery('.box').removeClass('current');
			jQuery('.box').removeClass('rot_0');
			jQuery('.box').removeClass('rot_90');
			jQuery('.box').removeClass('rot_180');
			jQuery('.box').removeClass('rot_270');
			jQuery(newBox).addClass('current');
			jQuery(newBox).addClass(dirClass);

			var terrain_type = jQuery(newBox).attr('data-terrain');

			return terrain_type;
		}
	}
}

function attack(tile_row, tile_cell, tile_cell_vert, character){

	var player = character;
	var charStats = new characterStats(player);
	var playerAttack = charStats.getStat('attack');
	var playerDefence = charStats.getStat('defence');
	var playerHealth = charStats.getStat('health');

	var monster_row = tile_row;
	var monster_cell = tile_cell;
	var monster_cell_vert = tile_cell_vert;

	var monster = jQuery('.box[data-map-row="'+monster_row+'"][data-map-cell="'+monster_cell+'"][data-map-cell-vertical="'+monster_cell_vert+'"]');
	var monsterAttack = parseInt(jQuery(monster).find('.attack').html());
	var monsterDefence = parseInt(jQuery(monster).find('.defence').html());
	var monsterHealth = parseInt(jQuery(monster).find('.health').children('div').length);
	
	var returnvar = [];
	if(Math.floor(Math.random()*100 <= monsterDefence)) {
		returnvar.push({playerHit:0});
	}
	else {
		for(i=0; i<playerAttack;i++){
			jQuery(monster).find('.health').children('div').first().remove();
		}
		returnvar.push({playerHit:playerAttack});
	}

	if(Math.floor(monsterAttack - playerDefence) <= 0) {
		returnvar.push({monsterHit:0});
	}
	else {
		var monsterDamage = Math.floor(monsterAttack - playerDefence);
		for(i=0; i<monsterDamage;i++){
			jQuery('#player').find('.health').children('div').first().remove();
		}
		returnvar.push({monsterHit:monsterDamage});
		player.modifiers.health += -monsterDamage;
	}
	return returnvar;
}

function addMonster(monster_tier){
	var affectedCell = randomAdjacentTile();

	var actualCell = jQuery('.box[data-map-row="'+affectedCell.curr_row+'"][data-map-cell="'+affectedCell.curr_cell+'"][data-map-cell-vertical="'+affectedCell.curr_cell_vert+'"]')
	
	jQuery.ajax({
	    type: "POST",
	    url: './functions/get_rand_monster.php',
	    data:{monster_tier: monster_tier},
	    timeout: 3000,
	    error: function(request,error) {
	        console.log(error);
	    },
	    success: function(data) {
	    	console.log(data);
	    	if(data !== '0'){
		    	monster = JSON.parse(data);
		    	var healthHTML = '';
		    	for(i=0; i<monster.monster_health; i++) {
		    		healthHTML += '<div></div>';
		    	}

		    	var monsterHTML = ''+
		    		'<div class="scary-monster">'+
			    		'<img src="'+monster.monster_image+'"/>'+
			    		'<div class="name">'+monster.monster_name+'</div>'+
			    		'<div class="health">'+healthHTML+'</div>'+
			    		'<div class="defence">'+monster.monster_defence+'</div>'+
			    		'<div class="attack">'+monster.monster_attack+'</div>'+
		    		'</div>';
		    	jQuery(actualCell).html(monsterHTML)
		    	jQuery(actualCell).addClass('event');
		    	jQuery(actualCell).attr('data-event-type','monster');
		    	jQuery(actualCell).attr('data-reward-level',monster_tier);
		    }
	    }
	});
}

function addReward(reward_tier){
	jQuery.ajax({
	    type: "POST",
	    url: './functions/get_reward.php',
	    data:{reward_tier: reward_tier},
	    timeout: 2000,
	    error: function(request,error) {
	        console.log(error);
	    },
	    success: function(data) {
	    	if(data !== '0'){
				var received_reward = JSON.parse(data);
				var reward_name = received_reward.reward.name;
				var reward_type = received_reward.reward.type;
				jQuery('#proto-map').append('<div class="new-reward overlay"></div>');

				if(reward_type === "modifier"){
					jQuery('#proto-map .new-reward').append(''+
						'<input type="hidden" name="modifier-health" value="'+received_reward.reward.stats.health+'"/>'+
						'<input type="hidden" name="modifier-attack" value="'+received_reward.reward.stats.attack+'"/>'+
						'<input type="hidden" name="modifier-defence" value="'+received_reward.reward.stats.defence+'"/>'+
						'<input type="hidden" name="modifier-move" value="'+received_reward.reward.stats.move+'"/>'+
						'<h3>New Item Found!</h3>'+
						'<h4>'+reward_name+'</h4>'+
						'<img src="images/items/'+received_reward.reward.image+'"/>'+
						'<input type="submit" class="accept_item" value="Use Item"/>'+
						'<input type="submit" class="decline_item" value="Ignore Item"/>'
					);
				}
				else {
					var healthHTML = '';
					var attackHMTL = '';
					var defenceHTML = '';
					var moveHTML = '';

					if(received_reward.reward.stats.health < 0) {
						for(i=0; i<received_reward.reward.stats.health; i++){
							healthHTML += '<div class="neg"></div>';
						}
					}
					else {
						for(i=0; i<received_reward.reward.stats.health; i++){
							healthHTML += '<div></div>';
						}
					}
					if(received_reward.reward.stats.attack < 0) {
						for(i=0; i<received_reward.reward.stats.attack; i++){
							attackHMTL += '<div class="neg"></div>';
						}
					}
					else {
						for(i=0; i<received_reward.reward.stats.attack; i++){
							attackHMTL += '<div></div>';
						}
					}
					if(received_reward.reward.stats.defence < 0) {
						for(i=0; i<received_reward.reward.stats.defence; i++){
							defenceHTML += '<div class="neg"></div>';
						}
					}
					else {
						for(i=0; i<received_reward.reward.stats.defence; i++){
							defenceHTML += '<div></div>';
						}
					}
					if(received_reward.reward.stats.move < 0) {
						for(i=0; i<received_reward.reward.stats.move; i++){
							moveHTML += '<div class="neg"></div>';
						}
					}
					else {
						for(i=0; i<received_reward.reward.stats.move; i++){
							moveHTML += '<div></div>';
						}
					}

					jQuery('#proto-map .new-reward').append(''+
						'<div class="new_item">'+
							'<h3>New Item Found!</h3>'+
							'<h4>'+reward_name+'</h4>'+
							'<h5>'+reward_type+'</h5>'+
							'<img src="images/items/'+received_reward.reward.image+'"/>'+
							'<div class="health bar">'+healthHTML+'</div>'+
							'<div class="attack bar">'+attackHMTL+'</div>'+
							'<div class="defence bar">'+defenceHTML+'</div>'+
							'<div class="movement bar">'+moveHTML+'</div>'+
							'<input type="submit" class="accept_item" value="Equip Item"/>'+
							'<input type="submit" class="decline_item" value="Ignore Item"/>'+
							'<input type="hidden" name="equipment-type" value="'+reward_type+'"/>'+
							'<input type="hidden" name="equipment-health" value="'+received_reward.reward.stats.health+'"/>'+
							'<input type="hidden" name="equipment-attack" value="'+received_reward.reward.stats.attack+'"/>'+
							'<input type="hidden" name="equipment-defence" value="'+received_reward.reward.stats.defence+'"/>'+
							'<input type="hidden" name="equipment-move" value="'+received_reward.reward.stats.move+'"/>'+
						'</div>'
					);

					var existing_stats = jQuery('#player .equip_stats div[data-equipment="equip_'+reward_type+'"]');
					if(jQuery(existing_stats).length) {
						var existing_item = {};
						existing_item.itemname = jQuery(existing_stats).find('h5').html();
						existing_item.image = jQuery('#player .equip_items #equip_'+reward_type+' img').attr('src');
						existing_item.health = jQuery(existing_stats).find('.health').find('.value').html();
						existing_item.attack = jQuery(existing_stats).find('.attack').find('.value').html();
						existing_item.defence = jQuery(existing_stats).find('.defence').find('.value').html();
						existing_item.move = jQuery(existing_stats).find('.move').find('.value').html();

						var existingHealthHTML = '';
						var existingAttackHMTL = '';
						var existingDefenceHTML = '';
						var existingMoveHTML = '';
						
						if(parseInt(existing_item.health) < 0) {
							for(i=0; i<parseInt(existing_item.health); i++){
								existingHealthHTML += '<div class="neg"></div>';
							}
						}
						else {
							for(i=0; i<parseInt(existing_item.health); i++){
								existingHealthHTML += '<div></div>';
							}
						}

						if(parseInt(existing_item.attack) < 0) {
							for(i=0; i<parseInt(existing_item.attack); i++){
								existingAttackHMTL += '<div class="neg"></div>';
							}
						}
						else {
							for(i=0; i<parseInt(existing_item.attack); i++){
								existingAttackHMTL += '<div></div>';
							}
						}

						if(parseInt(existing_item.defence) < 0) {
							for(i=0; i<parseInt(existing_item.defence); i++){
								existingDefenceHTML += '<div class="neg"></div>';
							}
						}
						else {
							for(i=0; i<parseInt(existing_item.defence); i++){
								existingDefenceHTML += '<div></div>';
							}
						}

						if(parseInt(existing_item.move) < 0) {
							for(i=0; i<parseInt(existing_item.move); i++){
								existingMoveHTML += '<div class="neg"></div>';
							}
						}
						else {
							for(i=0; i<parseInt(existing_item.move); i++){
								existingMoveHTML += '<div></div>';
							}
						}

						jQuery('#proto-map .new-reward').append(''+
							'<div class="existing_item">'+
								'<h3>Current Item:</h3>'+
								'<h4>'+existing_item.itemname+'</h4>'+
								'<img src="'+existing_item.image+'"/>'+
								'<div class="health bar">'+existingHealthHTML+'</div>'+
								'<div class="attack bar">'+existingAttackHMTL+'</div>'+
								'<div class="defence bar">'+existingDefenceHTML+'</div>'+
								'<div class="movement bar">'+existingMoveHTML+'</div>'+
							'</div>'
						);
					}
				}
				jQuery('.new-reward').fadeIn();
				jQuery('.new-reward').show();
		    }
	    }
	});
}

function acceptItem(character){
	var playerChar = character;
	var playerCharHealth = playerChar.modifiers.health;
	var playerCharAttack = playerChar.modifiers.attack;
	var playerCharDefence = playerChar.modifiers.defence;
	var playerCharMovement = playerChar.modifiers.move;

	var reward = jQuery('.new-reward');

	if(jQuery(reward).find('input[name="modifier-health"]').length){
		var reward_health = jQuery(reward).find('input[name="modifier-health"]').val();
		var reward_attack = jQuery(reward).find('input[name="modifier-attack"]').val();
		var reward_defence = jQuery(reward).find('input[name="modifier-defence"]').val();
		var reward_move = jQuery(reward).find('input[name="modifier-move"]').val();
		playerChar.modifiers.health = playerCharHealth + parseInt(reward_health);
		playerChar.modifiers.attack = playerCharAttack + parseInt(reward_attack);
		playerChar.modifiers.defence = playerCharDefence + parseInt(reward_defence);
		playerChar.modifiers.move = playerCharMovement + parseInt(reward_move);
	}
	else {
		reward = jQuery('.new_item');
		var reward_name = jQuery(reward).find('h4').html();
		var reward_type = jQuery(reward).find('input[name="equipment-type"]').val();
		var reward_health = jQuery(reward).find('input[name="equipment-health"]').val();
		var reward_attack = jQuery(reward).find('input[name="equipment-attack"]').val();
		var reward_defence = jQuery(reward).find('input[name="equipment-defence"]').val();
		var reward_move = jQuery(reward).find('input[name="equipment-move"]').val();
		var reward_image = jQuery(reward).find('img').attr('src').replace('images/items/','');

		playerChar.equipment[reward_type].name = reward_name;
		playerChar.equipment[reward_type].health = parseInt(reward_health);
		playerChar.equipment[reward_type].attack = parseInt(reward_attack);
		playerChar.equipment[reward_type].defence = parseInt(reward_defence);
		playerChar.equipment[reward_type].move = parseInt(reward_move);
		playerChar.equipment[reward_type].image = reward_image;

		jQuery('div#player .equipment .equip_items #equip_'+reward_type).html('<img src="'+reward_image+'"/>');
		if(jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"]').length){
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] h5').html(reward_name);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .health .value').html(reward_health);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .attack .value').html(reward_attack);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .defence .value').html(reward_defence);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .move .value').html(reward_move);
		}
		else {
			jQuery('div#player .equipment .equip_stats').append(''+
				'<div data-equipment="equip_'+reward_type+'">'+
					'<h5>'+reward_name+'</h5>'+
					'<div class="health">Health:<span class="value">'+reward_health+'</span></div>'+
					'<div class="attack">Attack:<span class="value">'+reward_attack+'</span></div>'+
					'<div class="defence">Defence:<span class="value">'+reward_defence+'</span></div>'+
					'<div class="move">Move:<span class="value">'+reward_move+'</span></div>'+
				'</div>'
			);
		}
	}
	initializePlayer(playerChar);
	jQuery('.new-reward').fadeOut();
	setTimeout(function(){
		jQuery('.new-reward').remove();
	},1000);
	console.log(character);
}

function checkDead(character){
	var player = character;
	var charStats = new characterStats(player);
	var playerHealth = charStats.getStat('health');
	if(playerHealth <= 0){
		jQuery('#dead').fadeIn();
		jQuery('#dead').addClass('overlay');
	}
	jQuery('.box[data-event-type="monster"]').each(function(){
		var monsterHealth = parseInt(jQuery(this).find('.health').children('div').length);
		if(monsterHealth <= 0){
			jQuery(this).html('');
			jQuery(this).attr('data-event-type','');
			jQuery(this).removeClass('event');
			var current_row = jQuery(this).attr('data-map-row');
			var current_cell = jQuery(this).attr('data-map-cell');
			var current_cell_vert = jQuery(this).attr('data-map-cell-vertical');
			var tier = jQuery(this).attr('data-reward-level');
			addReward(tier);
		}
	});
}

function triggerEvent(terrain_type){
	jQuery.ajax({
	    type: "POST",
	    url: './functions/get_terrain_events.php',
	    data:{terrain_id: terrain_type},
	    timeout: 2000,
	    error: function(request,error) {
	        console.log(error);
	    },
	    success: function(data) {
	    	if(data){
		    	getEventFunction(data);
		    }
	    }
	});
}

function getEventFunction(event_id) {
	jQuery.ajax({
	    type: "POST",
	    url: './functions/get_event_function.php',
	    data:{event_id: event_id},
	    timeout: 2000,
	    error: function(request,error) {
	        console.log(error);
	    },
	    success: function(data) {
	    	jQuery.ajax({
			    type: "POST",
			    url: './functions/get_function.php',
			    data:{function_id: data},
			    timeout: 2000,
			    error: function(request,error) {
			        console.log(error);
			    },
			    success: function(data) {
			    	if(data) {
						triggerFunction([data]);
					}
			    }
			});
	    }
	});	
}
function triggerFunction(functionName){
	var trueFunction = functionName[0];
	window[trueFunction]();
}

function checkForEnd(){
	if(jQuery('.box.end.current').length){

		jQuery('#complete').fadeIn();
		jQuery('#complete').addClass('overlay');
	}
}

function loadLevel(current_level,next){
	jQuery.ajax({
	    type: "POST",
	    url: './functions/get_map.php',
	    data:{map_id: current_level, next_map: next},
	    timeout: 2000,
	    error: function(request,error) {
	        console.log(error);
	    },
	    success: function(data) {
	    	console.log(data);
	    	if(data) {
		    	jQuery('#proto-map').html(data);
		    	jQuery('#complete').fadeOut();
		    	jQuery('#complete').removeClass('overlay');
		    }
		    else {
		    	jQuery('#content').append(''+
		    		'<div id="final" class="overlay">'+
						'<h2>Congratulations! You have completed all maps thus far!</h2>'+
						'<p>Please come back at a later stage, where hopefully I will have added more maps for you to bash your head against =)</p>'+
						'<input id="resetMapwItems" type="submit" value="Restart Level with items"/>'+
						'<input id="NextMap" type="submit" value="Next Level"/>'+
					'</div>'
				);
		    }
	    }
	});	
}

jQuery(document).ready(function(){
	/* Initialize Char Stats */

		var character = {
			baseStats : {
				health : 10,
				defence : 0,
				attack : 0,
				move : 1,
			},
			modifiers : {
				health : 0,
				defence : 0,
				attack : 0,
				move : 0,
			},
			equipment : {
				helmet : {
					name : 'A flower in your hair',
					health : 0,
					defence : 0,
					attack : 0,
					move : 0,
					image: 'a_flower_in_your_hair.png',
				},
				armour : {
					name : 'A shirt and trousers',
					health : 0,
					defence : 0,
					attack : 0,
					move : 0,
					image: 'a_shirt_and_trousers.png',
				},
				weapon : {
					name : 'A hefty stick',
					health : 0,
					defence : 0,
					attack : 1,
					move : 0,
					image: 'a_hefty_stick.png',
				},
				shield : {
					name : 'Your left hand',
					health : 0,
					defence : 0,
					attack : 0,
					move : 0,
					image: 'your_left_hand.png',
				}
			}
		};
		playerCharacter = new characterStats(character);

		initializePlayer(character);
		var savedCharacter = {
			baseStats : {
				health : character.baseStats.health,
				defence : character.baseStats.defence,
				attack : character.baseStats.attack,
				move : character.baseStats.move,
			},
			modifiers : {
				health : character.modifiers.health,
				defence : character.modifiers.defence,
				attack : character.modifiers.attack,
				move : character.modifiers.move,
			},
			equipment : {
				helmet : {
					name : character.equipment.helmet.name,
					health : character.equipment.helmet.health,
					defence : character.equipment.helmet.defence,
					attack : character.equipment.helmet.attack,
					move : character.equipment.helmet.move,
					image: character.equipment.helmet.image
				},
				armour : {
					name : character.equipment.armour.name,
					health : character.equipment.armour.health,
					defence : character.equipment.armour.defence,
					attack : character.equipment.armour.attack,
					move : character.equipment.armour.move,
					image: character.equipment.armour.image
				},
				weapon : {
					name : character.equipment.weapon.name,
					health : character.equipment.weapon.health,
					defence : character.equipment.weapon.defence,
					attack : character.equipment.weapon.attack,
					move : character.equipment.weapon.move,
					image: character.equipment.weapon.image
				},
				shield : {
					name : character.equipment.shield.name,
					health : character.equipment.shield.health,
					defence : character.equipment.shield.defence,
					attack : character.equipment.shield.attack,
					move : character.equipment.shield.move,
					image: character.equipment.shield.image
				}
			}
		};
	/* Submit new Map */
		jQuery('form').submit(function(e){
			e.preventDefault();
			var mapdata = {};

			jQuery('#content').find('select').each(function(){
				var name = jQuery(this).attr('name');
				var value = jQuery(this).val();

				mapdata[name] = value;
			});

			jQuery.ajax({
			    type: "POST",
			    url: './insert.php',
			    data:{jsonArray: JSON.stringify(mapdata)},
			    timeout: 20000,
			    error: function(request,error) {
			        console.log(error);
			    },
			    success: function(data) {
			    	console.log(data);
			    }
			});
		});

	
	/* Move */
		jQuery(document).on('click','#proto-map .box:not(.disabled):not(.event)', function(){

			var box_row = jQuery(this).attr('data-map-row');
			var box_cell = jQuery(this).attr('data-map-cell');
			var box_cell_vert = jQuery(this).attr('data-map-cell-vertical');
			var movement = playerCharacter.getStat('move');

			if(movement <= 0) {
				movement = 1;
			}

			var terrain = move(box_row, box_cell, box_cell_vert, movement);
			charImg(character);
			triggerEvent(terrain);
			randomAdjacentTile();
			checkForEnd();
		});

		/* Keyboard Move */

			jQuery(document).keydown(function(e){
				var current_row = jQuery('.box.current').attr('data-map-row');
				var current_cell = jQuery('.box.current').attr('data-map-cell');
				var current_cell_vert = jQuery('.box.current').attr('data-map-cell-vertical');
				var movement = playerCharacter.getStat('move');
				if(!jQuery('.overlay').length) {
					if(e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40) {
						if(e.which === 37) {
							var box_row = current_row;
							var box_cell = parseInt(current_cell) - 1;
							var box_cell_vert = jQuery('.box[data-map-row="'+box_row+'"][data-map-cell="'+box_cell+'"]').attr('data-map-cell-vertical');
						}
						else if(e.which === 38) {
							var box_row = parseInt(current_row) - 1;
							var box_cell_vert = current_cell_vert;
							var box_cell = jQuery('.box[data-map-row="'+box_row+'"][data-map-cell-vertical="'+box_cell_vert+'"]').attr('data-map-cell');
						}
						else if(e.which === 39) {
							var box_row = current_row;
							var box_cell = parseInt(current_cell) + 1;
							var box_cell_vert = jQuery('.box[data-map-row="'+box_row+'"][data-map-cell="'+box_cell+'"]').attr('data-map-cell-vertical');
						}
						else if(e.which === 40) {
							var box_row = parseInt(current_row) + 1;
							var box_cell_vert = current_cell_vert;
							var box_cell = jQuery('.box[data-map-row="'+box_row+'"][data-map-cell-vertical="'+box_cell_vert+'"]').attr('data-map-cell');
						}
						if(movement <= 0) {
							movement = 1;
						}
						if(jQuery('.box[data-map-row="'+box_row+'"][data-map-cell="'+box_cell+'"][data-map-cell-vertical="'+box_cell_vert+'"]').length) {
							e.preventDefault();
							if(jQuery('.box[data-map-row="'+box_row+'"][data-map-cell="'+box_cell+'"][data-map-cell-vertical="'+box_cell_vert+'"]').attr('data-event-type') === 'monster'){

								var diff_row = Math.abs(current_row - box_row);
								var diff_cell = Math.abs(current_cell - box_cell);
								var diff_cell_vert = Math.abs(current_cell_vert - box_cell_vert);

								var total_diff =  Math.abs(diff_row + diff_cell);
								var total_diff_vert = Math.abs(diff_row + diff_cell_vert);

								if(total_diff <= movement && total_diff 
									|| total_diff_vert <= movement && total_diff_vert
								){

									var attackMonster = attack(box_row, box_cell, box_cell_vert, character);

									var playerAttack = attackMonster[0].playerHit;
									var monsterAttack = attackMonster[1].monsterHit;

									var monsterBox = jQuery('.box[data-map-row="'+box_row+'"][data-map-cell="'+box_cell+'"][data-map-cell-vertical="'+box_cell_vert+'"]')

									if(playerAttack) {
										jQuery(monsterBox).append('<div class="hit">Hit for '+playerAttack+'</div>');
										jQuery(monsterBox).children('.hit').addClass('fade');
									}
									else {
										jQuery(monsterBox).append('<div class="block">Blocked</div>');
										jQuery(monsterBox).children('.block').addClass('fade');
									}

									if(monsterAttack) {
										jQuery('.box.current').append('<div class="hit">Hit for '+monsterAttack+'</div>');
										jQuery('.box.current').children('.hit').addClass('fade');
									}
									else {
										jQuery('.box.current').append('<div class="block">Blocked</div>');
										jQuery('.box.current').children('.block').addClass('fade');
									}

									setTimeout(function(){
										jQuery(monsterBox).find('.hit').remove();
										jQuery(monsterBox).find('.block').remove();
										checkDead(character);
									},1000);
								}
							}
							else {
								var terrain = move(box_row, box_cell, box_cell_vert, movement);
								charImg(character);
								triggerEvent(terrain);
								randomAdjacentTile();
								checkForEnd();
							}
						}
					}
				}
			});

	/* Attack */
		jQuery(document).on('click','#proto-map .box.event[data-event-type="monster"]', function(){
			var box_row = jQuery(this).attr('data-map-row');
			var box_cell = jQuery(this).attr('data-map-cell');
			var box_cell_vert = jQuery(this).attr('data-map-cell-vertical');
			var movement = playerCharacter.getStat('move');

			if(movement <= 0) {
				movement = 1;
			}

			var current_row = jQuery('.box.current').attr('data-map-row');
			var current_cell = jQuery('.box.current').attr('data-map-cell');
			var current_cell_vert = jQuery('.box.current').attr('data-map-cell-vertical');

			var diff_row = Math.abs(current_row - box_row);
			var diff_cell = Math.abs(current_cell - box_cell);
			var diff_cell_vert = Math.abs(current_cell_vert - box_cell_vert);

			var total_diff =  Math.abs(diff_row + diff_cell);
			var total_diff_vert = Math.abs(diff_row + diff_cell_vert);

			if(total_diff <= movement && total_diff 
				|| total_diff_vert <= movement && total_diff_vert
			){
				var rowDiff = current_row - box_row;
				var cellDiff = current_cell - box_cell;

				var cellDir = 0;
				if(rowDiff > 0){
					cellDir = 1;
				}
				else if(rowDiff < 0){
					cellDir = 3;
				}
				else if(cellDiff > 0){
					cellDir = 4;
				}
				else if(cellDiff < 0){
					cellDir = 2;
				}

				var dirClass = 'rot_'+((cellDir-1) * 90);

				var attackMonster = attack(box_row, box_cell, box_cell_vert, character);

				var playerAttack = attackMonster[0].playerHit;
				var monsterAttack = attackMonster[1].monsterHit;

				var monsterBox = jQuery('.box[data-map-row="'+box_row+'"][data-map-cell="'+box_cell+'"][data-map-cell-vertical="'+box_cell_vert+'"]')

				jQuery(monsterBox).removeClass('rot_0');
				jQuery(monsterBox).removeClass('rot_90');
				jQuery(monsterBox).removeClass('rot_180');
				jQuery(monsterBox).removeClass('rot_270');
				jQuery(monsterBox).addClass(dirClass);

				if(playerAttack) {
					jQuery(monsterBox).append('<div class="hit">Hit for '+playerAttack+'</div>');
					jQuery(monsterBox).children('.hit').addClass('fade');
				}
				else {
					jQuery(monsterBox).append('<div class="block">Blocked</div>');
					jQuery(monsterBox).children('.block').addClass('fade');
				}

				if(monsterAttack) {
					jQuery('.box.current').append('<div class="hit">Hit for '+monsterAttack+'</div>');
					jQuery('.box.current').children('.hit').addClass('fade');
				}
				else {
					jQuery('.box.current').append('<div class="block">Blocked</div>');
					jQuery('.box.current').children('.block').addClass('fade');
				}

				setTimeout(function(){
					jQuery(monsterBox).find('.hit').remove();
					jQuery(monsterBox).find('.block').remove();
					checkDead(character);
				},1000);
			}
		});

	/* Accept Item */
		jQuery(document).on('click','.new-reward .accept_item',function(e){
			e.preventDefault();
			acceptItem(character);
		});

	/* Decline Item */
		jQuery(document).on('click','.new-reward .decline_item',function(e){
			e.preventDefault();
			jQuery('.new-reward').fadeOut();
			setTimeout(function(){
				jQuery('.new-reward').remove();
			},1000);
		});

	/* Button Click */
		jQuery(document).on('click','.button[data-button]',function(e){
			e.preventDefault();
			var button_target = jQuery(this).attr('data-button');
			jQuery('.'+button_target).slideToggle();
		});

	/* Equipment Hover */
		jQuery('.equip_items div').on({
			mouseenter: function(){
				var hover_target = jQuery(this).attr('id');
				jQuery('.equip_stats div[data-equipment="'+hover_target+'"]').show();
			},
			mouseleave: function(){
				var hover_target = jQuery(this).attr('id');
				jQuery('.equip_stats div[data-equipment="'+hover_target+'"]').hide();
			},
		});

	/* Next Level */
		jQuery('*[data-button="next"]').click(function(){
			var current_level = jQuery('#currentlevelid').val();
			loadLevel(current_level,'next');

			savedCharacter = {
				baseStats : {
					health : character.baseStats.health,
					defence : character.baseStats.defence,
					attack : character.baseStats.attack,
					move : character.baseStats.move,
				},
				modifiers : {
					health : character.modifiers.health,
					defence : character.modifiers.defence,
					attack : character.modifiers.attack,
					move : character.modifiers.move,
				},
				equipment : {
					helmet : {
						name : character.equipment.helmet.name,
						health : character.equipment.helmet.health,
						defence : character.equipment.helmet.defence,
						attack : character.equipment.helmet.attack,
						move : character.equipment.helmet.move,
						image: character.equipment.helmet.image
					},
					armour : {
						name : character.equipment.armour.name,
						health : character.equipment.armour.health,
						defence : character.equipment.armour.defence,
						attack : character.equipment.armour.attack,
						move : character.equipment.armour.move,
						image: character.equipment.armour.image
					},
					weapon : {
						name : character.equipment.weapon.name,
						health : character.equipment.weapon.health,
						defence : character.equipment.weapon.defence,
						attack : character.equipment.weapon.attack,
						move : character.equipment.weapon.move,
						image: character.equipment.weapon.image
					},
					shield : {
						name : character.equipment.shield.name,
						health : character.equipment.shield.health,
						defence : character.equipment.shield.defence,
						attack : character.equipment.shield.attack,
						move : character.equipment.shield.move,
						image: character.equipment.shield.image
					}
				}
			};
			jQuery('.overlay').hide();
			jQuery('#complete').removeClass('overlay');
			jQuery('#dead').removeClass('overlay');
			jQuery('#loading').show();
			initializePlayer(character);
			setTimeout(function(){
				charImg(character);
				jQuery('#loading').hide();
			}, 1000);
		});

	/* Reset Level */
		jQuery('*[data-button="restart"]').click(function(){
			var current_level = jQuery('#currentlevelid').val();
			loadLevel(current_level,'reset');
			savedCharacter = {
				baseStats : {
					health : character.baseStats.health,
					defence : character.baseStats.defence,
					attack : character.baseStats.attack,
					move : character.baseStats.move,
				},
				modifiers : {
					health : character.modifiers.health,
					defence : character.modifiers.defence,
					attack : character.modifiers.attack,
					move : character.modifiers.move,
				},
				equipment : {
					helmet : {
						name : character.equipment.helmet.name,
						health : character.equipment.helmet.health,
						defence : character.equipment.helmet.defence,
						attack : character.equipment.helmet.attack,
						move : character.equipment.helmet.move,
						image: character.equipment.helmet.image
					},
					armour : {
						name : character.equipment.armour.name,
						health : character.equipment.armour.health,
						defence : character.equipment.armour.defence,
						attack : character.equipment.armour.attack,
						move : character.equipment.armour.move,
						image: character.equipment.armour.image
					},
					weapon : {
						name : character.equipment.weapon.name,
						health : character.equipment.weapon.health,
						defence : character.equipment.weapon.defence,
						attack : character.equipment.weapon.attack,
						move : character.equipment.weapon.move,
						image: character.equipment.weapon.image
					},
					shield : {
						name : character.equipment.shield.name,
						health : character.equipment.shield.health,
						defence : character.equipment.shield.defence,
						attack : character.equipment.shield.attack,
						move : character.equipment.shield.move,
						image: character.equipment.shield.image
					}
				}
			};
			jQuery('.overlay').hide();
			jQuery('#complete').removeClass('overlay');
			jQuery('#dead').removeClass('overlay');
			jQuery('#loading').show();
			initializePlayer(character);
			setTimeout(function(){
				charImg(character);
				jQuery('#loading').hide();
			}, 1000);
		});

	/* Reset Character */
		jQuery('*[data-button="restartTotal"]').click(function(){
			var current_level = jQuery('#currentlevelid').val();
			loadLevel(current_level,'reset');

			character = {
				baseStats : {
					health : savedCharacter.baseStats.health,
					defence : savedCharacter.baseStats.defence,
					attack : savedCharacter.baseStats.attack,
					move : savedCharacter.baseStats.move,
				},
				modifiers : {
					health : savedCharacter.modifiers.health,
					defence : savedCharacter.modifiers.defence,
					attack : savedCharacter.modifiers.attack,
					move : savedCharacter.modifiers.move,
				},
				equipment : {
					helmet : {
						name : savedCharacter.equipment.helmet.name,
						health : savedCharacter.equipment.helmet.health,
						defence : savedCharacter.equipment.helmet.defence,
						attack : savedCharacter.equipment.helmet.attack,
						move : savedCharacter.equipment.helmet.move,
						image: savedCharacter.equipment.helmet.image
					},
					armour : {
						name : savedCharacter.equipment.armour.name,
						health : savedCharacter.equipment.armour.health,
						defence : savedCharacter.equipment.armour.defence,
						attack : savedCharacter.equipment.armour.attack,
						move : savedCharacter.equipment.armour.move,
						image: savedCharacter.equipment.armour.image
					},
					weapon : {
						name : savedCharacter.equipment.weapon.name,
						health : savedCharacter.equipment.weapon.health,
						defence : savedCharacter.equipment.weapon.defence,
						attack : savedCharacter.equipment.weapon.attack,
						move : savedCharacter.equipment.weapon.move,
						image: savedCharacter.equipment.weapon.image
					},
					shield : {
						name : savedCharacter.equipment.shield.name,
						health : savedCharacter.equipment.shield.health,
						defence : savedCharacter.equipment.shield.defence,
						attack : savedCharacter.equipment.shield.attack,
						move : savedCharacter.equipment.shield.move,
						image: savedCharacter.equipment.shield.image
					}
				}
			};
			jQuery('.overlay').hide();
			jQuery('#complete').removeClass('overlay');
			jQuery('#dead').removeClass('overlay');
			jQuery('#loading').show();
			initializePlayer(character);
			setTimeout(function(){
				charImg(character);
				jQuery('#loading').hide();
			}, 1000);
		});
	// TEST 

});