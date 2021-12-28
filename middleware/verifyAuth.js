const jwt = require("jsonwebtoken");
const User = require("../models/User");

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		next();
	});
};

isUser = (req, res, next) => {
	User.findById(req.body.userid).exec((err, user) => {
		if (err) {
			res.send("User does not exist").status(404);
			return;
		}
		next();
	});
};

const authJwt = {
	verifyToken,
	isUser,
};
module.exports = authJwt;
