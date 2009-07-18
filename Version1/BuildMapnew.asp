<!-- #include file="adocon.inc" -->

<%

set rsConnection = Server.CreateObject("ADODB.Recordset")
strSelect = "SELECT C.System2 AS Destination, C.Direction FROM Connections AS C WHERE System1 = " & request.querystring("System")
strSelect2 = "SELECT C.System1 AS Destination, C.Direction FROM Connections AS C WHERE System2 = " & request.querystring("System")

if request.querystring("pSystem") <> 0 Then
 strSelectNOT = "AND System2 <> " & request.querystring("pSystem")
 strSelect2NOT = "AND System1 <> " & request.querystring("pSystem")
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
 
 intDirection = rsConnection("Direction")


 response.write(rsConnection("Destination") & "," & intDirection & "," & rsSystemColor("Color") & "," & request.querystring("System"))

 intCount = intCount + 1
 rsConnection.Movenext
loop
rsConnection.close

%>