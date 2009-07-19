/*
 * EV Web (Experimental) - Web-based implementation of an Escape Velocity-like client engine.
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 * Copyright (c) 2009 Alex Trujillo
 * ev.js
 * Main function, as well as other functions that are still being developed before being split off to other files.
 */

/* Parallel Loader */

var loadingGraphics = true;
var numGraphicsLoaded = 0;

// Ticks off each time a image is loaded. Once the last image is loaded, fire off the main function.
function graphicsLoaded () {
	numGraphicsLoaded++;
	if (numGraphicsLoaded == shipGraphics.length) {
		// Kludgy also
		shipSheet = shipGraphics[0][0];
		glowSheet = shipGraphics[1][0];
		// Kludgy, but doesn't confuse users by loading a blank image
	//	setTimeout("Init()", 750);
		Init();
	}
}

// Load each image into the shipGraphics array.
$(document).ready(function() {
	for (i = 0; i < shipGraphics.length; i++) {
		shipGraphics[i][0] = new Image();
		shipGraphics[i][0].onLoad = graphicsLoaded();
		shipGraphics[i][0].src = shipGraphics[i][1];
	}
});

/* Main Function */

function Init () {
	starfield();
	
	// Prepare starbridge canvas
	var canvas = document.getElementById('starbridge');
	canvas.setAttribute('style', 'background: none');
	
	// Input
	window.addEventListener("keydown", Key, false);
	window.addEventListener("keyup", Key, false);
	
	// HTML5 Canvas context.
	SetContext();
	
	// Draw first frame.
	DrawSprite(shipSheet, 0, 0, 48, 12, 10, false);
	
	// Set timer
	gameTimer(false);
}

/* Game Timer */

function gameTimer(pause) {	
	if (pause) {
		window.clearInterval(gamePulse);
	} else {
		var gamePulse = window.setInterval("evalState()", 25);
	}
}

function evalState() {
	
}

/* Ship Navigation */

var glowFlicker = false;

// Updates the ship's appearance according to its direction and speed
function updateShip (change) {
	frame = {x: shipSystem[0][3], y: shipSystem[0][4]};
	alpha = shipSystem[0][5];
	
	// Turning
	if (change == 'turnRight') {
		// Turn the ship using the stored graphical framestep
		frame = rotateShip('right', frame);
		recordShip (frame, false);
	}
	else if (change == 'turnLeft') {
		frame = rotateShip('left', frame);
		recordShip (frame, false);
	}
	
	// Engine glow ("speed")
	else if (change == 'speedUp') {
		if (alpha < 7) {
			alpha++;
			recordShip(false, alpha);
		}
	}
	else if (change == 'slowDown') {
		if (alpha > 0) {
			alpha--;
			recordShip(false, alpha);
		} else if (alpha === 0) {
			shipMoving = false;
		}
	}
	
	// Makes the engines flicker when at top speed
	if (alpha == 7 && glowFlicker) {
		alpha = 8;
		glowFlicker = false;
	} else if (alpha > 0) {
		alpha--;
		glowFlicker = true;
	}
	
	DrawSprite(glowSheet, frame.x, frame.y, 72, 0, alpha, true);
	DrawSprite(shipSheet, frame.x, frame.y, 48, 12, 10, false);
}

// Update ship's stored variables
function recordShip (frame, alpha) {
	if (frame !== false) {
		shipSystem[0][3] = frame.x;
		shipSystem[0][4] = frame.y;
	}
	if (alpha !== false) {
		shipSystem[0][5] = alpha;
	}
}

/* Canvas Graphics Functions */

// Translates across the 6x6 ship sprite sheet in either direction
// When it gets to the side of the sheet, go to the next row or column

function rotateShip (direction, frame) {
	if (direction == 'right') {
		frame.x++;
		if (frame.x == 6) {
			frame.y++;
			frame.x = 0;
		}
		if (frame.y == 6) {
			frame.y = 0;
		}
	} else if (direction == 'left') {
		frame.x--;
		if (frame.x < 0) {
			frame.y--;
			frame.x = 5;
		}
		if (frame.y < 0) {
			frame.y = 5;
		}
	}
	
	return {x: frame.x, y: frame.y};
}

// Global variables to keep track of ship orientation.

var context;

function SetContext () {
	var canvas = document.getElementById('starbridge');
	if (canvas.getContext) {
		context = canvas.getContext('2d');
	}
}

// Parameters: Sprite sheet (ship, glow), step of the animation
// (which sprite on the sheet to display, x/y), how far away from
// top/left do we want to offset the sprite, transparency, and
// should we clear the canvas on the next frame load (true/false).
function DrawSprite (sheet, xstep, ystep, size, offset, alpha, clear) {
	if (clear) {
		context.clearRect (0, 0, size, size);
	}
	context.globalAlpha = alpha / 10;
	context.globalCompositeOperation = 'lighter';
	// Uses the sprite sheet to draw on the board:
	context.drawImage(sheet,
	// Which sprite to show on the sheet (determined by sprite size),
	xstep * size, ystep * size,
	// Sprite size (shows more sprites per sprite window),
	size, size,
	// Sprite offset (from the left and top of the canvas),
	offset, offset,
	// Sprite resize (makes it bigger).
	size, size);
}