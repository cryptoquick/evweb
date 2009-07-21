/*
 * EV Web (Experimental) - Web-based implementation of an Escape Velocity-like client engine.
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 * Copyright (c) 2009 Alex Trujillo
 * starfield.js
 * Creates the starfield in the background.
 */

function starfield() {
	// Create 3 layers of stars. One close, one medium, one far.
	var starAttrs = [
		['yellow', 1, 1, .75, 'Star'],  
		['white', 2, .5, .25, 'Star2'],
		['lightcyan', 1, 2, .50, 'Star3']
	];
	
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	var starNum = Math.random() * 100

	for (var i=0; i < starAttrs.length; i++) {

		// Attach new canvas
		$('body').append(
			$("<canvas>").attr({
				id: starAttrs[i][4],
				width: screenWidth,
				height: screenHeight,
				class: 'Starfields'
			})
		);
		
		// Ripped from the Opera examples
		// Get the canvas element.
		var elem = document.getElementById(starAttrs[i][4]);
		if (!elem || !elem.getContext) {
			return;
		}
	
		// Get the canvas 2d context.
		var context = elem.getContext('2d');
		if (!context) {
			return;
		}
	
		
		context.fillStyle = starAttrs[i][0];
		
		
		// Draw a certain number of stars
		for (var j = 0; j < Math.floor(starNum * starAttrs[i][2]); j++) {
			context.fillRect  (
				// Random position in the x and y
				Math.floor(screenWidth * Math.random()),
				Math.floor(screenHeight * Math.random()),
				starAttrs[i][1],
				starAttrs[i][1]
			);
		}
		
	}
}

