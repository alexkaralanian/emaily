const mongoose = require('mongoose');
const { Schema }  = mongoose;

// defining user schema + preoperties on it.
const userSchema = new Schema({
	googleId: String,
	name: String,
	credits: {
		type: Number,
		default: 0
	}
})

// creating a new collection called users
mongoose.model('users', userSchema)