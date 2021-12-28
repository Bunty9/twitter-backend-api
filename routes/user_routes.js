const User = require("../models/User");
const Tweet = require("../models/Tweet");

//getUserInfo
//editUserInfo
// follow
// unfollow
//getTweets

exports.feed = asyncHandler(async (req, res, next) => {
	const following = req.user.following;

	const users = await User.find()
		.where("_id")
		.in(following.concat([req.user.id]))
		.exec();

	const tweetIDS = users.map((user) => user.tweet).flat();

	const tweets = await Tweet.find()
		.populate({
			path: "comments",
			select: "text",
			populate: { path: "user", select: "username" },
		})
		.populate({ path: "user", select: "username" })
		.sort("-createdAt")
		.where("_id")
		.in(tweetIDS)
		.lean()
		.exec();

	res.status(200).json({ success: true, data: tweets });
});
