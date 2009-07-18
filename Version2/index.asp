<!-- #include file="adoCon.inc" -->

<html>
<head>
<title>Destination Frontier</title>
</head>

<%
'//Find out what we are doing
 strQuerystring = request.querystring("Login")

'// Naming new account
 If strQuerystring = "New" Then

'// Show form
%>

  <form method=post action="index.asp?Login=Create">
  Create username and password to play.<br>
  Username: <input type="text" name="UserName"><br>
  Password: <input type="password" name="Password"><br>
  <input type="Submit" value="Create!">
  </form>

<%
'// Creating the account
 ElseIf strQuerystring = "Create" Then

  '// Define variables
  strUsername = MakeSQLSafe(request.form("Username"))
  strPassword = MakeSQLSafe(request.form("Password"))
 
  '// Check for username availablility
  strSQL = "SELECT COUNT(*) FROM Players WHERE Player_Name='" & strUsername & "'"
  Set rsCount = adoCon.Execute(strSQL)

  '// If available, insert into database
  If rsCount(0) = 0 Then 
   strInsertSQL = "INSERT INTO Players (Player_Name, Password, System) VALUES ('" & strUsername & "', '" & strPassword & "', 1)"
   set rsInsert = adoCon.Execute(strInsertSQL)
   response.write("You're account has been created. <a href=game.asp>Login</a> to activate your account.")

  '// If not available, inform them.
  Else
   response.write("Sorry, that name has been taken. Please <a href=game.asp?Login=New>go back</a> and try again.")
  End If 

'// Attempting Login
 Elseif strQuerystring = "Login" Then
  '// Select players by username and password
  strSQL = "SELECT Players.* FROM Players WHERE Player_Name='" & MakeSQLSafe(request.form("Username")) & "' AND Password='" & MakeSQLSafe(request.form("Password")) & "'"
  set rsSelect = adoCon.Execute(strSQL)
 
  '// If a player is selected, create session. We will use the username and password instead of the ID
  '// to prevent players from changing their cookie to login as somone else.
  If NOT rsSelect.EOF Then
   Session("USRNM") = rsSelect("Player_Name")
   Session("PWD") = rsSelect("Password")

   Response.Redirect "game.asp"

  '// If no player is selected, username/password combo is bad.
  Else
   response.write("That username and password did not match any in our database. Please <a href=index.asp>return</a> and try again.")
  End If

'// Display default page
 Else 
%>

<body>
 <form method=post action="index.asp?Login=Login">
  Login to play.<br />
  Username: <input type="text" name="UserName" /><br />
  Password: <input type="password" name="Password" /><br />
  <input type="Submit" value="Play!" />
 </form>

 <br /><br />
 <a href="index.asp?Login=New">New Player</a>

<%
 End If
%>

</body>
</html>