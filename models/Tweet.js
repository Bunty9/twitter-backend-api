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

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Tweet", TweetSchema);
