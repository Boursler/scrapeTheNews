var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./../models");
module.exports = function (app) {
	//Headline - the title of the article

	//  * Summary - a short summary of the article

	//  * URL - the url to the original article

	//  * Feel free to add more content to your database (photos, bylines, and so on).

	console.log("success");
	app.get("/scrape", function (req, res) {
		// First, we grab the body of the html with request
		axios.get("https://www.nytimes.com//").then(function (response) {
			// Then, we load that into cheerio and save it to $ for a shorthand selector
			var $ = cheerio.load(response.data);

			// Iterate over each article
			$("article").each(function (i, element) {
				// Save an empty result object
				var result = {};
				var articleInfo = $(this).children("h2").children("a");
				// console.log($(this).children("a").text() + "element");
				result.title = articleInfo.text();
				result.link = articleInfo.attr("href");
				result.summary = $(this).children(".summary").text();
				console.log(result.title + result.link + result.summary);

				db.Article.findOneAndUpdate(result, result, {
					upsert: true,
					setDefaultsOnInsert: true
				}, function (error, result, response) {
					// View the added result in the console
					if (error)
						console.log(error);

					console.log(result);
				});


			});

		});

		res.send("Scrape Complete");
	});

	app.get("/articles", function (req, res) {
		// Grab every document in the Articles collection
		db.Article.find({})
			.then(function (dbArticle) {
				// If we were able to successfully find Articles, send them back to the client
				res.json(dbArticle);
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.json(err);
			});
	});

}
