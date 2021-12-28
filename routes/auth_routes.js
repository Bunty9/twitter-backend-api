const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const checkDuplicateUsernameOrEmail = require("../middleware/checkDuplicates");
const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
router.route("/signup").post(checkDuplicateUsernameOrEmail, (req, res) => {
	console.log(req.body);
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});
	user.save().exec((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("user created");
		}
	});
	var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: 86400, // 24 hours
	});
	res.status(200).send({
		id: user._id,
		username: user.username,
		email: user.email,
		accessToken: token,
	});
});
router.route("/login").post((req, res) => {
	User.findOne({
		username: req.body.username,
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		if (!user) {
			return res.status(404).send({ message: "User Not found." });
		}
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}
		var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: 86400, // 24 hours
		});
		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
		});
	});
});
module.exports = router;
