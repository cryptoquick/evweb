/*
 * EV Web (Experimental) - Web-based implementation of an Escape Velocity-like client engine.
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 * Copyright (c) 2009 Alex Trujillo
 * data.js
 * Holds game and graphics data. Will get larger as more content is added.
 */

/* Graphics */

var ship_size = 48;
var glow_size = 72;

/* Ship Resources */

var shipGraphics = [
	[null, 'images/starbridge-alpha.png', false],
	[null, 'images/starbridge-glow-alpha.png', false]
];

// Some basic spritesheet information
var shipData = {
	starbridge: {framesX: 6, framesY: 6, baseSizeX: 48, baseSizeY: 48, glowSizeX: 72, glowSizeY: 72}
};

// This is supposed to be where all objects in the system are tracked, along with their attributes.
// name, direction, speed, xstep, ystep, alpha
var shipSystem = [
	['starbridge', 0, 0, 0, 0, 0.0]
];