const mongoose = require('mongoose');
const { Schema }  = mongoose;

// defining user schema + preoperties on it.
const userSchema = new Schema({
	googleId: String,
	name: String
})

// creating a new collection called users
mongoose.model('users', userSchema)