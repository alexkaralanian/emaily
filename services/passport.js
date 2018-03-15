const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// user modelclass
const User = mongoose.model('users')

passport.serializeUser((user, done)=> {
	done(null, user.id)
})

passport.deserializeUser((id, done)=> {
	User.findById(id)
	.then(user => done(null, user))
})

passport.use(new GoogleStrategy({
		clientID: keys.GOOGLE_CLIENT_ID,
		clientSecret: keys.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, (accessToken, refreshToken, profile, done) => {
		
		User.findOne({
			googleId: profile.id
		})
		.then(user => {
			if(user) {
				// we have a record
				done(null, user)
			} else {
				// creates new instance of a user
				new User({ 
					googleId: profile.id
				})
				.save()
				.then(user => 
					done(null, user)
				)
			}
		})		
	})
)
