const User = require("../models/User");
const Tweet = require("../models/Tweet");
const verifyToken = require("../middleware/verifyAuth");
const express = require("express");
const router = express.Router();

// follow
router.post("/:username/follow", verifyToken, async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
        return res.send({
            message: `No user found for username ${req.params.username}`,
            statusCode: 404,
        });
    }
    const userId = user._id.toString();
    // check if already following
    if (user.followers.includes(req.userId)) {
        return res.send({
            message: "You are already following him",
            status: 400,
        });
    }
    await User.findByIdAndUpdate(userId, {
        $push: { followers: req.userId },
        $inc: { followersCount: 1 },
    });
    await User.findByIdAndUpdate(req.userId, {
        $push: { following: userId },
        $inc: { followingCount: 1 },
    });

    res.status(200).json({ success: true, data: {} });
});

// unfollow
router.post("/:username/unfollow", verifyToken, async (req, res) => {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
        return next({
            message: `No user found for ID ${req.params.username}`,
            statusCode: 404,
        });
    }
    const userId = await user._id.toString();

    if (userId === req.userId) {
        return next({
            message: "You can't follow/unfollow yourself",
            status: 400,
        });
    }
    await User.findByIdAndUpdate(userId, {
        $pull: { followers: req.userId },
        $inc: { followersCount: -1 },
    });
    await User.findByIdAndUpdate(req.userId, {
        $pull: { following: userId },
        $inc: { followingCount: -1 },
    });

    res.status(200).json({ success: true, data: {} });
});

//get user feed
router.route("/feed").get(verifyToken, async (req, res) => {
    const following = req.user.following;
    const users = await User.find()
        .where("_id")
        .in(following.concat([req.userId]))
        .exec();

    const tweetIDS = users.map((user) => user.tweet).flat();
    console.log(tweetIDS);
    const tweets = await Tweet.find()
        .populate({ path: "user", select: "username" })
        .sort("-createdAt")
        .where("_id")
        .in(tweetIDS)
        .lean()
        .exec();

    res.status(200).json({ success: true, data: tweets });
});

//tweet new
router.route("/tweet").post(verifyToken, async (req, res) => {
    const { text } = req.body;
    const user = req.userId;
    const tweet = await Tweet.create({ user, text });

    await User.findByIdAndUpdate(req.userId, {
        $push: { tweet: tweet._id },
        $inc: { tweetCount: 1 },
    });

    res.status(200).json({ success: true, data: tweet.text });
});

//test route
router.route("/verify").post(verifyToken, (req, res) => {
    console.log(req.userId);
    res.send("authorized");
});

module.exports = router;
