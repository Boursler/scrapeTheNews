var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controller/controller.js");

app.use(routes);



// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
	extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper");


// Start the server
app.listen(PORT, function () {
	console.log("App running on port " + PORT + "!");
});