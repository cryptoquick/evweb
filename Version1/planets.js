function CreatePlanet(intPlanetID, strPlanetName, intPlanetX, intPlanetY, strPlanetImage, intSizeHigh, intSizeWide)
{
    this.ID = intPlanetID
    this.PlanetName = strPlanetName
    this.PlanetX = intPlanetX
    this.PlanetY = intPlanetY
    this.PlanetImage = strPlanetImage
    this.SizeHigh = intSizeHigh
    this.SizeWide = intSizeWide
    objID = "planet" + this.ID


   

    var objParent = document.getElementById("PlanetLayer")
    if (objParent) {
      var onClick = "Highlight('" + this.PlanetName + "', 'P', " + this.ID + ")"
      var divPlanet = document.createElement('div');
      divPlanet.setAttribute("id", this.PlanetName);
//      divPlanet.setAttribute("onclick", "Highlight('" + this.PlanetName + "', 'P', " + this.ID + ")");
      divPlanet.style.position = 'absolute';
      divPlanet.style.zIndex = 3;
      divPlanet.style.background = "url(" + this.PlanetImage + ")";
      divPlanet.style.backgroundRepeat = 'no-repeat';
      divPlanet.style.backgroundPosition = "center";
      divPlanet.style.top = this.PlanetX;
      divPlanet.style.left = this.PlanetY;
      divPlanet.style.height = this.SizeHigh + 4;
      divPlanet.style.width = this.SizeWide + 4;
      divPlanet.style.className = "Planet" + this.ID;
      divPlanet.onclick = function () {
		Highlight(strPlanetName, 'Planet', intPlanetID);
		};
    //  alert(this.PlanetName)
      objParent.appendChild(divPlanet);
    }
   return this;
}



