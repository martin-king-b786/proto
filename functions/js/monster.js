function addMonsterT1(){
	var affecedCell = randomAdjacentTile();

	var actualCell = jQuery('.box[data-map-row="'+affecedCell.curr_row+'"][data-map-cell="'+affecedCell.curr_cell+'"][data-map-cell-vertical="'+affecedCell.curr_cell_vert+'"]')
	
	jQuery.ajax({
	    type: "POST",
	    url: './functions/get_rand_monster.php',
	    data:{monster_tier: 1},
	    timeout: 3000,
	    error: function(request,error) {
	        console.log(error);
	    },
	    success: function(data) {
	    	console.log(data);
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
	    	jQuery(actualCell).attr('data-reward-level','1');
	    }
	});

}

function addMonsterT2(){
	console.log('Monster1');
}

function addMonsterT3(){
	console.log('Monster1');
}