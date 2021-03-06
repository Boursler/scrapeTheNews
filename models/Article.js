var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
//title, link, summary

var ArticleSchema = new Schema({
	// `title` is required and of type String
	title: {
		type: String,
		required: true,

		trim: true,

	},
	// `link` is required and of type String
	link: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: false,
		trim: true

	},
	// `note` is an object that stores a Note id
	// The ref property links the ObjectId to the Note model
	// This allows us to populate the Article with an associated Note
	note: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
