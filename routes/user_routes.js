const User = require("../models/User");
const Tweet = require("../models/Tweet");
const verifyToken = require("../middleware/verifyAuth");
const express = require("express");
const router = express.Router();
//getUserInfo
//editUserInfo
// follow
router.post("/:id/follow", verifyToken, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next({
            message: `No user found for id ${req.params.id}`,
            statusCode: 404,
        });
    }
    // check if already following
    if (user.followers.includes(req.userId)) {
        return next({ message: "You are already following him", status: 400 });
    }
    await User.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.userId },
        $inc: { followersCount: 1 },
    });
    await User.findByIdAndUpdate(req.userId, {
        $push: { following: req.params.id },
        $inc: { followingCount: 1 },
    });

    res.status(200).json({ success: true, data: {} });
});

// unfollow
router.post("/:id/unfollow", async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next({
            message: `No user found for ID ${req.params.id}`,
            statusCode: 404,
        });
    }
    if (req.params.id === req.userId) {
        return next({
            message: "You can't follow/unfollow yourself",
            status: 400,
        });
    }
    await User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.userId },
        $inc: { followersCount: -1 },
    });
    await User.findByIdAndUpdate(req.userId, {
        $pull: { following: req.params.id },
        $inc: { followingCount: -1 },
    });

    res.status(200).json({ success: true, data: {} });
});

//getTweets

//test route
router.route("/verify").post(verifyToken, (req, res) => {
    console.log(req.userId);
    res.send("authorized");
});

// exports.feed = asyncHandler(async (req, res, next) => {
// 	const following = req.user.following;

// 	const users = await User.find()
// 		.where("_id")
// 		.in(following.concat([req.userId]))
// 		.exec();

// 	const tweetIDS = users.map((user) => user.tweet).flat();

// 	const tweets = await Tweet.find()
// 		.populate({
// 			path: "comments",
// 			select: "text",
// 			populate: { path: "user", select: "username" },
// 		})
// 		.populate({ path: "user", select: "username" })
// 		.sort("-createdAt")
// 		.where("_id")
// 		.in(tweetIDS)
// 		.lean()
// 		.exec();

// 	res.status(200).json({ success: true, data: tweets });
// });
module.exports = router;
