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
	
	var screenWidth = $('body').innerWidth()
	var screenHeight = $('body').innerHeight();
	
	// Attach new canvas
	$('body').append(
		$("<canvas>").attr({
			id: 'starfield',
			width: screenWidth,
			height: screenHeight
		})
	);
	
	// Ripped from the Opera examples
	// Get the canvas element.
	var elem = document.getElementById('starfield');
	if (!elem || !elem.getContext) {
		return;
	}
	
	// Get the canvas 2d context.
	var context = elem.getContext('2d');
	if (!context) {
		return;
	}
	
	// Draw stars in each color
	for (var i = 0; i < starAttrs.length; i++) {
		context.fillStyle = starAttrs[i][0];
		// Draw a certain number of stars
		for (var j = 0; j < Math.floor(Math.random() * 100 * starAttrs[i][2]); j++) {
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