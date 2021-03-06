var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 8080;

// Initialize Express
var app = express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

require("./controller/controller.js")(app);


// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions

// Use express.static to serve the public folder as a static directory
app.use("/public", express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function () {
	console.log("App running on port " + PORT + "!");
});
