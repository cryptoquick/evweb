<!-- #include file="adocon.inc" -->

<%

 intPlanetID = request.querystring("Planet")
 strToken = request.querystring("Player")
 
 set rsPlanet = Server.CreateObject("ADODB.Recordset")
 strPlanetSELECT = "SELECT Planets.* FROM Planets WHERE ID=" & intPlanetID
 
 set rsPlanet = adoCon.Execute(strPlanetSELECT)

%>

<style>
   body {
      background: black;
      overflow: hidden;
      margin-bottom:0;
      color: white;
   }

   div.Description{
      position: absolute;
      background: black;
      width: 60%;
      height: 60%;
      top: 20%;
      overflow: hidden;
      z-index:1;
      font-size: 90%;
      margin-bottom:0;
      text-align: Left;
   }

   div.PlanetName{
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

   .RefuelShip, .Shipyard, .Outfitters, .SpaceportBar, .LaunchShip, .MissionBoard, .Marketplace {
      width: 25%;
      height: 7%;
   }

   div.RefuelShip{
      position: absolute;
      background: red;
      top: 20%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   div.Shipyard{
      position: absolute;
      background: red;
      top: 28%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   div.Outfitters{
      position: absolute;
      background: red;
      top: 36%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   div.SpaceportBar{
      position: absolute;
      background: red;
      top: 44%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   div.MissionBoard{
      position: absolute;
      background: red;
      top: 87%;
      left: 4%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   div.Marketplace{
      position: absolute;
      background: red;
      top: 87%;
      left: 30%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }
   div.LaunchShip{
      position: absolute;
      background: red;
      top: 87%;
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

<script>

function Clicked(strImage){

objClicked = document.getElementById(strImage);
objClicked.src = "buttons/" + strImage + "Down.png";

}

function UnClicked(strImage){

objClicked = document.getElementById(strImage);
objClicked.src = "buttons/" + strImage + ".png";

}

function OpenSpaceportBar(){
window.location.href = "bar.asp?Player=<%= strToken %>&Planet=<%= intPlanetID %>";
}

function OpenMarketplace(){
window.location.href = "market.asp?Player=<%= strToken %>&Planet=<%= intPlanetID %>";
}

function CloseWindow(){

var objShip = parent.document.getElementById('Ship1');
objShip.style.visibility = 'visible';
parent.ShipState = 'Alive';
parent.intShow = 1;

objParent = parent.document.getElementById('Backdrop1');
objChild = parent.document.getElementById('PlanetWindow');
//alert(objChild);
objParent.removeChild(objChild);




}

</script>

<body>
<div id="PlanetName" class="PlanetName"><%= rsPlanet("Planet_Name") %></div>
<div id="Description" class="Description"><%= rsPlanet("Description") %></div>

<div id="RefuelShipDIV" class="RefuelShip" onMouseDown="Clicked('RefuelShip');" onMouseUp="UnClicked('RefuelShip');" onMouseOut="UnClicked('RefuelShip');" onClick="RefuelShip();"><img src="buttons/RefuelShip.png" class="Button" id="RefuelShip"></div>

<% if rsPlanet("Shipyard") = 1 Then %>

<div id="ShipyardDIV" class="Shipyard" onMouseDown="Clicked('Shipyard');" onMouseUp="UnClicked('Shipyard');" onMouseOut="UnClicked('Shipyard');" onClick="Shipyard();"><img src="buttons/Shipyard.png" class="Button" id="Shipyard"></div>

<% end if %>
<% if rsPlanet("Outfits") = 1 Then %>

<div id="OutfittersDIV" class="Outfitters" onMouseDown="Clicked('Outfitters');" onMouseUp="UnClicked('Outfitters');" onMouseOut="UnClicked('Outfitters');" onClick="Outfitters();"><img src="buttons/Outfitters.png" class="Button" id="Outfitters"></div>

<% end if %>
<% if rsPlanet("Missions") = 1 Then %>

<div id="MissionBoardDIV" class="MissionBoard" onMouseDown="Clicked('MissionBoard');" onMouseUp="UnClicked('MissionBoard');" onMouseOut="UnClicked('MissionBoard');" onClick="MissionBoard();"><img src="buttons/MissionBoard.png" class="Button" id="MissionBoard"></div>

<% end if %>
<% if rsPlanet("Bar") = 1 Then %>

<div id="SpaceportBarDIV" class="SpaceportBar" onMouseDown="Clicked('SpaceportBar');" onMouseUp="UnClicked('SpaceportBar');" onMouseOut="UnClicked('SpaceportBar');" onClick="OpenSpaceportBar();"><img src="buttons/SpaceportBar.png" class="Button" id="SpaceportBar"></div>

<% end if %>
<% if rsPlanet("Market") = 1 Then %>

<div id="MarketplaceDIV" class="MarketPlace" onMouseDown="Clicked('Marketplace');" onMouseUp="UnClicked('Marketplace');" onMouseOut="UnClicked('Marketplace');" onClick="OpenMarketplace();"><img src="buttons/Marketplace.png" class="Button" id="Marketplace"></div>

<% end if %>

<div id="LaunchShipDIV" class="LaunchShip" onMouseDown="Clicked('LaunchShip');" onMouseUp="UnClicked('LaunchShip');" onMouseOut="UnClicked('LaunchShip');" onClick="CloseWindow();"><img src="buttons/LaunchShip.png" class="Button" id="LaunchShip"></div>

</body>