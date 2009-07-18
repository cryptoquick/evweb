<!-- #include file="adoCon.inc" -->

<%

intShip = MakeNumber(request.querystring("Ship"))
intValue = MakeNUmber(request.querystring("Value"))
strValue = MakeSQLSafe(request.querystring("String"))

aryLocalArray = Application("ShipsArray")

aryLocalArray(intShip)(intValue) = strValue
aryLocalArray(intShip)(30) = Now()

Application("ShipsArray") = aryLocalArray


%>