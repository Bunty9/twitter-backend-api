const mongoose = require("mongoose");

const connectToDb = async () => {
	try {
		const connection = await mongoose.connect(
			"mongodb://localhost:27017/twitter",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);

		console.log(`Connected to database ${connection.connections[0].name}`);
	} catch (err) {
		console.error("Connection error", err);
		process.exit();
	}
};

module.exports = connectToDb;
