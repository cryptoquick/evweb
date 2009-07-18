<!-- #include file="adocon.inc" -->
<%
 set rsPlayer = adoCon.Execute("SELECT Players.UID FROM Players WHERE Player_Name = '" & Session("USRNM") & "' AND Password = '" & Session("PWD") & "'")
%>


<html>
 <head>
  <title>Destination Frontier</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
  <link rel="stylesheet" type="text/css" href="status.css">
  <script type="text/javascript" src="jquery.js"></script>
  <script type="text/javascript" src="ship.js"></script>
  <script type="text/javascript" src="loadships.js"></script>
  <script type="text/javascript" src="ShipMovement.js"></script>
  <script type="text/javascript" src="system.js"></script>
  <script type="text/javascript" src="status.js"></script>
  <script type="text/javascript" src="commands.js"></script>

  <script type="text/javascript">
   var strSystemName;
   var intSystemID;
   var strPUID = '<%= rsPlayer("UID") %>';
   var ShipDirection = new Array();
   <!-- #include file="ShipArrays.inc" -->

   $(document).ready(function() {

    // Load System
    loadSystem(strPUID);

   });

   // Test
   // $(document).click( function() {
   //  alert(strStoredArray);
   // });

  </script>
 </head>
 <body onKeyDown="return HandleUserInput(event);">



 </body>
</html>