// Define global variables
var MoveX = 0;
var MoveY = 0;
var SpeedX = 0;
var SpeedY = 0;
var otherShipX;

//    curX = document.getElementById('PlanetLayer').style.top;
//    curX = curX.substring(0, curX.length - 2);
//    curY = document.getElementById('PlanetLayer').style.left;
//    curY = curY.substring(0, curY.length - 2);
//    curY = parseInt(curY);
var curX = 0;
var curY = 0;
var Friction = .997;

// Move objects to simulate movement of the ship.

function ShipMove() {

 MyShip.checkShow();

 if (MyShip.checkShow() == 1) {
 
  ShipAngle = MyShip.getShipDirection() * 15;
  MoveX = MyShip.getShipAccel() * Math.sin((ShipAngle*Math.PI)/180) * -1;
  MoveY = MyShip.getShipAccel() * Math.cos((ShipAngle*Math.PI)/180);
    
  SpeedX *= Friction;
  SpeedY *= Friction;
 
  curX += SpeedX;
  curY += SpeedY;
  MyX = (curX * -1) + ShipX;
  MyY = (curY * -1) + ShipY;
      
  var objPlanet = document.getElementById('PlanetLayer');
  objPlanet.style.top = curY;
  objPlanet.style.left = curX;
 

 var objShips = document.getElementById('ShipLayer');
 objShips.style.top = curY;
 objShips.style.left = curX;
 
  

 }   
 
   var objInfo = document.getElementById('Info');

   objInfo.innerHTML = "MyY = " + MyY + " OtherShipX = " + otherShipX

 for (var i=0, o; o=ShipsInSystem[i]; i++) {
  intLeft = GetShipValue(o, 14);
  intTop = GetShipValue(o, 15);
  otherShipX = intTop

  document.getElementById('Ship' + o).style.top = intTop;
  document.getElementById('Ship' + o).style.left = intLeft;
 }



 window.setTimeout('ShipMove();', 50);

}

function setMyLocation() {
 MyShip.setLocation(MyX,MyY);
 window.setTimeout('setMyLocation();', 500);
}
 