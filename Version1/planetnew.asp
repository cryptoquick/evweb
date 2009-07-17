<!-- #include file="adocon.inc" -->
<!-- #Include FILE="incAuthentication.asp" -->
<%
 response.expires = -1
 intPlayerID = GetCurrentUser(request.querystring("Player"))
 strToken = BuildToken(intPlayerID, Request.ServerVariables("REMOTE_HOST"), Request.ServerVariables("HTTP_USER_AGENT"))
 If strToken <> request.querystring("Player") Then
  response.write("Sorry, you are not logged in")
  response.end
 Else
  set rsPlayer = Server.CreateObject("ADODB.Recordset")
  strPlayerSelect = "SELECT Players.* FROM Players WHERE ID=" & intPlayerID
  set rsPlayer = adoCon.Execute(strPlayerSelect)

 intSystemID = rsPlayer("System")
 
 strShipTypeSelect = "SELECT Ships.* FROM Ships WHERE Player=" & intPlayerID & " AND Flagship = 1"
 set rsShipType = adoCon.Execute(strShipTypeSelect)
 
 if rsShipType.EOF Then
  strInsert = "INSERT INTO Ships (ShipType, Player, Flagship, ShipFacing) VALUES (2," & intPlayerID & ",1,0)"
  set rsInsert = adoCon.Execute(strInsert)
  strShipTypeSelect = "SELECT Ships.* FROM Ships WHERE Player=" & intPlayerID & " AND Flagship = 1"
  set rsShipType = adoCon.Execute(strShipTypeSelect)
 End If

 intPlayerShipType = rsShipType("ShipType")
 intShipFacing = rsShipType("ShipFacing")
 

 strSelect = "SELECT ShipTypes.* FROM ShipTypes WHERE ID=" & intPlayerShipType
 set rsShipTypeSizes = adoCon.Execute(strSelect)
 
 intCurShipWidth = rsShipTypeSizes("SpriteWidth")
 intCurShipHeight = rsShipTypeSizes("SpriteHeight")
 strCurShipURL = rsShipTypeSizes("ShipSprite")
 rsShipTypeSizes.close

 rsShipType.close 

 set rsSystem = Server.CreateObject("ADODB.Recordset")
 set rsPlanets = Server.CreateObject("ADODB.Recordset")
 strSystemSelect = "SELECT Systems.* FROM Systems WHERE ID=" & intSystemID
 strPlanetSELECT = "SELECT Planets.* FROM Planets WHERE System=" & intSystemID
 
 set rsSystem = adoCon.Execute(strSystemSelect)
 set rsPlanets = adoCon.Execute(strPlanetSELECT)


 
%>

<LINK REL="STYLESHEET" TYPE="text/css" HREF="gamecss.css">
<LINK REL="STYLESHEET" TYPE="text/css" HREF="status.css">
<script src="AJAX.js"></script>
<script src="Starfield.js"></script>
<script src="ShipMove.js"></script>
<script src="planets.js"></script>
<script src="ships.js"></script>
<script src="CheckMissions.js"></script>
<script src="status.js"></script>
<script src="commands.js"></script>


<script>
   //Set Constant variables
   var curX;
   var MyX;
   var MyY;
   var ShipX;
   var ShipY;
   var curY;
   var xmlHttp;
   var StarTop = 0;
   var ShipState;
   var StarLeft = 0;
   var StarTopB;
   var StarLeftB;
   var StarTopC;
   var StarLeftC;
   var Star2Top;
   var Star2Left;
   var Star2TopB;
   var Star2LeftB;
   var Star2TopC;
   var Star2LeftC;
   var intSpeed;
   var intShow = 1;
   var ShipAccelRate = .5;
   var intBlockInput = 0;
 //  var ShipAccelerate = new Boolean();
   var MaxSpeed = 10;
   var SpeedX = 0;
   var SpeedY = 0;
   var Friction = .997;
   var ShipFacing = <%= intShipFacing %>;
   var ShipDirection;
   var ShipInc = 10;
   var intDestID = 0;
   var SelectedItem = "Nothing Selected";
   var intPlayerShipType = <%= intPlayerShipType %>
   var intPlayerShipWidth = <%= intCurShipWidth %>
   var intPlayerShipHeight = <%= intCurShipHeight %>
   var strPlayerShipSprite = "<%= strCurShipURL %>"
   var strToken = '<%= strToken %>';
   var intSystemID = <%= intSystemID %>;
   var intPlayerID = <%= intPlayerID %>;
   var StarNum = Math.random() * 100;
   var SelectedType;
   // aryShipMovement[ShipFacing][intSpeed, MovementMod[0], MovementMod[1]]
   var aryShipMovement = new Array();
   ShipDirection = new Array();
   var objStatus;
