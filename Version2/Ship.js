function Ship(intID, intMyShip) {


 // ################################################################# //
 // Private Variables						      //
 // GetShipValue(0Ship_Name, 1BaseAccel, 2BaseMaxSpeed, 3BaseTurnRate, 4BaseMass, 5BaseCargo, 6BaseMaxGuns, 7BaseFuel, 8Armor, 9BaseSheilds, 10BaseRegen, 11ShipSprite, 12SpriteHeight, 13SpriteWidth, 14LocX, 15LocY, 16ShipFacing, 17AccelRate, 18MaxSpeed, 19TurnRate, 20ShipMass, 21Cargo, 22MaxGuns, 23Fuel, 24Armor, 25Shields, 26Regen, 27ShipType, 28ShipID, 29Show, 30Updated, 31System)
 // ################################################################# //

 intShipType = GetShipValue(intID,27);
 intShipDirection = GetShipValue(intID,16);
 intShipWidth = GetShipValue(intID,12);
 intShipHeight = GetShipValue(intID,13);
 strShipImage = GetShipValue(intID,11);
 if (intMyShip == 1){  
  intShipTop = ( document.getElementById("PlanetLayer").offsetHeight / 2 ) - ( intShipHeight / 2 );
  intShipLeft = ( document.getElementById("PlanetLayer").offsetWidth / 2 ) - ( intShipWidth / 2 );
 } else {
  intShipTop = GetShipValue(intID,15) - ( intShipHeight / 2 );
  intShipLeft = GetShipValue(intID,14) - ( intShipWidth / 2 );
 }
 intShipMaxSpeed = GetShipValue(intID,2);
 intShipSpeed = 0;
 intShipAccel = GetShipValue(intID,1);
 intShow = GetShipValue(intID,29);

 

 // ################################################################# //
 // Expose functions as public methods				      //
 // ################################################################# //
 
 this.turnLeft = turnLeft;
 this.turnRight = turnRight;
 this.accelerate = accelerate;
 this.setLocation = setLocation;
 this.checkShow = checkShow;
 this.getShipAccel = getShipAccel;
 this.getShipDirection = getShipDirection;
 this.getTop = getTop;
 this.getLeft = getLeft;

 // ################################################################# //
 // Create ship div and add to the game				      //
 // ################################################################# //

 var objShip = document.createElement('div');
 objShip.setAttribute("id", "Ship" + intID);
 objShip.style.position = 'absolute';
 objShip.style.width = intShipWidth;
 objShip.style.height = intShipHeight;
 objShip.style.background = 'url(\'' + strShipImage + '\')';
 objShip.style.backgroundPosition = ShipDirection[intShipType][intShipDirection];
 objShip.style.zIndex = '10';
 objShip.style.top = intShipTop;
 objShip.style.left = intShipLeft;
 if (intMyShip == 1)
  objShip.className = 'MyShip';
 else
  objShip.className = 'Ship';
 if (intMyShip == 1)
  document.body.appendChild(objShip);
 else
  document.getElementById('PlanetLayer').appendChild(objShip);

 // If MyShip is being created, move Planet Layer to current location
 if (intMyShip == 1) {
  curX = parseFloat(GetShipValue(intID, 14) * -1 + ( document.getElementById("PlanetLayer").offsetWidth / 2 )); 
  curY = parseFloat(GetShipValue(intID, 15) * -1 + ( document.getElementById("PlanetLayer").offsetHeight / 2 ));
 }


 // ################################################################# //
 // Ship control functions are below				      //
 // ################################################################# //
 
 function turnLeft() {
  intShipDirection = parseInt(intShipDirection) - 1
  if (intShipDirection < 0)
   intShipDirection = 23;
  objShip.style.backgroundPosition = ShipDirection[intShipType][intShipDirection];
  if (intMyShip == 1)
   setShipValue(intID,16,intShipDirection);
 }

 function turnRight() {
  intShipDirection = parseInt(intShipDirection) + 1
  if (intShipDirection > 23)
   intShipDirection = 0;
  objShip.style.backgroundPosition = ShipDirection[intShipType][intShipDirection];
  if (intMyShip == 1)
   setShipValue(intID,16,intShipDirection);
 }

 function accelerate(){
  SpeedX += MoveX;
  SpeedY += MoveY;
  Speed= SpeedX*SpeedX + SpeedY*SpeedY;
  if(Speed >= intShipMaxSpeed*intShipMaxSpeed) {
   SpeedX *= (intShipMaxSpeed*intShipMaxSpeed)/Speed;
   SpeedY *= (intShipMaxSpeed*intShipMaxSpeed)/Speed;
  }
 }

 function setLocation(intX, intY) {
  setShipValue(intID, 14, intX);
  setShipValue(intID, 15, intY);
 } 

 function checkShow(){
  if (intShow == 1) {
   document.getElementById('Ship' + intFlagShipID).style.visibility = 'visible';
   return "1";
  }
  else {
   document.getElementById('Ship' + intFlagShipID).style.visibility = 'hidden';
   return "0";
  }
 }

 function getShipAccel(){
  return intShipAccel;
 }

 function getShipDirection(){
  return intShipDirection;
 }

 function getTop(){
  return GetShipValue(intID, 14);
 }

 function getLeft(){
  return GetShipValue(intID, 15);
 }

}




 // ################################################################# //
 // The following functions pull and set information from the server  //
 // for mulitplayer use.					      //
 // ################################################################# //

function GetShipValue(intShip, intValue){
 var strValue = $.ajax({
  			url: 'GetShipValue.asp?Ship=' + intShip + '&Value=' + intValue,
			async: false,
		       });
  return strValue.responseText;
}

function setShipValue(intShip, intValue, strValue){
 var setValue = $.post('setShipValue.asp?Ship=' + intShip + '&Value=' + intValue + '&String=' + strValue );
}