function loadSystem(pUID)
{

 // Remove all old system information
 if ( document.body.hasChildNodes() ){
  while ( document.body.childNodes.length >= 1 ){
   document.body.removeChild( document.body.firstChild );       
  } 
 }
 


 // Load System Information
 var SelectsystemID = $.post('systemInfo.asp?Get=SystemID&Player=' + pUID, function(data){ buildSystem(data) } );
 
 // Build the system
 function buildSystem(data){

  //Split the Ajax data
  arySystemInfo = data.split(',');

  // Define public variables
  intSystemID = arySystemInfo[0];
  strSystemName = arySystemInfo[1];
 
  //Build the starfield
  objStarfield = document.createElement('div');
  objStarfield.setAttribute('id', 'Starfield');
  document.body.appendChild(objStarfield);
  Star1 = new createStarFields('yellow', 1, 1, .75, 'Star') 
  Star2 = new createStarFields('white', 2, .5, .25, 'Star2') 
  Star3 = new createStarFields('lightcyan', 1, 2, .50, 'Star3')  

  //Build the planet Layer
  objPlanetLayer = document.createElement('div');
  objPlanetLayer.setAttribute('id', 'PlanetLayer');
  document.body.appendChild(objPlanetLayer);
  var PlanetInfo = $.post('systemInfo.asp?Get=Planets&SystemID=' + intSystemID, function(data){ buildPlanetLayer(data) } )
  
  // Create Status Bar
  objStatus = new StatusWindow('Status');

  // Create Info Area
  objInfo = document.createElement('div');
  objInfo.setAttribute('id', 'Info');
  document.body.appendChild(objInfo);

  //Load Ships
  LoadShips(intSystemID);
 }
 

 function buildPlanetLayer(strPlanetData) {

  //Split up planet data.
  var aryPlanetData = strPlanetData.split('{-}');

  //Add Planets to planet Layer
  for (var i=0, o; o=aryPlanetData[i]; i++) {

   //aryValues[0PlanetID, 1PlanetName, 2PlanetLocX, 3PlanetLocY, 4PlanetImage, 5SizeHigh, 6SizeWide]
   var aryValues = o.split(',');
   Planet = new CreatePlanet(aryValues[0], aryValues[1], aryValues[2], aryValues[3], aryValues[4], aryValues[5], aryValues[6]);
  }
 }


 function CreatePlanet(intPlanetID, strPlanetName, intPlanetX, intPlanetY, strPlanetImage, intSizeHigh, intSizeWide)
 { 
  // Define the planet
  this.ID = intPlanetID
  this.PlanetName = strPlanetName
  this.PlanetX = intPlanetX
  this.PlanetY = intPlanetY
  this.PlanetImage = strPlanetImage
  this.SizeHigh = intSizeHigh
  this.SizeWide = intSizeWide

  // Create the planet div
  if (objPlanetLayer) {
   var divPlanet = document.createElement('div');
   divPlanet.setAttribute("id", this.PlanetName);
   divPlanet.style.position = 'absolute';
   divPlanet.style.zIndex = 3;
   divPlanet.style.background = "url(planets/" + strPlanetImage + ")";
  // divPlanet.style.backgroundColor = 'red';
   divPlanet.style.backgroundRepeat = 'no-repeat';
   divPlanet.style.backgroundPosition = "center";
   divPlanet.style.top = this.PlanetX;
   divPlanet.style.left = this.PlanetY;
   divPlanet.style.height = parseInt(this.SizeHigh) + 4;
   divPlanet.style.width = parseInt(this.SizeWide) + 4;
   divPlanet.onclick = function () {
    Highlight(strPlanetName, 'Planet', intPlanetID);
   };
   objPlanetLayer.appendChild(divPlanet);
  }
  return this;
 }


 function createStarFields(strColor, intSize, intNumStars, lngSpeedRatio, strClassBase){
  this.Color = strColor;
  this.SpeedRatio = lngSpeedRatio;
  this.classBase = strClassBase;
  this.Size = intSize
  this.NumStars = intNumStars
  ScreenHeight = objStarfield.offsetHeight;
  ScreenWidth = objStarfield.offsetWidth;
  var StarNum = Math.random() * 100;

  if (objStarfield) {
   var divBase = document.createElement('div');
   divBase.setAttribute("id", this.classBase);
   divBase.style.position = 'absolute';
   divBase.style.zIndex = 1;
   divBase.style.background = "transparent";
   divBase.style.className = this.classBase;
   //Span for stars
   for ( i = 0; i <= StarNum * this.NumStars; i++ )
   {
    var objStar = document.createElement("span");
    var top = Math.random() * ScreenHeight; 
    var left = Math.random() * ScreenWidth;
    objStar.style.top = top;
    objStar.style.left = left;
    objStar.style.position = "absolute";
    objStar.style.width = this.Size;
    objStar.style.height = this.Size;
    objStar.style.background = this.Color;
    objStar.style.zIndex = 1; 
    objStar.style.overflow = "hidden";
    objStar.style.className = "Star";
    divBase.appendChild(objStar);
   }
   objStarfield.appendChild(divBase)
  }
 }

 return true;
}


function OpenMapWindow(){
	 var strFrameHTML = "<iframe src=Map.asp?System=" + intSystemID + " width=100% height=100% scrolling=no></iframe>"
	 var divMapWindow = document.createElement('div');
	 divMapWindow.setAttribute("id", "MapWindow");
	 divMapWindow.style.position='absolute';
	 divMapWindow.style.top = '20%';
	 divMapWindow.style.left = '20%';
	 divMapWindow.style.height = '60%';
	 divMapWindow.style.width = '60%';
	 divMapWindow.style.zIndex=40;
	 divMapWindow.style.background= 'black';
	 divMapWindow.innerHTML = strFrameHTML;
	 document.body.appendChild(divMapWindow);
 
	 var objShip = document.getElementById('Ship1');
         objShip.style.visibility = 'hidden';


    }