<%

strSelect = "SELECT ShipTypes.* FROM ShipTypes"
set rsShips = adoCon.Execute(strSelect)

do while not rsShips.eof

intHeight = rsShips("SpriteHeight")
intWidth = rsShips("SpriteWidth")


str0 = "0px 0px"
str1 = intWidth * -1 & "px 0px"
str2 = intWidth * -2 & "px 0px"
str3 = intWidth * -3 & "px 0px"
str4 = intWidth * -4 & "px 0px"
str5 = "0px " & intHeight * -1 & "px"
str6 = intWidth * -1 & "px " & intHeight * -1 & "px"
str7 = intWidth * -2 & "px " & intHeight * -1 & "px"
str8 = intWidth * -3 & "px " & intHeight * -1 & "px"
str9 = intWidth * -4 & "px " & intHeight * -1 & "px"
str10 = "0px " & intHeight * -2 & "px"
str11 = intWidth * -1 & "px " & intHeight * -2 & "px"
str12 = intWidth * -2 & "px " & intHeight * -2 & "px"
str13 = intWidth * -3 & "px " & intHeight * -2 & "px"
str14 = intWidth * -4 & "px " & intHeight * -2 & "px"
str15 = "0px " & intHeight * -3 & "px"
str16 = intWidth * -1 & "px " & intHeight * -3 & "px"
str17 = intWidth * -2 & "px " & intHeight * -3 & "px"
str18 = intWidth * -3 & "px " & intHeight * -3 & "px"
str19 = intWidth * -4 & "px " & intHeight * -3 & "px"
str20 = "0px " & intHeight * -4 & "px"
str21 = intWidth * -1 & "px " & intHeight * -4 & "px"
str22 = intWidth * -2 & "px " & intHeight * -4 & "px"
str23 = intWidth * -3 & "px " & intHeight * -4 & "px"
%>


ShipDirection[<%= rsShips("ID") %>] = new Array("<%= str0 %>","<%= str1 %>","<%= str2 %>","<%= str3 %>","<%= str4 %>","<%= str5 %>","<%= str6 %>","<%= str7 %>","<%= str8 %>","<%= str9 %>","<%= str10 %>","<%= str11 %>","<%= str12 %>","<%= str13 %>","<%= str14 %>","<%= str15 %>","<%= str16 %>","<%= str17 %>","<%= str18 %>","<%= str19 %>","<%= str20 %>","<%= str21 %>","<%= str22 %>","<%= str23 %>")


