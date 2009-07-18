<!-- #include file="adocon.inc" -->

<%


%>

<style>
   body {
      background: black;
      overflow: hidden;
      margin-bottom:0;
      color: white;
   }

   div.Map{
      position: absolute;
      background: black;
      width: 100%;
      height: 65%;
      top: 20%;
      overflow: hidden;
      z-index:1;
      font-size: 90%;
      margin-bottom:0;
      text-align: Left;
      border: 2px silver inset;
   }

   div.Header{
      position: absolute;
      background: #101010;
      width: 100%;
      height: 10%;
      top: 5%;
      overflow: hidden;
      z-index:1;
      text-align: center;
      font-size: 200%;
      font-variant: small-caps;
      border: 2px silver inset;
    
   }

   div.Selected{
      position: absolute;
      background: #101010;
      width: 25%;
      height: 7%;
      top: 89%;
      left: 5%
      overflow: auto;
      z-index:1;
      text-align: center;
      font-size: 100%;
      border: 2px silver inset;
    
   }

   div.Okay{
      width: 25%;
      height: 7%;
      position: absolute;
      background: red;
      top: 89%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   img.Button{
     width: 100%;
     height: 100%;
   }

</style>
<script src="movementmod.js"></script>
<script type="text/javascript" src="../js/dojo/dojo/dojo.js"
	    djConfig="parseOnLoad:true, isDebug:false"></script>
<script>
function GetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
}
</script>
<script>





dojo.require('dojox.gfx');
dojo.require("dojo.fx");
dojo.addOnLoad(function(){

var objBackdrop = document.getElementById('Map');
var ScreenHeight = objBackdrop.offsetHeight;
var ScreenWidth = objBackdrop.offsetWidth;
var CenterHigh = ScreenHeight/2;
var CenterWide = ScreenWidth/2;
curX = new Array();
curY = new Array();
curX[0] = CenterWide;
curY[0] = CenterHigh;
intSystem = <%= request.querystring("System") %>


objBackground = document.createElement("div");
objBackground.setAttribute("id", "drawing_area");
objBackground.style.position='absolute';
objBackground.style.top = 0;
objBackground.style.left= 0;
objBackground.style.height = '100%';
objBackground.style.width = '100%';
document.getElementById("Map").appendChild(objBackground);
surface = dojox.gfx.createSurface(dojo.byId('drawing_area'), ScreenWidth, ScreenHeight);

var arySystems = new Array();

arySystems[1] = new Array();
arySystems[1][0] = 0;
arySystems[1][1] = 'Sol';
arySystems[1][2] = 'blue';
arySystems[1][3] = 0;


   var curParent = arySystems[1][0];
   var curName = arySystems[1][1];
   var curColor = arySystems[1][2];
   if ( intSystem == 1 ) {
    var Sol = surface.createCircle({ cx: curX[0], cy: curY[0], r: 5})
               .setStroke({ color: curColor, width: 2})
               .setFill(curColor)
   }
   else {
    var Sol = surface.createCircle({ cx: curX[0], cy: curY[0], r: 5})
               .setStroke({ color: curColor, width: 2})
               .setFill("black")
               .connect("onclick",function(){SetJump(1, "Sol");});
   }
   curX[1] = curX[0]
   curY[1] = curY[0]


<%
Call GetChildSystems(1)
%>

if (intSystem != 1 ) {
 var X = parseInt(curX[1]) - parseInt(curX[intSystem]);
// X = 0 - X
 var Y = parseInt(curY[1]) - parseInt(curY[intSystem]);
// Y = 0 - Y
// alert( X + "," + Y )
 document.getElementById("drawing_area").style.top = Y;
 document.getElementById("drawing_area").style.left = X;
}


})

function Clicked(strImage){

objClicked = document.getElementById(strImage);
objClicked.src = "buttons/" + strImage + "Down.png";

}

function UnClicked(strImage){

objClicked = document.getElementById(strImage);
objClicked.src = "buttons/" + strImage + ".png";

}

function CloseWindow(){

var objShip = parent.document.getElementById('Ship1');
objShip.style.visibility = 'visible';

objParent = parent.document.getElementById('Backdrop1');
objChild = parent.document.getElementById('MapWindow');
//alert(objChild);
objParent.removeChild(objChild);
}

function SetJump(intID, strPlanetName){
 document.getElementById("Selected").innerHTML = strPlanetName
 parent.intDestID = intID
 parent.objStatus.setSelected("System: " + strPlanetName)
}

</script>

<body>
<div id="Header" class="Header">System Map</div>
<div id="Map" class="Map"><div id="Map"></div></div>
<div id="OkayDIV" class="Okay" onMouseDown="Clicked('Okay');" onMouseUp="UnClicked('Okay');" onMouseOut="UnClicked('Okay');" onClick="CloseWindow();"><img src="buttons/Okay.png" class="Button" id="Okay"></div>
<div id="Selected" class="Selected">Selected System</div>

</body>


<% 
 function GetChildSystems(intParent)
 
 intSystem = intParent


strSelect = "SELECT C.System2 AS Destination, C.Direction FROM Connections AS C WHERE System1 = " & MakeNumber(intSystem)
set rsConnection = adoCon.Execute(strSelect)


intCount = 1

Do While Not rsConnection.EOF

 strSelect = "SELECT S.System_Name, G.Color, S.ID AS thisSystem FROM Systems AS S, Governments AS G WHERE S.ID = " & rsConnection("Destination") & " AND S.Government = G.ID"
 set rsSystem = adoCon.Execute(strSelect)
 


%>



   var DirectionMod = MovementModifiers(<%= rsConnection("Direction") %>);
   this.X = curX[<%= intSystem %>] + (50*DirectionMod[1] * -1)
   this.Y = curY[<%= intSystem %>] + (50*DirectionMod[0] * -1)

   var line<%= intSystem %> = surface.createLine({ x1: curX[<%= intSystem %>], y1: curY[<%= intSystem %>], x2: this.X, y2: this.Y })
               .setStroke({ color: 'gray', width: 1})
               .moveToBack();

   if ( intSystem == <%= rsSystem("thisSystem") %> ){
    var circle2 = surface.createCircle({ cx: this.X, cy: this.Y, r: 5})
               .setStroke({ color: "<%= rsSystem("Color") %>", width: 2})
               .setFill("<%= rsSystem("Color") %>")
   }
   else {            
    var circle2 = surface.createCircle({ cx: this.X, cy: this.Y, r: 5})
               .setStroke({ color: "<%= rsSystem("Color") %>", width: 2})
               .setFill("black")
               .connect("onclick",function(){SetJump(<%= rsSystem("thisSystem") %>, "<%= rsSystem("System_Name") %>");});
   }
   curX[<%= rsSystem("thisSystem") %>] = this.X
   curY[<%= rsSystem("thisSystem") %>] = this.Y

<%
 Call GetChildSystems(rsSystem("thisSystem"))
 intCount = intCount + 1
 rsConnection.Movenext
loop
rsConnection.close

 End Function
%> 
