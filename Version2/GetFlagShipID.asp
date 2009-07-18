<!-- #include file="adoCon.inc" -->

<%
strPlayerUID = MakeSQLSafe(request.querystring("Player"))

strSelect = "SELECT S.ID FROM Ships AS S, Players AS P WHERE P.UID = '" & strPlayerUID & "' AND S.FlagShip = 1 AND P.ID = S.Player"
set rsFSID = adoCon.Execute(strSelect)

response.write(rsFSID("ID"))
%>