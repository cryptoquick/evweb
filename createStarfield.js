
// Perform these actions after the DOM is created.
$(document).ready(function() {
  // Create div for starfield to be placed upon loading of the script
  objStarfield = document.createElement('div');
  objStarfield.setAttribute('id', 'Starfield');
  document.body.appendChild(objStarfield);

  // Create 3 layers of stars. One close, one medium, one far.
  Star1 = new createStarField('yellow', 1, 1, .75, 'Star')   	// Close
  Star2 = new createStarField('white', 2, .5, .25, 'Star2')  	// Far
  Star3 = new createStarField('lightcyan', 1, 2, .50, 'Star3')  // Medium
});


 function createStarField(strColor, intSize, intNumStars, lngSpeedRatio, strID){
  this.Color = strColor;
  this.SpeedRatio = lngSpeedRatio;
  this.ID = strID;
  this.Size = intSize
  this.NumStars = intNumStars
  ScreenHeight = objStarfield.offsetHeight;
  ScreenWidth = objStarfield.offsetWidth;
  var StarNum = Math.random() * 100;

  if (objStarfield) {

   var divBase = document.createElement('div');
   divBase.setAttribute("id", this.ID);
   divBase.style.position = 'absolute';
   divBase.style.zIndex = 1;
   divBase.style.background = 'transparent';
   divBase.style.height = '100%';
   divBase.style.width = '100%';
   divBase.style.className = this.ID;
   //Span for stars
   for ( i = 0; i <= StarNum * this.NumStars; i++ )
   {
    var objStar = document.createElement("div");
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