const mongoose = require("mongoose")
const { Schema } = mongoose
const RecipientSchema = require("./Recipients")

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	// sub-document collection... 
	yes: {type: Number, default: 0}
	no: {type: Number, default: 0},
	// setups relationships between user and surveys
	// ref: reference to the User collection
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	dateSent: Date,
	lastResponded: Date 
})

mongoose.model('surveys', surveySchema)

// inside list of recipinets, we use a sub-model collection