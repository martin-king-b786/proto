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

function getScriptCached(url,callback){
	jQuery.ajax({
	    type: "GET",
	    url: url,
	    dataType:"script",
	    success: callback,
	    cache: true
	});	
}
function charImg(){
	jQuery('#char-img').remove();
	jQuery('.box.current').html(''+
		'<div id="char-img">'+
			'<img src="./images/char.png"/>'+
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

	charImg();
}

function move(tile_row, tile_cell, tile_cell_vert, movement){
	
	var current_row = jQuery('.box.current').attr('data-map-row');
	var current_cell = jQuery('.box.current').attr('data-map-cell');
	var current_cell_vert = jQuery('.box.current').attr('data-map-cell-vertical');

	var diff_row = Math.abs(current_row - tile_row);
	var diff_cell = Math.abs(current_cell - tile_cell);
	var diff_cell_vert = Math.abs(current_cell_vert - tile_cell_vert);

	var total_diff =  Math.abs(diff_row + diff_cell);
	var total_diff_vert = Math.abs(diff_row + diff_cell_vert);

	if(total_diff <= movement && total_diff 
		|| total_diff_vert <= movement && total_diff_vert
	){
		var newBox = jQuery('.box[data-map-row="'+tile_row+'"][data-map-cell="'+tile_cell+'"]');

		jQuery('.box').removeClass('current');
		jQuery(newBox).addClass('current');

		var terrain_type = jQuery(newBox).attr('data-terrain');

		charImg();

		return terrain_type;
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

	var monster = jQuery('.box[data-map-row="'+monster_row+'"][data-map-cell="'+monster_cell+'"][data-map-cell-vertical="'+monster_cell_vert+'"]')
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

function addReward(tile_row, tile_cell, tile_cell_vert, reward_tier, character){
	var playerChar = character;
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
	    		console.log(data);
	    		var reward_row = tile_row;
				var reward_cell = tile_cell;
				var reward_cell_vert = tile_cell_vert;
				var reward = jQuery('.box[data-map-row="'+reward_row+'"][data-map-cell="'+reward_cell+'"][data-map-cell-vertical="'+reward_cell_vert+'"]')

				var received_reward = JSON.parse(data);
				var reward_name = received_reward.reward.name;
				var reward_type = received_reward.reward.type;
				jQuery('#proto-map').append('<div class="new-reward"></div>');
				var playerCharHealth = playerChar.modifiers.health;
				var playerCharAttack = playerChar.modifiers.attack;
				var playerCharDefence = playerChar.modifiers.defence;
				var playerCharMovement = playerChar.modifiers.move;

				if(reward_type === "modifier"){
					jQuery('#proto-map .new-reward').append(''+
						'<input type="hidden" name="modifier-health" value="'+received_reward.reward.stats.health+'"/>'+
						'<input type="hidden" name="modifier-attack" value="'+received_reward.reward.stats.attack+'"/>'+
						'<input type="hidden" name="modifier-defence" value="'+received_reward.reward.stats.defence+'"/>'+
						'<input type="hidden" name="modifier-move" value="'+received_reward.reward.stats.move+'"/>'+
						'<h3>New Item Found!</h3>'+
						'<img src="'+received_reward.reward.image+'"/>'+
						'<input type="submit" class="accept_item" value="Use Item"/>'+
						'<input type="submit" class="decline_item" value="Ignore Item"/>'
					);
/*
					playerChar.modifiers.health = playerCharHealth + parseInt(received_reward.reward.stats.health);
					playerChar.modifiers.attack = playerCharAttack + parseInt(received_reward.reward.stats.attack);
					playerChar.modifiers.defence = playerCharDefence + parseInt(received_reward.reward.stats.defence);
					playerChar.modifiers.move = playerCharMovement + parseInt(received_reward.reward.stats.move);
*/
				}
				else {
					jQuery('#proto-map .new-reward').append(''+
						'<input type="hidden" name="equipment-type" value="'+reward_type+'"/>'+
						'<input type="hidden" name="equipment-health" value="'+received_reward.reward.stats.health+'"/>'+
						'<input type="hidden" name="equipment-attack" value="'+received_reward.reward.stats.attack+'"/>'+
						'<input type="hidden" name="equipment-defence" value="'+received_reward.reward.stats.defence+'"/>'+
						'<input type="hidden" name="equipment-move" value="'+received_reward.reward.stats.move+'"/>'+
						'<h3>New Item Found!</h3>'+
						'<h4>'+reward_name+'</h4>'+
						'<img src="'+received_reward.reward.image+'"/>'+
						'<div class="health"></div>'+
						'<div class="attack"></div>'+
						'<div class="defence"></div>'+
						'<div class="movement"></div>'+
						'<input type="submit" class="accept_item" value="Equip Item"/>'+
						'<input type="submit" class="decline_item" value="Ignore Item"/>'
					);
/*
					playerChar.equipment[reward_type].name = reward_name;
					playerChar.equipment[reward_type].health = parseInt(received_reward.reward.stats.health);
					playerChar.equipment[reward_type].attack = parseInt(received_reward.reward.stats.attack);
					playerChar.equipment[reward_type].defence = parseInt(received_reward.reward.stats.defence);
					playerChar.equipment[reward_type].move = parseInt(received_reward.reward.stats.move);
*/
				}
				jQuery('.new-reward').fadeIn();
				jQuery('.new-reward').show();
				initializePlayer(playerChar);
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
		var reward_name = jQuery(reward).find('h4').html();
		var reward_type = jQuery(reward).find('input[name="equipment-type"]').val();
		var reward_health = jQuery(reward).find('input[name="equipment-health"]').val();
		var reward_attack = jQuery(reward).find('input[name="equipment-attack"]').val();
		var reward_defence = jQuery(reward).find('input[name="equipment-defence"]').val();
		var reward_move = jQuery(reward).find('input[name="equipment-move"]').val();
		var reward_image = jQuery(reward).find('img').attr('src');

		playerChar.equipment[reward_type].name = reward_name;
		playerChar.equipment[reward_type].health = parseInt(reward_health);
		playerChar.equipment[reward_type].attack = parseInt(reward_attack);
		playerChar.equipment[reward_type].defence = parseInt(reward_defence);
		playerChar.equipment[reward_type].move = parseInt(reward_move);

		jQuery('div#player .equipment .equip_items #equip_'+reward_type).html('<img src="'+reward_image+'"/>');
		if(jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"]').length){
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] h5').html(reward_name);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .health .value').html(reward_health);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .attack .value').html(reward_attack);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .defence .value').html(reward_defence);
			jQuery('div#player .equipment .equip_stats div[data-equipment="equip_'+reward_type+'"] .move .value').html(reward_move);
		}
		else {
			jQuery('div#player .equipment .equip_stats').html(''+
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
}

function checkDead(character){
	var player = character;
	var charStats = new characterStats(player);
	var playerHealth = charStats.getStat('health');
	if(playerHealth <= 0){
		jQuery('#dead').fadeIn();
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

			addReward(current_row,current_cell,current_cell_vert,tier, character);
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
	}
}

jQuery(document).ready(function(){
	/* Initialize Char Stats */

		var character = {
			baseStats : {
				health : 10,
				defence : 1,
				attack : 1,
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
				},
				armour : {
					name : 'A shirt and trousers',
					health : 0,
					defence : 0,
					attack : 0,
					move : 0,
				},
				weapon : {
					name : 'A hefty stick',
					health : 0,
					defence : 0,
					attack : 1,
					move : 0,
				},
				shield : {
					name : 'Your left wrist',
					health : 0,
					defence : 0,
					attack : 0,
					move : 0,
				}
			}
		};
		playerCharacter = new characterStats(character);

		initializePlayer(character);

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

			var terrain = move(box_row, box_cell, box_cell_vert, movement);
			triggerEvent(terrain);
			randomAdjacentTile();
			checkForEnd();
		});

	/* Attack */
		jQuery(document).on('click','#proto-map .box.event[data-event-type="monster"]', function(){
			var box_row = jQuery(this).attr('data-map-row');
			var box_cell = jQuery(this).attr('data-map-cell');
			var box_cell_vert = jQuery(this).attr('data-map-cell-vertical');

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
				console.log('in');
				var hover_target = jQuery(this).attr('id');
				jQuery('.equip_stats div[data-equipment="'+hover_target+'"]').show();
			},
			mouseleave: function(){
				console.log('out');
				var hover_target = jQuery(this).attr('id');
				jQuery('.equip_stats div[data-equipment="'+hover_target+'"]').hide();
			},
		});

});