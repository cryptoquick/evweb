/* Main Function */

// I need to redesign this as a parallel loader function.
window.addEventListener('load', function () {
	shipSheet.src = 'graphics/starbridge-alpha.png';
	shipSheet.onload = function () {
		glowSheet.src = 'graphics/starbridge-glow-alpha.png';
		glowSheet.onload = function () {
			var canvas = document.getElementById('starbridge');
			canvas.setAttribute('style', 'background: none');
			Init();
		}
	}
}, false);

function Init () {
	// Load sprite sheets.
	
	window.addEventListener("keydown", Key, false);
	window.addEventListener("keyup", Key, false);
	
	// HTML5 Canvas context.
	SetContext();
	
	// Draw first frame.
	DrawSprite(shipSheet, 0, 0, 48, 12, false);
}

/* Input */

var smoothturn;
var keyPressed = false;

function Key (evt) {
	var currentKey = 0;
	if (evt.type == "keydown") {
		//some browsers support evt.charCode, some only evt.keyCode
		if (evt.charCode) {
			var charCode = evt.charCode;
		}
		else {
			var charCode = evt.keyCode;
		}
		// Left arrow key
		if (charCode == 39) {
			// setInterval animates (read, repeats) the function at a certain speed.
			// Current speed is set to 0.03 seconds, or 33FPS.
			if (keyPressed == false) {
				smoothturn = window.setInterval("RotateShip('right')", 30);
			}
			// This variable helps under the condition that if the key is held long enough
			// to repeat, the program won't set an interval again until it is released.
			keyPressed = true;
		}
		// Right arrow key
		if (charCode == 37) {
			if (keyPressed == false) {
				smoothturn = window.setInterval("RotateShip('left')", 30);
			}
			keyPressed = true;
		}
	}
	
	if (evt.type == "keyup") {
		window.clearInterval(smoothturn);
		keyPressed = false;
	}
}

/* Ship Navigation */

function RotateShip (direction) {
    // Translates across the 6x6 ship grid in either direction
	if (direction == 'right') {
		xstep++;
		if (xstep == 6) {
			ystep++;
			xstep = 0;
		}
		if (ystep == 6) {
			ystep = 0;
		}
	} else { //(direction = 'left') 
		xstep--;
		if (xstep < 0) {
			ystep--;
			xstep = 5;
		}
		if (ystep < 0) {
			ystep = 5;
		}
	}
	
	DrawSprite(glowSheet, xstep, ystep, 72, 0, true);
	DrawSprite(shipSheet, xstep, ystep, 48, 12, false);
}

/* Canvas Graphics Functions */

// Global variables to keep track of ship orientation.
var ship_size = 48;
var glow_size = 72;
var xstep = 0;
var ystep = 0;

var shipSheet = new Image();
var glowSheet = new Image();

var context;

function SetContext () {
	var canvas = document.getElementById('starbridge');
	if (canvas.getContext) {
		context = canvas.getContext('2d');
	}
}

// Parameters: Sprite sheet (ship, glow), step of the animation
// (which sprite on the sheet to display, x/y), how far away from
// top/left do we want to offset the sprite, and should we clear
// the canvas on the next frame load (true/false).
function DrawSprite (sheet, xstep, ystep, size, offset, clear) {
	if (clear) {
		context.clearRect (0, 0, size, size);
	}
	context.globalCompositeOperation = 'lighter';
	// Uses the sprite sheet to draw on the board:
	context.drawImage(sheet,
	// Which sprite to show on the sheet (determined),
	xstep * size, ystep * size,
	// Sprite size (shows more sprites per sprite window),
	size, size,
	// Sprite offset (from the left and top of the canvas),
	offset, offset,
	// Sprite resize (makes it bigger).
	size, size);
}