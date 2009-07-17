function StarField(strParent, strColor, intSize, intNumStars, lngSpeedRatio, strClassBase, ScreenHeight, ScreenWidth) {
   this.Color = strColor;
   this.SpeedRatio = lngSpeedRatio;
   this.classBase = strClassBase;
   this.Size = intSize
   this.NumStars = intNumStars
   ScreenHeight = ScreenHeight;
   ScreenWidth = ScreenWidth;

   var objParent = document.getElementById(strParent);
   if (objParent) {
      var divBase = document.createElement('div');
      divBase.setAttribute("id", this.classBase);
      divBase.style.position = 'absolute';
      divBase.style.zIndex = 1;
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
       objStar.style.className = "Star" + this.classBase;
       divBase.appendChild(objStar);
      }
      objParent.appendChild(divBase);


      var divLR = document.createElement('div');
      divLR.setAttribute("id", this.classBase + "LR");
      divLR.style.position = 'absolute';
      divLR.style.zIndex = 1;
      divLR.style.className = this.classBase+'LR';
      //Span for stars
      for ( i = 0; i <= StarNum * this.NumStars; i++ )
      {
       var objStar = document.createElement("span");
       var top = Math.random() * ScreenHeight
       var left = Math.random() * ScreenWidth
       objStar.style.top = top;
       objStar.style.left = left + ScreenWidth;
       objStar.style.position = "absolute";
       objStar.style.width = "2px";
       objStar.style.height = "2px";
       objStar.style.background = "silver";
       objStar.style.zIndex = 1; 
       objStar.style.overflow = "hidden";
       objStar.style.className = "Star" + this.classBase + "LR";
       divBase.appendChild(objStar);
      }
     objParent.appendChild(divLR);


      var divUD = document.createElement('div');
      divUD.setAttribute("id", this.classBase + "UD");
      divUD.style.position = 'absolute';
      divUD.style.zIndex = 1;
      divUD.style.className = this.classBase+'UD';
      //Span for stars
      for ( i = 0; i <= StarNum * this.NumStars; i++ )
      {
       var objStar = document.createElement("span");
       var top = Math.random() * ScreenHeight
       var left = Math.random() * ScreenWidth
       objStar.style.top = top + ScreenHeight;
       objStar.style.left = left;
       objStar.style.position = "absolute";
       objStar.style.width = "2px";
       objStar.style.height = "2px";
       objStar.style.background = "silver";
       objStar.style.zIndex = 1; 
       objStar.style.overflow = "hidden";
       objStar.style.className = "Star" + this.classBase + "UD";
       divBase.appendChild(objStar);
      }
      objParent.appendChild(divUD);

   }
}