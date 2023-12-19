const mongoose = require("mongoose");

module.exports = () => {
	try {
		mongoose.connect('mongodb+srv://vidgavai20:JHcAFOomC3vmuBaF@cluster0.8wkxegm.mongodb.net/?retryWrites=true&w=majority');
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};