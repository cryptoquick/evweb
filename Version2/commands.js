// Define global variables
var intBlockInput = 0;
var ShipState = "Active"


// Catch any key inputs
function HandleUserInput(e) {
 var intKey = 0;
 var strKey = '';
 // Determine which key was pressed.
 if(window.event) {
  // IE
  intKey = e.keyCode;
 } else if(e.which) {
  // Netscape/Firefox/Opera
  intKey = e.which;
 }
 // Convert the scan code to ASCII letter
 strKey = String.fromCharCode(intKey).toUpperCase();
 if (intBlockInput == 0) {
  // Respond based on the key pressed.
  if ( strKey == "A" ) {
   MyShip.turnLeft();
  }
     
  if ( strKey == "D" ) {
   MyShip.turnRight();
  }
       
  if ( strKey == "W" && ShipState != "Stopped") {
   setTimeout("MyShip.accelerate()",200);
  }

  if ( strKey == "M" ) {
   OpenMapWindow();
  }

  if ( strKey == "J" ) {
   CheckJump();
  }

  if ( strKey == "L" ) {
   ShipState = 'Stopped'
   OpenPlanetWindow();
  }

  if ( strKey == "T" ) {
   Refresh();
  }

  if ( strKey == "X" ) {
   SpeedX = 0;
   SpeedY = 0;
  }

  if ( strKey == "Y" ) {
   OpenTextBox();
  }      
 }
 else
  return strKey; 
 return false;
}