var axios = require("axios");
var cheerio = require("cheerio");
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
			});

		});

		res.send("Scrape Complete");
	});

}
