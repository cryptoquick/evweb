<!-- #include file="adoCon.inc" -->

<%

intShip = MakeNumber(request.querystring("Ship"))
intValue = MakeNUmber(request.querystring("Value"))

strValue = Application("ShipsArray")

response.write(strValue(intShip)(intValue))


%>