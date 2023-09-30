const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	exerciseName: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	caloriesBurned: {
		type: Number,
	},
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
