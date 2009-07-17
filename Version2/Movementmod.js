//Determines xy modifiers based on the direction the function recieves
   function MovementModifiers(ShipFacing)
   {
      var ShipAngle = ShipFacing * 15;
      var PI = 3.14159
      var Yincrease = Math.cos((ShipAngle*PI)/180);
      var Yincrease = ((Math.round(Yincrease * 100)) / 100);
      var Xincrease = Math.sin((ShipAngle*PI)/180);
      var Xincrease = ((Math.round(Xincrease * 100)) / 100) * -1;
      var MovementMod = new Array(Yincrease, Xincrease);
      
      return MovementMod
   }