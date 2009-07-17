<!-- #include file="adoCon.inc" -->

<%
 '// Set variable
 dim MyShip

 '// Get MyShip and BaseShip info.
 strPUID = MakeSQLSafe(request.querystring("Player"))
 strMyShipSelect = "SELECT T.Ship_Name, T.ShipAccelRate AS BaseAccel, T.ShipMaxSpeed AS BaseMaxSpeed, T.ShipTurnRate AS BaseTurnRate, T.ShipMass AS BaseMass, T.ShipCargo AS BaseCargo, T.ShipMaxGuns AS BaseMaxGuns, T.ShipFuel AS BaseFuel, T.ShipArmor AS BaseArmor, T.ShipShields AS BaseSheilds, T.ShipShieldRegenRate AS BaseRegen, T.ShipSprite, T.SpriteHeight, T.SpriteWidth, S.ShipLocationX AS LocX, S.ShipLocationY AS LocY, S.ShipFacing, S.ShipAccelRate, S.ShipMaxSpeed, S.ShipTurnRate, S.ShipMass, S.ShipCargo, S.ShipMaxGuns, S.ShipFuel, S.ShipArmor, S.ShipShields, S.ShipShieldRegenRate AS Regen, T.ID AS ShipType, S.ID AS ShipID, S.Show, S.Updated, P.System FROM ShipTypes AS T, Ships AS S, Players AS P WHERE T.ID = S.ShipType AND S.Player = P.ID AND P.UID = '" & strPUID & "' AND S.Flagship = 1"
 set rsMyShip = adoCon.Execute(strMyShipSelect)
 
 intShipID = rsMyShip("ShipID")

 '// Only one row should be selected, throw it back.
 MyShipValues = rsMyShip.getRows()
 For iR = 0 to Ubound(MyShipValues, 2)
  For iC = 0 to Ubound(MyShipValues, 1)
   MyShip = MyShip & MyShipValues(iC,iR) & ","
  Next
 Next
' response.write(MyShip)
 
 '// Set this ships information in an array
 LocalShipArray = Application("ShipsArray")
 '//Uncomment the line below to re-create the array
 'LocalShipArray = Array()
 If intShipID > ubound(LocalShipArray) Then
  Redim PRESERVE LocalShipArray(intShipID)
 End If 
 LocalShipArray(intShipID) = Split(MyShip, ",")
 Application("ShipsArray") = LocalShipArray

' response.write(Application("ShipsArray")(9)(16))
%>