const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require("path")
const keys = require('./config/keys')
require ('./models/User')
require ('./models/Survey')
require ('./services/passport')

mongoose.connect(keys.MONGO_URI)

const app = express()

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.SESSION_SECRET]
	})
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if(process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))
	app.get("*", (req,res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000
app.listen(PORT)