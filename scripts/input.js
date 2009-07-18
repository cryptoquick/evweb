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