<!-- #include file="adocon.inc" -->

<%
dim Yincrease, Xincrease

intSystem = MakeNumber(request.querystring("System"))
intpSystem = MakeNumber(request.querystring("pSystem"))


set rsConnection = Server.CreateObject("ADODB.Recordset")
strSelect = "SELECT C.System2 AS Destination, C.Direction FROM Connections AS C WHERE System1 = " & intSystem
strSelect2 = "UNION SELECT C.System1 AS Destination, C.Direction FROM Connections AS C WHERE System2 = " & intSystem
if intpSystem <> 0 Then
 strSelectNOT = "AND System2 <> " & intpSystem
 strSelect2NOT = "AND System1 <> " & intpSystem
 strSelect = strSelect & strSelectNOT & strSelect2 & strSelect2NOT
Else
 strSelect = strSelect & strSelect2
End If
set rsConnection = adoCon.Execute(strSelect)


intCount = 1

Do While Not rsConnection.EOF

 set rsSystemColor = Server.CreateObject("ADODB.Recordset")
 strSelect = "SELECT G.Color FROM Systems AS S, Governments AS G WHERE S.ID=" & rsConnection("Destination") & " AND S.Government = G.ID"
 set rsSystemColor = adoCon.Execute(strSelect)
 

 if intCount > 1 Then
  response.write("|")
 end if
%>

   var curParent = <%= rsSystem("Parent") %>
   var curName = <%= rsSystem("System_Name") %>
   var curColor = <%= rsSystemColor("Color") %>
   var curDirection = <%= rsSystem("Direction") %>

   var DirectionMod = MovementModifiers(curDirection);
   this.X = curX[curParent] + (50*DirectionMod[1] * -1)
   this.Y = curY[curParent] + (50*DirectionMod[0] * -1)

   var line = surface.createLine({ x1: curX[curParent], y1: curY[curParent], x2: this.X, y2: this.Y })
               .setStroke({ color: 'gray', width: 1})
               .moveToBack();
               
   var circle2 = surface.createCircle({ cx: this.X, cy: this.Y, r: 5})
               .setStroke({ color: curColor, width: 2})
               .setFill("black")
               .connect("onclick",function(){alert(i);});
    curX[i] = this.X
    curY[i] = this.Y

<%
 intCount = intCount + 1
 rsConnection.Movenext
loop
rsConnection.close




%>