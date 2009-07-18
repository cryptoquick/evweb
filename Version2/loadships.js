// Define global variables
var intFlagshipID;
var MyShip;
var ShipX;
var ShipY;
var ShipsInSystem = new Array();


function LoadShips(intSystemID) {
 
 // Use Ajax to update this ships information in the Application. 
 //Load the ship after the application variable is updated. 
 //var strMyShipInfo = $.post('MyShipInfo.asp?Player=' + strPUID);

 loadMyShip();
 


 // This function will load the players flagship.
 function loadMyShip() {
  // Find flagship ID
  intFlagShipID = GetFlagShipID(strPUID);

  // Create Myship
  MyShip = new Ship(intFlagShipID, 1);

  // Update MyShip location.
  ShipY = ( document.getElementById("PlanetLayer").offsetHeight / 2 );
  ShipX = ( document.getElementById("PlanetLayer").offsetWidth / 2 );
 }

 // Create layer for other players ships
 objShipLayer = document.createElement('div');
 objShipLayer.setAttribute('id', 'ShipLayer');
 document.body.appendChild(objShipLayer);
 var PlanetInfo = $.post('systemInfo.asp?Get=Ships&SystemID=' + intSystemID, function(data){ buildShipLayer(data) } );

 // Load other player ships into system
 function buildShipLayer(data) {
  var aryShips = data.split(",");
//  alert(aryShips);
  for (var i=0, o; o=aryShips[i]; i++) {
   if (o != intFlagShipID) {
    new Ship(o, 0);
    ShipsInSystem.push(o);
   }
  }
 // alert(ShipsInSystem.length);
 }
 



 ShipMove();
 setMyLocation();
}



// The following ajax will pull a value from the application.


function GetFlagShipID(strPUID){
 var intFlagshipID = $.ajax({
  			url: 'GetFlagshipID.asp?Player=' + strPUID,
			async: false,
		       });
  
  return intFlagshipID.responseText;
}