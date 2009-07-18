<!-- #include file="adoCon.inc" -->
<!-- #Include FILE="incAuthentication.asp" -->
<html>
<HEAD>

</HEAD>

<%
 strQuerystring = request.querystring("Login")
 if strQuerystring = "New" Then
%>

 <form method=post action="game.asp?Login=Create">
 Create username and password to play.<br>
 Username: <input type="text" name="UserName"><br>
 Password: <input type="password" name="Password"><br>
 <input type="Submit" value="Create!">
 </form>

<%

 Elseif strQuerystring = "Create" Then
  strUsername = MakeSQLSafe(request.form("Username"))
  strPassword = MakeSQLSafe(request.form("Password"))
 
  strSQL = "SELECT COUNT(*) FROM Players WHERE Player_Name='" & strUsername & "'"
  Set rsCount = adoCon.Execute(strSQL)
  If rsCount(0) = 0 Then 
   strInsertSQL = "INSERT INTO Players (Player_Name, Password, System) VALUES ('" & strUsername & "', '" & strPassword & "', 1)"
   set rsInsert = adoCon.Execute(strInsertSQL)
   response.write("You're account has been created. <a href=game.asp>Login</a> to activate your account.")
  Else
   response.write("Sorry, that name has been taken. Please <a href=game.asp?Login=New>go back</a> and try again.")
  End If 

 Elseif strQuerystring = "Login" Then
  strSQL = "SELECT Players.* FROM Players WHERE Player_Name='" & MakeSQLSafe(request.form("Username")) & "' AND Password='" & MakeSQLSafe(request.form("Password")) & "'"
  set rsSelect = adoCon.Execute(strSQL)
  
  if not rsSelect.EOF Then
   strPlayerID = BuildToken(rsSelect("ID"), Request.ServerVariables("REMOTE_HOST"), Request.ServerVariables("HTTP_USER_AGENT"))
   Response.Redirect("planetnew.asp?Player=" & strPlayerID)
  Else
   response.write("That username and password did not match any in our database. Please <a href=game.asp>return</a> and try again.")
  End If
 Else 
 
%>




<body>
<form method=post action="game.asp?Login=Login">
Login to play.<br>
Username: <input type="text" name="UserName"><br>
Password: <input type="password" name="Password"><br>
<input type="Submit" value="Play!">
</form>

<br><br>
<a href="game.asp?Login=New">New Player</a>

<%
End If
%>

</body>
</html>