<%
rsShips.movenext
loop
rsShips.close
%>
   
   for ( var i = 0; i <= 23; i++ ){
    aryShipMovement[i] = new Array(0,0,0);
   }
   
   document.getElementsByClassName = function(cl) {
        var retnode = [];
        var myclass = new RegExp('\\b'+cl+'\\b');
        var elem = this.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (myclass.test(classes)) retnode.push(elem[i]);
        }
        return retnode;
   };

   function HandleUserInput(e) {
      var intKey = 0;
      var strKey = '';
      // Determine which key was pressed.
      if(window.event) {
         // IE
         intKey = e.keyCode;
      } else if(e.which) {
         // Netscape/Firefox/Opera
         intKey = e.which;
      }
      // Convert the scan code to ASCII letter
      strKey = String.fromCharCode(intKey).toUpperCase();
      if (intBlockInput == 0) {
      // Respond based on the key pressed.
        if ( strKey == "A" ) {
            ShipTurnLeft();
        }
        
        if ( strKey == "D" ) {
            ShipTurnRight();
        }
        
        if ( strKey == "W" && ShipState != "Stopped") {
            setTimeout("ShipAccelerate()",200);
           
        }

        if ( strKey == "M" ) {
            OpenMapWindow();
        }

        if ( strKey == "J" ) {
            CheckJump();
        }

        if ( strKey == "L" ) {
	  ShipState = 'Stopped'
          OpenPlanetWindow();
        }

        if ( strKey == "T" ) {
            Refresh();
        }

        if ( strKey == "X" ) {
            StopShip();
        }

        if ( strKey == "Y" ) {
            OpenTextBox();
        }      
       }
       else
        return strKey; 
      return false;
   }

   //Turn sprite Left
   function ShipTurnLeft() {
      if (ShipFacing > 0) {
         ShipFacing--;
      } else {
         ShipFacing = 23;
      }

      RepositionShip();
   }

   //Turn sprite Right
   function ShipTurnRight() {
      if (ShipFacing < 23) {
         ShipFacing++;
      } else {
         ShipFacing = 0;
      }

      RepositionShip();
   }

   // After the position has been determined, update the sprite.
   function RepositionShip() {
      var objShip = document.getElementById('Ship1');
      objShip.style.backgroundPosition = ShipDirection[intPlayerShipType][ShipFacing];
   }

   function ShipAccelerate(){
     SpeedX += MoveX;
     SpeedY += MoveY;
     Speed= SpeedX*SpeedX + SpeedY*SpeedY;
     if(Speed >= MaxSpeed*MaxSpeed) {
      SpeedX *= (MaxSpeed*MaxSpeed)/Speed;
      SpeedY *= (MaxSpeed*MaxSpeed)/Speed;
     }
   
   }
    
   function ClearInfo(){
    var objInfo = document.getElementById('Info');
    objInfo.innerHTML = "";
    intBlockInput = 0;
   }

   //Open box for typing commands
   function OpenTextBox() {
    var objInfo = document.getElementById('Info');
    objInfo.innerHTML = '<form name=form action="javascript:Transmit()"><input type=text class="TextBox" id="textbox" name="Command"></form>';
    document.getElementById('textbox').focus();
    intBlockInput = 1;
   }

   function Transmit() {
    var strCommand = document.form.Command.value
    ClearInfo();
    Command(strCommand);

   }

   //Setup page onload. Place objects based on screen dimensions
   function Setup() {
      var objBackdrop = document.getElementById('Backdrop1');
      var ScreenHeight = objBackdrop.offsetHeight;
      var ScreenWidth = objBackdrop.offsetWidth;
      ShipY = (ScreenHeight / 2) - 75;
      ShipX = (ScreenWidth / 2) - 75;

      CheckForMissions(1,intSystemID);
 
      curX = 0;
      curY = 0;
      Speed = 0;
      intMaxSpeed=5;
      

        // StarField (Parent, Color, Size, StarNumberMod, MovementMod, Classname, Screenheight, screenwidth)
   var StarFieldA = new StarField('Backdrop1', 'White', 2, 2, .75, 'Star', ScreenHeight, ScreenWidth);
   var StarFieldB = new StarField('Backdrop1', 'cyan', 1, .5, .25, 'Star2', ScreenHeight, ScreenWidth);
   var StarFieldC = new StarField('Backdrop1', 'lightyellow', 2, 1, .50, 'Star3', ScreenHeight, ScreenWidth);

   objStatus = new StatusWindow('Status');
   objStatus.setSystemName('<%= rsSystem("System_Name") %>');
   objStatus.setSelected('Nothing Selected');

<%
Do while not rsPlanets.EOF
 strPlanetName = rsPlanets("Planet_Name")
 strPlanetImage = rsPlanets("PlanetImage")
 strPlanetName = replace(strPlanetName, " ", "")
 strPlanetImage = replace(strPlanetImage, " ", "")
 
%>
   var Planet<%= rsPlanets("ID") %> = new CreatePlanet(<%= rsPlanets("ID") %>, "<%= strPlanetName %>", <%= rsPlanets("PlanetLocationX") %>, <%= rsPlanets("PlanetLocationY") %>, "<%= strPlanetImage %>", <%= rsPlanets("SizeHigh") %>, <%= rsPlanets("SizeWide") %>);
   
   
<%
rsPlanets.movenext
loop
%>
     


      var objShip = document.getElementById('Ship1');
      objShip.style.width = intPlayerShipWidth;
      objShip.style.height = intPlayerShipHeight;
      objShip.style.background = 'url(\'' + strPlayerShipSprite + '\')';
      objShip.style.zIndex = 10;
      objShip.style.backgroundPosition = ShipDirection[intPlayerShipType][ShipFacing];
      objShip.style.top = ShipY;
      objShip.style.left = ShipX;
      
      
      
      ShipMove();
      GetShips(intPlayerID, <%= intSystemID %>, MyX, MyY, ShipFacing, 1);
      document.getElementById("Info").innerHTML = "Use A W D keys to manuever your ship."
      setTimeout("ClearInfo()", 5000);
      
   }





