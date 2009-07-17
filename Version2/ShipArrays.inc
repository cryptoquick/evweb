
/* Begin list of ship direction arrays. The arrays below will 
   determine which part of the sprite to show, based on the 
   direction the ship is pointing. */

<%

strSelect = "SELECT ShipTypes.* FROM ShipTypes"
set rsShips = adoCon.Execute(strSelect)

do while not rsShips.eof

intHeight = rsShips("SpriteHeight")
intWidth = rsShips("SpriteWidth")


str0 = "0px 0px"
str1 = intWidth * -1 & "px 0px"
str2 = intWidth * -2 & "px 0px"
str3 = intWidth * -3 & "px 0px"
str4 = intWidth * -4 & "px 0px"
str5 = "0px " & intHeight * -1 & "px"
str6 = intWidth * -1 & "px " & intHeight * -1 & "px"
str7 = intWidth * -2 & "px " & intHeight * -1 & "px"
str8 = intWidth * -3 & "px " & intHeight * -1 & "px"
str9 = intWidth * -4 & "px " & intHeight * -1 & "px"
str10 = "0px " & intHeight * -2 & "px"
str11 = intWidth * -1 & "px " & intHeight * -2 & "px"
str12 = intWidth * -2 & "px " & intHeight * -2 & "px"
str13 = intWidth * -3 & "px " & intHeight * -2 & "px"
str14 = intWidth * -4 & "px " & intHeight * -2 & "px"
str15 = "0px " & intHeight * -3 & "px"
str16 = intWidth * -1 & "px " & intHeight * -3 & "px"
str17 = intWidth * -2 & "px " & intHeight * -3 & "px"
str18 = intWidth * -3 & "px " & intHeight * -3 & "px"
str19 = intWidth * -4 & "px " & intHeight * -3 & "px"
str20 = "0px " & intHeight * -4 & "px"
str21 = intWidth * -1 & "px " & intHeight * -4 & "px"
str22 = intWidth * -2 & "px " & intHeight * -4 & "px"
str23 = intWidth * -3 & "px " & intHeight * -4 & "px"
%>
   ShipDirection[<%= rsShips("ID") %>] = new Array("<%= str0 %>","<%= str1 %>","<%= str2 %>","<%= str3 %>","<%= str4 %>","<%= str5 %>","<%= str6 %>","<%= str7 %>","<%= str8 %>","<%= str9 %>","<%= str10 %>","<%= str11 %>","<%= str12 %>","<%= str13 %>","<%= str14 %>","<%= str15 %>","<%= str16 %>","<%= str17 %>","<%= str18 %>","<%= str19 %>","<%= str20 %>","<%= str21 %>","<%= str22 %>","<%= str23 %>")
<%
rsShips.movenext
loop
rsShips.close
%>