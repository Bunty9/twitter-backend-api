const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors());
const connectToDb = require("./db");
connectToDb();
const auth = require("./routes/auth_routes");
const user = require("./routes/user_routes");

const bodyParser = require("body-parser");
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("API Working!");
});
app.use("/auth", auth);
app.use("/user", user);

// Error handlers
app.use(function fourOhFourHandler(req, res) {
	res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
	console.error(err);
	res.status(500).send();
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
