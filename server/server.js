const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
	host: "awsrds2.cvarie55k3gw.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "123456789",
	port: "3306",
	database: "logindb"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected RDS");
});

function isValidUsername(str) {
	for (let ch of str)
		if (!((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch == '.'))
			return false;
	return true;
}

function containsAlphabets(str) {
	for (let ch of str)
		if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
			return true;
	return false;
}

function containsNumber(str) {
	for (let ch of str)
		if (ch >= '0' && ch <= '9')
			return true;
	return false;
}

function containsSpecialCharacter(str) {
	for (let ch of str)
		if (!((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch == ' '))
			return true;
	return false;
}

function isValidPassword(str) {
	return containsAlphabets(str) && containsNumber(str) && containsSpecialCharacter(str)&&str.length>=8;
}

function isAlphaNumeric(str) {
	for (let ch of str)
		if (!((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')))
			return false;
	return true;
}

function isEmpty(reqvars) {
	for (let field of reqvars)
		if (!field || field.length === 0)
			return true;
	return false;
}


app.post('/signup', function (req, res) {
	let { username, password, firstName, lastName, confirmPassword } = req.body;
	//validation
	if (isEmpty([username, firstName, lastName, password, confirmPassword])){
		res.send('Fields should not be empty')
		return
	}
	if (!isValidUsername(username)){
		res.send('Invalid Username!')
		return
	}
	if (!isAlphaNumeric(firstName)){
		res.send('Invalid FirstName!')
		return
	}
	if (!isAlphaNumeric(lastName)){
		res.send('Invalid LastName!')
		return
	}
	if (!isValidPassword(password)){
		res.send('Invalid Password!')
		return
	}
	if(password!=confirmPassword){
		res.send('Password did not match the confirm field!')
		return
	}
	//query
	const sql = `INSERT INTO users VALUES ('${username}','${password}','${firstName}','${lastName}')`;
	connection.query(sql, function (err, result) {
		if (err) {
			res.status(500).send('Error while creating account!');
			throw err;
		}
		res.status(200).send('Account Creation Successful!');
	});
});


app.post('/login', function (req, res) {
	let { username, password } = req.body;
	connection.query('SELECT * from users', function (error, results) {
		if (error) {
			res.status(500).send('Error Retrieving users!');
			throw error;
		};
		for (let user of results)
			if (user.username === username) {
				if (user.password === password)
					res.status(200).send('Congratulations you have successfully logged-in');
				else
					res.status(400).send('Incorrect Password!');
				return;
			}
		res.status(400).send('Incorrect username!');
	});
});

app.listen(3000);
