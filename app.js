const express = require ("express");
const request = require ("request");
const bodyParser = require ("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var email = req.body.email;
	console.log(email);

	var data = {
		members: [
		{email_address: email,
		status: "subscribed",
		merge_fields: {
			FNAME: firstName,
			LNAME: lastName
		}
		}
		]
	};

	var jsonData = JSON.stringify(data);

	var options = {
		url:"https://us2.api.mailchimp.com/3.0/lists/xxxxxxxxxx",
		method: "POST",
		headers: {
			"Authorization": "xxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		},
		body:jsonData
	};

	request(options, function(error, response, body){
		if (response.statusCode == 200){
			console.log("Succes!");
			res.sendFile(__dirname + "/succes.html");
		}else{
			console.log(error);
			res.sendFile(__dirname + "/failure.html");
		}
	});

});


app.post("/failure", function(req, res){
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("App started on port 3000");
});