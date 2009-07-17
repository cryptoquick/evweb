


function GetShips(intPlayer, intSystem, intMyX, intMyY, ShipFacing, Show)
{ 
 xmlHttp = GetXmlHttpObject();
 if ( xmlHttp == null )
  {
   alert("Your browser does not support AJAX!");
   return;
  }
 var url = "FindShips.asp?Player=" + intPlayer + "&System=" + intSystem + "&MyX=" + intMyX + "&MyY=" + intMyY + "&Facing=" + ShipFacing + "&Show=" + Show;
// document.getElementById("Info").innerHTML = url
 xmlHttp.onreadystatechange=PlaceShips;
 xmlHttp.open("GET", url, true);
 xmlHttp.send(null);


}
 


function PlaceShips()
{
 if(xmlHttp.readyState==4)
   {
ResponseText = xmlHttp.responseText


if ( ResponseText != "" ){
var aryShips = ResponseText.split('|') ;

for (var i=0, o; o=aryShips[i]; i++) {

//aryValues[System, ID, Top, Left, Height, Width, URL, Facing, Show, ShipType]
var aryValues = o.split(',');
//alert(aryValues)

var strBackground = 'url(\'' + aryValues[6] + '\')';
//alert(aryValues[8])

//document.getElementById("Info").innerHTML = aryValues

var objParent = document.getElementById('PlanetLayer');

//Determine if ship is drawn in system
divShip = document.getElementById('Ship' + aryValues[1]);

//If ship isn't drawn, but is in the system, draw it.
if ( divShip == undefined && aryValues[0] == intSystemID && aryValues[8] == 1 )
 var divShip = document.createElement('div');


//If it's not shown, or is not in the system, remove it
if ( divShip != undefined && ( aryValues[8] == 0 || aryValues[0] != intSystemID ) ) {
 divShip.style.visibility = 'hidden'
// document.getElementById("Info").innerHTML = "Gone"; 
}

if ( divShip != undefined && aryValues[0] == intSystemID && aryValues[8] == 1){
 strShipID = "Ship" + aryValues[1];
 divShip.setAttribute("id", strShipID);
 divShip.style.position='absolute';
 divShip.style.top = parseInt(aryValues[2]) + 'px';
 divShip.style.left= parseInt(aryValues[3]) + 'px';
 divShip.style.height = aryValues[4];
 divShip.style.width = aryValues[5];
 divShip.style.zIndex = 40;
 divShip.style.background = 'url(\'' + aryValues[6] + '\')';
 divShip.style.backgroundPosition = ShipDirection[aryValues[9]][aryValues[7]];
 divShip.style.visibility = 'visible';
 divShip.onclick = function () {
		    Highlight(strShipID, 'Ship', aryValues[1]);
		   };
 objParent.appendChild(divShip);
}


}
}

window.setTimeout('GetShips(intPlayerID, intSystemID, MyX, MyY, ShipFacing, intShow);', 0);



   }
}

 


