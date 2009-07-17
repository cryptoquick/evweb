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

   div.Description{
      position: absolute;
      background: black;
      width: 100%;
      height: 9%;
      top: 20%;
      overflow: hidden;
      z-index:1;
      font-size: 90%;
      margin-bottom:0;
      text-align: Left;
   }

   div.Chat{
      position: absolute;
      background: #101010;
      width: 60%;
      height: 58%;
      top: 32%;
      overflow: auto;
      z-index:1;
      border: 2px silver inset;
   } 

 '  div.Chat{
 '     position: absolute;
 '     background: #101010;
 '     width: 100%;
 '     height: 100%;
 '     top: 0%;
 '     overflow: hidden;
 '     z-index:1;

 '  }

   div.ChatBox{
      position: absolute;
      background: black;
      width: 60%;
      height: 7%;
      top: 90%;
      overflow: hidden;
      z-index:1;
      border: 2px silver inset;
   }

   div.ExitBar{
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

   div.IGPNews{
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

   div.Gamble{
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

   div.InstaChat{
      width: 25%;
      height: 7%;
      position: absolute;
      background: red;
      top: 44%;
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
  
   input.text{
     width: 80%;
     height: 100%;
     background: black;
     color: white;
     border: none;
   }

   a.submit{
     width: 20%;
     height: 100%;
     background: black;
     color: white; 
     font-variant: small-caps;
     text-align: center;
     border: 2px silver solid
   }
</style>
<script src="ajax.js"></script>
<script>
intCount = 0
intLastEntry = 0

function LoadChat(lastEntry){
 
 xmlHttp = GetXmlHttpObject();
 if ( xmlHttp == null )
  {
   alert("Your browser does not support AJAX!");
   return;
  }
 var url = "Chat.asp?Case=GetChat&LastEntry=" + lastEntry;
 xmlHttp.onreadystatechange=ShowChat;
 xmlHttp.open("GET", url, true);
 xmlHttp.send(null);
}

function ShowChat(){
 if(xmlHttp.readyState==4)
   {
    var aryMessages = xmlHttp.responseText
    if ( aryMessages != "None" ){
     aryMessages = aryMessages.split('~');
     intLastEntry = aryMessages[0]
     if ( intCount > 0 )
      document.getElementById("Chat").innerHTML += "<BR>";
     document.getElementById("Chat").innerHTML += "&#60;" + aryMessages[3] + "&#62;"
     document.getElementById("Chat").innerHTML += "&#60;" + aryMessages[2] + "&#62;"
     document.getElementById("Chat").innerHTML += " " + aryMessages[1]
     intCount++;
     document.getElementById("chat").scrollTop = 99999999999;
     setTimeout("LoadChat(" + intLastEntry + ")",50 );
    }
    else
     setTimeout("LoadChat(" + intLastEntry + ")", 50)
   }
}

function Transmit(){
 if ( document.form.Message.value != "" ){
  xmlHttp2 = GetXmlHttpObject();
  if ( xmlHttp2 == null )
   {
    alert("Your browser does not support AJAX!");
    return;
   }
  var url = "Chat.asp?Case=Transmit&Message=" + document.form.Message.value + "&Player=<%= strToken %>&Planet=<%= intPlanetID %>"
  xmlHttp2.open("GET", url, true);
  xmlHttp2.send(null);
  document.form.Message.value = ""
 }
}

function Clicked(strImage){
 objClicked = document.getElementById(strImage);
 objClicked.src = "buttons/" + strImage + "Down.png";
}

function UnClicked(strImage){
 objClicked = document.getElementById(strImage);
 objClicked.src = "buttons/" + strImage + ".png";
}

</script>
<body onload="LoadChat(0)">
<div id="header" class="Header"><%= rsPlanet("BarName") %></div>
<div id="Description" class="Description"><%= rsPlanet("BarDesc") %></div>
<div id="Chat" class="Chat"></div>
<div id="ExitBarDIV" class="ExitBar" onMouseDown="Clicked('ExitBar');" onMouseUp="UnClicked('ExitBar');" onMouseOut="UnClicked('ExitBar');" onClick="history.go(-1)"><img src="buttons/ExitBar.png" class="Button" id="ExitBar"></div>
<div id="IGPNewsDIV" class="IGPNews" onMouseDown="Clicked('IGPNews');" onMouseUp="UnClicked('IGPNews');" onMouseOut="UnClicked('IGPNews');" onClick=""><img src="buttons/IGPNews.png" class="Button" id="IGPNews"></div>
<div id="GambleDIV" class="Gamble" onMouseDown="Clicked('Gamble');" onMouseUp="UnClicked('Gamble');" onMouseOut="UnClicked('Gamble');" onClick=""><img src="buttons/Gamble.png" class="Button" id="Gamble"></div>
<div id="InstaChatDIV" class="InstaChat" onMouseDown="Clicked('InstaChat');" onMouseUp="UnClicked('InstaChat');" onMouseOut="UnClicked('InstaChat');" onClick=""><img src="buttons/InstaChat.png" class="Button" id="InstaChat"></div>

<div id="ChatBox" class="ChatBox"><form name=form action="javascript:Transmit()"><input type="text" name="Message" class="text"><a class="submit" onClick="Transmit(intLastEntry)"><b>Transmit</B></a></form></div>
</body>