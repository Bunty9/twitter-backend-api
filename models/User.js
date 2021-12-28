const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: false,
	},
	username: {
		type: String,
		required: [true, "Please enter your username"],
		trim: true,
		index: true,
		unique: true,
		sparse: true,
	},

	password: {
		type: String,
		required: [true, "Please enter your password"],
		minlength: [6, "Minimum of 6 characters"],
		validate(value) {
			if (value.length < 6) {
				throw new Error("Password should be atleast minimum of 6 characters");
			}
		},
	},
	followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }], // id of followers
	followersCount: {
		// followers count
		type: Number,
		default: 0,
	},

	following: [{ type: mongoose.Schema.ObjectId, ref: "User" }], // id of following
	followingCount: {
		// following count
		type: Number,
		default: 0,
	},
	tweet: [{ type: mongoose.Schema.ObjectId, ref: "Tweet" }], // tweet id
	tweetCount: {
		// tweet count
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre("save", async function (next) {
	//hash the password before saving to the password field
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.getJwtToken = function () {
	//jwt sign the user and generate token
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

UserSchema.methods.checkPassword = async function (password) {
	//decrypt the password while checking
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
