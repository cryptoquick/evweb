function Command(strCommand) {

 aryArguments = strCommand.split(' ');
 var objInfo = document.getElementById('Info');

 switch (aryArguments[0]) {

  case "/land":
   ShipState = 'Stopped';
   OpenPlanetWindow();
   break;

  case "/stop":
   StopShip();
   break;

  case "/jump":
   CheckJump();
   break;

  case "/map":
   OpenMapWindow();
   break;

  case "/createship":
   CreateShip(aryArguments[1], aryArguments[2]);
   break;  

  default: 
   objInfo.innerHTML = aryArguments[0] + " is not a recognized command.";

 }    
}


function CreateShip(intShipType, intSystem) {
 xmlHttp3 = GetXmlHttpObject();
 if ( xmlHttp3 == null )
  {
   alert("Your browser does not support AJAX!");
   return;
  }
 var url = "CreateShip.asp?ShipType=" + intShipType + "&System=" + intSystem
 xmlHttp3.open("GET", url, true);
 xmlHttp3.send(null);

}
 