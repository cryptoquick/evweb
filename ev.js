/* Main Function */

// I need to redesign this as a parallel loader function.
var loadingGraphics = true;
var numGraphicsLoaded = 0;

var shipSheet = new Image();
var glowSheet = new Image();

var shipGraphics = [
	[shipSheet, 'graphics/starbridge-alpha.png', false],
	[glowSheet, 'graphics/starbridge-glow-alpha.png', false]
];

function graphicsLoaded () {
	numGraphicsLoaded++;
	if (numGraphicsLoaded == shipGraphics.length) {
		Init();
	}
}

window.addEventListener('load', function () {
	for (i = 0; i < shipGraphics.length; i++) {
		shipGraphics[i][0].src = shipGraphics[i][1];
		shipGraphics[i][0].onLoad = graphicsLoaded();
	}
}, false);

function Init () {
	var canvas = document.getElementById('starbridge');
	canvas.setAttribute('style', 'background: none');
	
	// Load sprite sheets.
	
	window.addEventListener("keydown", Key, false);
	window.addEventListener("keyup", Key, false);
	
	// HTML5 Canvas context.
	SetContext();
	
	// Draw first frame.
	DrawSprite(shipSheet, 0, 0, 48, 12, 10, false);
}

/* Player Input */

var smoothturn;
var smoothGo;
var shipMoving = false;
var keyPressed = 0;
var slowDown = false;

function Key (evt) {
	var currentKey = 0;
	if (evt.type == "keydown") {
		// Some browsers support evt.charCode, some only evt.keyCode
		if (evt.charCode) {
			charCode = evt.charCode;
		}
		else {
			charCode = evt.keyCode;
		}
		
		// Left arrow key
		if (charCode == 39) {
			// setInterval animates (read, repeats) the function at a certain speed.
			// Current speed is set to 0.03 seconds, or 33FPS.
			if (keyPressed == 0) {
				smoothturn = window.setInterval("updateShip('turnRight')", 30);
			}
			// If this key is pressed while the other key is active, then turn this way
			else if (keyPressed == 37) {
				window.clearInterval(smoothturn);
				smoothturn = window.setInterval("updateShip('turnRight')", 30);
			}
			// This variable helps under the condition that if the key is held long enough
			// to repeat, the program won't set an interval again until it is released.
			keyPressed = 39;
		}
		// Right arrow key
		if (charCode == 37) {
			if (keyPressed === 0) {
				smoothturn = window.setInterval("updateShip('turnLeft')", 30);
			}
			else if (keyPressed == 39) {
				window.clearInterval(smoothturn);
				smoothturn = window.setInterval("updateShip('turnLeft')", 30);
			}
			keyPressed = 37;
		}
		
		// Up arrow key
		if (charCode == 38) {
			smoothGo = window.setInterval("updateShip('speedUp')", 100);
			shipMoving = true;
		}
		// Down arrow key
		if (charCode == 40) {
			// This will eventually be where I'll put the 'reverse direction' code.
		}
	}
	
	if (evt.type == "keyup") {
		window.clearInterval(smoothturn);
		window.clearInterval(smoothGo);

		keyPressed = 0;
		/*
		if (shipMoving === false) {
			slowDown = window.setInterval("updateShip('slowDown')", 200);
		} else {
			window.clearInterval(slowDown);
		}*/
	}
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