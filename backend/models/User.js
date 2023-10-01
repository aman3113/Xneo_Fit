const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true, // Removes leading/trailing whitespace
			lowercase: true, // Converts email to lowercase
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default:
				"https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?size=626&ext=jpg&ga=GA1.1.1969286105.1688930755&semt=ais",
		},
		username: {
			type: String,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		bodyWeight: {
			type: Number,
			default: 50,
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
