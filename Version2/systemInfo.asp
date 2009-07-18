<!-- #include file="adoCon.inc" -->

<%

strGet = MakeSQLSafe(request.querystring("Get"))
intSystemID = MakeNumber(request.querystring("SystemID"))
strpUID = MakeSQLSafe(request.querystring("Player"))

Select Case strGet
 Case "Planets"

  '// Select Planets in the system
  strPlanetSELECT = "SELECT Planets.* FROM Planets WHERE System=" & intSystemID
  set rsPlanets = adoCon.Execute(strPlanetSelect)
 
  '// For each planet, add response text
  Do While Not rsPlanets.EOF
   If intPlanetNumber <> 0 Then
    response.write("{-}")
   End If
   intPlanetNumber = intPlanetNumber + 1
   response.write(rsPlanets("ID") & "," & rsPlanets("Planet_Name") & "," & rsPlanets("PlanetLocationX") & "," & rsPlanets("PlanetLocationY") & "," & rsPlanets("PlanetImage") & "," & rsPlanets("SizeHigh") & "," & rsPlanets("SizeWide"))  
  rsPlanets.Movenext
  Loop
  Response.End

 Case "SystemID"

  '// Select the system for this player
  strSystemSELECT = "SELECT Players.System, Systems.System_Name FROM Players, Systems WHERE UID='" & strpUID & "' AND Systems.ID = Players.System"
  set rsSystem = adoCon.Execute(strSystemSelect)
 
 '// Return the number of the system
  response.write(rsSystem("System") & "," & rsSystem("System_Name"))  
  Response.End

 Case "Ships"
   // Select the active players in this system
   
  aryPlayers = Application("ShipsArray")
  
  For i = 0 to ubound(aryPlayers)
   on error resume next
    If aryPlayers(i)(31) = intSystemID Then
   '  response.write(aryPlayers(i)(30) & " | " & Now() & " | " & DateDiff("n",aryPlayers(i)(30),Now()) & " - ")
     If DateDiff("n",aryPlayers(i)(30),Now()) < 3 Then
      If DateDiff("n",aryPlayers(i)(30),Now()) <> "" Then
       response.write(aryPlayers(i)(28) & ",")
      end if
     end if
    end if
   on error goto 0
  next
 

 Case Else
  Response.End

End Select

%>
