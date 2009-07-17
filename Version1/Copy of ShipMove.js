// Move objects to simulate movement of the ship.
   function ShipMove() {
    var objBackdrop = document.getElementById('Backdrop1');
    var ScreenHeight = objBackdrop.offsetHeight;
    var ScreenWidth = objBackdrop.offsetWidth;
   
   
   for (var i = 0; i <= 23; i++)
    {
      var objBackdrop = document.getElementById('Backdrop1');
      var ScreenHeight = objBackdrop.offsetHeight;
      var ScreenWidth = objBackdrop.offsetWidth;
    
    //Planet movement
      curX += (aryShipMovement[i][0] * aryShipMovement[i][2]);
      curY += (aryShipMovement[i][0] * aryShipMovement[i][1]);
      var objPlanet = document.getElementById('PlanetLayer');
      objPlanet.style.top = curY;
      objPlanet.style.left = curX;
      MyX = (curX * -1) + ShipX;
      MyY = (curY * -1) + ShipY;
   //   alert(MyY);

    //ShipLayer movement
      curX += (aryShipMovement[i][0] * aryShipMovement[i][2]);
      curY += (aryShipMovement[i][0] * aryShipMovement[i][1]);
      var objPlanet = document.getElementById('ShipLayer');
      objPlanet.style.top = curY;
      objPlanet.style.left = curX;
      
    //Div Stars Movement: Main first starfield DIV
      StarLeft += (aryShipMovement[i][0] * aryShipMovement[i][2]) * .75;
      StarTop += (aryShipMovement[i][0] * aryShipMovement[i][1]) * .75;

      var objStars = document.getElementById('Star'); 
      if ( StarTop > ScreenHeight) 
       StarTop = ScreenHeight * -1;
      if ( StarTop < (ScreenHeight * -1) )
       StarTop = ScreenHeight;     
      if ( StarLeft < ( ScreenWidth * -1 ) )
       StarLeft = ScreenWidth;
      if ( StarLeft > ScreenWidth )
       StarLeft = ScreenWidth * -1;
     objStars.style.top = StarTop;
     objStars.style.left = StarLeft;
     }

   window.setTimeout('ShipMove();', 50);
   }