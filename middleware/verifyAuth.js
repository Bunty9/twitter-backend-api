const jwt = require("jsonwebtoken");
const User = require("../models/User");

verifyToken = async (req, res, next) => {
    let token = await req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return next({ message: `No user found for ID ${decoded.id}` });
        }
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
