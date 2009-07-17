


function GetShips(intPlayer, intSystem, intMyX, intMyY, ShipFacing)
{ 
 xmlHttp = GetXmlHttpObject();
 if ( xmlHttp == null )
  {
   alert("Your browser does not support AJAX!");
   return;
  }
 var url = "FindShips.asp?Player=" + intPlayer + "&System=" + intSystem + "&MyX=" + intMyX + "&MyY=" + intMyY + "&Facing=" + ShipFacing;
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
//alert(ResponseText)

//var objParent = document.getElementById('ShipLayer');
//var objOldShip = objParent.getElementsByTagName('div')
//for (var i=0, o; o=objOldShip[i]; i++) {
// objParent.removeChild(o)
//}

if ( ResponseText != "" ){
var aryShips = ResponseText.split('|') ;

for (var i=0, o; o=aryShips[i]; i++) {

//aryValues[System, ID, Top, Left, Height, Width, URL, Facing, Show]
var aryValues = o.split(',');
//alert(aryValues)

var strBackground = 'url(\'' + aryValues[6] + '\')';
//alert(aryValues[8])

document.getElementById("Info").innerHTML = aryValues

var objParent = document.getElementById('ShipLayer');

divShip = document.getElementById('Ship' + aryValues[1]);

if ( divShip == undefined )
 var divShip = document.createElement('div');

if ( aryValues[8] == 0 ) {
 objParent.removeChild(divShip);
}
else {
 divShip.setAttribute("id", "Ship" + aryValues[1]);
 divShip.style.position='absolute';
 divShip.style.top = parseInt(aryValues[2]) + 'px';
 divShip.style.left= parseInt(aryValues[3]) + 'px';
 divShip.style.height = aryValues[4];
 divShip.style.width = aryValues[5];
 divShip.style.zIndex=40;
 divShip.style.background = 'url(\'' + aryValues[6] + '\')';
 divShip.style.backgroundPosition = ShipDirection[aryValues[7]]
 objParent.appendChild(divShip);
}


}
}

window.setTimeout('GetShips(intPlayerID, intSystemID, MyX, MyY, ShipFacing);', 0);



   }
}

 


