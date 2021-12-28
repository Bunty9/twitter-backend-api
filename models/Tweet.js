const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
	user: {
		//id of user who has posted the tweet
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	text: {
		type: String,
		required: [true, "Please enter the tweet"],
		trim: true,
	},

	likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }], //id of users who have liked
	retweets: [{ type: mongoose.Schema.ObjectId, ref: "User" }], //id of users who have retweeted
	likesCount: {
		type: Number,
		default: 0,
	},
	retweetCount: {
		type: Number,
		default: 0,
	},
	comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }], //id of comment
	commentsCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Tweet", TweetSchema);
