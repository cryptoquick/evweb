<!-- #include file="adocon.inc" -->

<%

 intPlanetID = MakeSQLSafe(request.querystring("Planet"))
 strToken = MakeSQLSafe(request.querystring("Player"))
 
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

   .Buy, .Sell{
      position: absolute;
      width: 60%;
      height: 60%;
      top: 20%;
      overflow: hidden;
      z-index:1;
      font-size: 90%;
      margin-bottom:0;
      text-align: Left;
      border: 2px silver inset;
   }

   div.Buy{
    visibility: 'visible';
    background: 'black';
   }

   div.Sell{
    visibility: 'hidden';
    background: 'red';
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

   div.BuyGoods{
      width: 25%;
      height: 7%;
      position: absolute;
      background: red;
      top: 28%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   div.SellGoods{
      width: 25%;
      height: 7%;
      position: absolute;
      background: red;
      top: 36%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
   }

   
   div.Exit{
      position: absolute;
      background: red;
      top: 87%;
      left: 70%;
      overflow: hidden;
      z-index:1;
      margin-bottom:0;
      text-align: Left;
      width: 25%;
      height: 7%;
   }

   img.Button{
     width: 100%;
     height: 100%;
   }
</style>
<script src="ajax.js"></script>
<script>

function Setup(){
 LoadBuyGoods();
 LoadSellGoods();
}

function Clicked(strImage){
 objClicked = document.getElementById(strImage);
 objClicked.src = "buttons/" + strImage + "Down.png";
}

function UnClicked(strImage){
 objClicked = document.getElementById(strImage);
 objClicked.src = "buttons/" + strImage + ".png";
}

function ShowBuyGoods(){
 document.getElementById('Buy').style.visibility = "visible"
 document.getElementById('Sell').style.visibility = "hidden"
}

function ShowSellGoods(){
 document.getElementById('Sell').style.visibility = "visible"
 document.getElementById('Buy').style.visibility = "hidden"
}


function LoadBuyGoods(){
 xmlHttp = GetXmlHttpObject();
  if ( xmlHttp == null )
   {
    alert("Your browser does not support AJAX!");
    return;
   }
  var url = "MarketAjax.asp?Case=BuyList&Planet=<%= intPlayerID %>";
  xmlHttp.onreadystatechange=CreateBuyGoods;
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

function CreateBuyGoods(){
 if(xmlHttp.readyState==4)
  {
   var tbl = document.createElement("table")
   var tbody = document.createElement("tbody")
   for (var i; i < 5; i++){   
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var text = document.createTextNode("Done");

    td.appendChild(text);
    tr.appendChild(td);
    tbody.appendChild(tr);
   }
   tbl.appendChild(tbody)
   document.getElementById('buy').appendChild(tbl)
  }
}

function LoadSellGoods(){

}

</script>

<body onload="Setup()">
<div id="PlanetName" class="PlanetName"><%= rsPlanet("Planet_Name") %> Marketplace</div>
<div id="Buy" class="Buy"></div>
<div id="Sell" class="Sell"></div>
<div id="BuyGoodsDIV" class="BuyGoods" onMouseDown="Clicked('BuyGoods');" onMouseUp="UnClicked('BuyGoods');" onMouseOut="UnClicked('BuyGoods');" onClick="ShowBuyGoods()"><img src="buttons/BuyGoods.png" class="Button" id="BuyGoods"></div>
<div id="SellGoodsDIV" class="SellGoods" onMouseDown="Clicked('SellGoods');" onMouseUp="UnClicked('SellGoods');" onMouseOut="UnClicked('SellGoods');" onClick="ShowSellGoods()"><img src="buttons/SellGoods.png" class="Button" id="SellGoods"></div>
<div id="ExitDIV" class="Exit" onMouseDown="Clicked('Exit');" onMouseUp="UnClicked('Exit');" onMouseOut="UnClicked('Exit');" onClick="history.go(-1)"><img src="buttons/Exit.png" class="Button" id="Exit"></div>

</body>