//Stop the ship to land
   function StopShip(){
     SpeedX = 0;
     SpeedY = 0;
     
   }
   



   
   function Highlight(strObjID, strType, intID)
   {
  //  alert(strObjID + ", " + strType + ", " + intID)
    if ( SelectedItem != strObjID && SelectedItem != "Nothing Selected" ) {
	var objSelected = document.getElementById(SelectedItem);
    	objSelected.style.border = "none";
    }
    //alert(strObjID)
    var objSelected = document.getElementById(strObjID);
    objSelected.style.border = "1px dashed blue";

    objStatus.setSelected(strType + ": " + strObjID);
    SelectedItem = strObjID;
    SelectedType = strType;
    SelectedID = intID
    return SelectedItem
   }

   function UnHighlight(){
    var objSelected = document.getElementById(SelectedItem);
    objSelected.style.border = "";
    objStatus.setSelected("Nothing Selected");
   }
   
   function OpenPlanetWindow(){
	if ( SelectedType == "Planet" ){
         if (Speed > MaxSpeed){
          var objInfo = document.getElementById('Info');
          objInfo.innerHTML = "You are moving too fast to land.";
          setTimeout("ClearInfo()", 5000);
	  ShipState = "Alive";
         }
         else{
          objPlayerShip = document.getElementById("Ship1");
	  objPlanet = document.getElementById(SelectedItem);
          objParent = document.getElementById('PlanetLayer');
	  test1 = parseInt(objPlanet.style.width) - ( MyX - parseInt(objPlanet.style.left) )
          test2 = parseInt(objPlanet.style.height) - ( MyY - parseInt(objPlanet.style.top) )
  
	  if ( test1 > 0 && test2 > 0 && test1 < (parseInt(objPlanet.style.width) + parseInt(objPlayerShip.style.width)) && test2 < (parseInt(objPlanet.style.height) + parseInt(objPlayerShip.style.height))){ 
	   StopShip();
	   var strFrameHTML = "<iframe src=PlanetWindow.asp?Player=<%= strToken %>&Planet=" + SelectedID + " width=100% height=100% scrolling=no></iframe>"
	   var objParent = document.getElementById('Backdrop1');
	   var divPlanetWindow = document.createElement('div');
	   divPlanetWindow.setAttribute("id", "PlanetWindow");
	   divPlanetWindow.style.position='absolute';
	   divPlanetWindow.style.top = '20%';
	   divPlanetWindow.style.left = '20%';
	   divPlanetWindow.style.height = '60%';
	   divPlanetWindow.style.width = '60%';
	   divPlanetWindow.style.zIndex=40;
	   divPlanetWindow.style.background= 'black';
	   divPlanetWindow.innerHTML = strFrameHTML;
	   objParent.appendChild(divPlanetWindow);
           var objShip = document.getElementById('Ship1');
           objShip.style.visibility = 'hidden';
           intShow = 0;
          }
          else{
           document.getElementById("Info").innerHTML = "You are not close enough to land.";
	   ShipState = "Alive";
           setTimeout("ClearInfo()", 5000);
          }
	 }
	}
        else{
         document.getElementById("Info").innerHTML = "No landing site selected.";
         ShipState = "Alive";
         setTimeout("ClearInfo()", 5000);
        }
    }

    function OpenMapWindow(){
	 var strFrameHTML = "<iframe src=Map.asp?System=" + intSystemID + " width=100% height=100% scrolling=no></iframe>"
	 var objParent = document.getElementById('Backdrop1');
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
	 objParent.appendChild(divMapWindow);
 
	 var objShip = document.getElementById('Ship1');
         objShip.style.visibility = 'hidden';


    }
	
    function Jump(){
     if(xmlHttp.readyState==4)
     {
      intDest = xmlHttp.responseText
      if ( intDest != -1 )
       JumpAnimation(0, intDest);
      else
      {
       document.getElementById("Info").innerHTML = "No warp route exists to that system."
       setTimeout("ClearInfo()", 5000);
      }
     }
    }

    function Refresh(){
   if(xmlHttp.readyState==4)
   {
     strLocation = "planetnew.asp?Player=" + strToken + "&Rnd=" + Math.random()
     top.location.href = strLocation
   }
    }

   function CheckJump(){
    if ( intDestID != 0 ){
     xmlHttp = GetXmlHttpObject();
     if ( xmlHttp == null )
     {
      alert("Your browser does not support AJAX!");
      return;
     }
     var url = "Jumptest.asp?CurSystem=" + intSystemID + "&NewSystem=" + intDestID
     xmlHttp.onreadystatechange=Jump;
     xmlHttp.open("GET", url, true);
     xmlHttp.send(null);
    }
    else
    {
     document.getElementById("Info").innerHTML = "No destination selected"
     setTimeout("ClearInfo()", 5000);
    }
   }

   function JumpAnimation(i, intDest){
//    if ( i == 0 ){
//      ModifierX = SpeedX * .20;
//      ModifierY = SpeedY * .20;
//    }

//
//    SpeedX = SpeedX - ModifierX;
//    SpeedY = SpeedY - ModifierY;

//    if ( SpeedX < 0 )
//     SpeedX = 0
//    if ( SpeedY < 0 )
//     SpeedY = 0
//    if ( SpeedX > 0 || SpeedY > 0 )
//     setTimeout("JumpAnimation(1, intDest)", 100)

      Friction = .8

      if ( Math.round(SpeedX) == 0 && Math.round(SpeedY) == 0 ){
       xmlHttp = GetXmlHttpObject();
       if ( xmlHttp == null )
       {
        alert("Your browser does not support AJAX!");
        return;
       }
       var url = "Jump.asp?Player=<%= strToken %>&System=" + intDestID;
       xmlHttp.onreadystatechange=Refresh;
       xmlHttp.open("GET", url, true);
       xmlHttp.send(null);
      }
      else
       setTimeout("JumpAnimation(1, intDest)", 100)
   }
   
</script>

<body onload="Setup();" onKeyDown="return HandleUserInput(event);" >
   <span id="Ship1" class="Ship" onclick="UnHighlight()"></span>
	<div id="Backdrop1" class="Backdrop">
        <div id="Info" class="Info"></div>
	    <div id="ShipLayer" class="ShipLayer"></div>
	    <div id="PlanetLayer" class="PlanetLayer"></div>
	    
	</div>

</body>

<%
End If
%>
