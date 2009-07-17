// Move objects to simulate movement of the ship.
   function ShipMove() {

    ShipAngle = ShipFacing * 15;
    MoveX = ShipAccelRate * Math.sin((ShipAngle*Math.PI)/180) * -1;
    MoveY = ShipAccelRate * Math.cos((ShipAngle*Math.PI)/180);


    
    SpeedX *= Friction;
    SpeedY *= Friction;

    curX += SpeedX;
    curY += SpeedY;
    MyX = (curX * -1) + ShipX;
    MyY = (curY * -1) + ShipY;
      
    var objBackdrop = document.getElementById('Backdrop1');
    
    var objPlanet = document.getElementById('PlanetLayer');
    objPlanet.style.top = curY;
    objPlanet.style.left = curX;

    var objShips = document.getElementById('ShipLayer');
    objShips.style.top = curY;
    objShips.style.left = curX;
    
    var objInfo = document.getElementById('Info');
    //objInfo.innerHTML = "SpeedX: " + SpeedX/ShipAccelRate + ", SpeedY: " + MoveY
    window.setTimeout('ShipMove();', 50);
   }